import { Product, SmartMatchResult } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

export interface SmartMatchCriteria {
  query: string;
  category?: string;
  maxBudget?: number;
  priorities?: string[];
}

export function parseQueryBudget(query: string): number | null {
  const normalized = query.toLowerCase().replace(/,/g, '');
  // Matches "under 3000", "under ₹3000", "below 2500", "< 3000", "budget 2000", "around 1500"
  const patterns = [
    /(?:under|below|less than|within|up to|budget of|max|budget)\s*(?:₹|rs\.?|inr)?\s*(\d{3,6})/i,
    /(?:₹|rs\.?|inr)\s*(\d{3,6})\s*(?:budget|or less|max)/i,
    /<=\s*(\d{3,6})/,
    /<\s*(\d{3,6})/
  ];

  for (const regex of patterns) {
    const match = normalized.match(regex);
    if (match && match[1]) {
      const val = parseInt(match[1], 10);
      if (!isNaN(val) && val > 0) return val;
    }
  }

  // Also match standalone currency number if preceded by ₹ or rs
  const currMatch = normalized.match(/(?:₹|rs\.?)\s*(\d{3,6})/i);
  if (currMatch && currMatch[1]) {
    const val = parseInt(currMatch[1], 10);
    if (!isNaN(val) && val >= 300) return val;
  }

  return null;
}

export function runNovaSmartMatch(
  criteria: SmartMatchCriteria,
  products: Product[] = SAMPLE_PRODUCTS
): SmartMatchResult[] {
  const rawQuery = (criteria.query || '').trim().toLowerCase();
  const explicitBudget = criteria.maxBudget || parseQueryBudget(rawQuery);
  const explicitCategory = criteria.category && criteria.category !== 'All' ? criteria.category.toLowerCase() : null;
  const priorities = criteria.priorities || [];

  // Stop words to remove from token analysis
  const stopWords = new Set([
    'a', 'an', 'the', 'for', 'in', 'and', 'with', 'under', 'below', 'around', 'of',
    'to', 'is', 'on', 'my', 'me', 'i', 'need', 'want', 'looking', 'best', 'suitable',
    'good', 'recommend', 'give', 'suggest', 'product', 'items', '₹', 'rs', 'inr'
  ]);

  const queryTokens = rawQuery
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !stopWords.has(token) && isNaN(Number(token)));

  const scoredResults: {
    product: Product;
    score: number;
    reasons: string[];
    budgetFit: 'well-under' | 'perfect-fit' | 'slight-stretch';
    savings: number;
  }[] = [];

  for (const product of products) {
    let score = 0;
    const reasons: string[] = [];

    // 1. Category Matching
    const prodCat = product.category.toLowerCase();
    if (explicitCategory) {
      if (prodCat === explicitCategory) {
        score += 35;
        reasons.push(`Direct match in ${product.category}`);
      } else {
        // Severe penalty if user explicitly selected a different category
        score -= 40;
      }
    }

    // 2. Keyword & Intent Matching
    const searchableCorpus = [
      product.name.toLowerCase(),
      product.brand.toLowerCase(),
      product.category.toLowerCase(),
      product.shortDescription.toLowerCase(),
      product.description.toLowerCase(),
      ...product.highlights.map(h => h.toLowerCase()),
      ...product.smartMatchMeta.useCases.map(u => u.toLowerCase()),
      ...product.smartMatchMeta.idealFor.map(i => i.toLowerCase()),
      ...product.smartMatchMeta.strengths.map(s => s.toLowerCase()),
      ...Object.entries(product.specs).map(([k, v]) => `${k.toLowerCase()}: ${v.toLowerCase()}`)
    ].join(' ');

    let matchedTokenCount = 0;
    const matchedHighlights: string[] = [];

    for (const token of queryTokens) {
      // Check in useCases & name first (higher weight)
      if (product.name.toLowerCase().includes(token)) {
        score += 25;
        matchedTokenCount++;
        matchedHighlights.push(`Directly targets "${token}"`);
      } else if (product.smartMatchMeta.useCases.some(uc => uc.includes(token))) {
        score += 20;
        matchedTokenCount++;
        matchedHighlights.push(`Designed specifically for ${token}`);
      } else if (searchableCorpus.includes(token)) {
        score += 10;
        matchedTokenCount++;
      }
    }

    // If query was entered but no tokens matched at all, skip unless generic
    if (queryTokens.length > 0 && matchedTokenCount === 0 && !explicitCategory) {
      continue;
    }

    // 3. Budget Fit Evaluation
    let budgetFit: 'well-under' | 'perfect-fit' | 'slight-stretch' = 'perfect-fit';
    let savings = 0;

    if (explicitBudget) {
      if (product.price <= explicitBudget) {
        savings = explicitBudget - product.price;
        score += 30; // base reward for being within budget

        if (savings >= explicitBudget * 0.25) {
          budgetFit = 'well-under';
          score += 10;
          reasons.push(`Substantial value: ₹${product.price.toLocaleString('en-IN')} leaves ₹${savings.toLocaleString('en-IN')} under your ₹${explicitBudget.toLocaleString('en-IN')} limit.`);
        } else {
          budgetFit = 'perfect-fit';
          score += 15;
          reasons.push(`Budget precision: ₹${product.price.toLocaleString('en-IN')} fits right inside your ₹${explicitBudget.toLocaleString('en-IN')} requirement.`);
        }
      } else {
        // Over budget
        const excess = product.price - explicitBudget;
        const excessRatio = excess / explicitBudget;

        if (excessRatio <= 0.2) {
          // Slight stretch (within 20%)
          budgetFit = 'slight-stretch';
          score -= 15;
          reasons.push(`Slight stretch: ₹${excess.toLocaleString('en-IN')} above budget, but offers premium durability and rating.`);
        } else {
          // Heavy penalty if far above budget
          score -= 50;
        }
      }
    }

    // 4. Priorities Matching
    if (priorities.length > 0) {
      for (const priority of priorities) {
        const pLower = priority.toLowerCase();
        if (searchableCorpus.includes(pLower)) {
          score += 12;
          reasons.push(`Fulfills prioritized preference for "${priority}".`);
        }
      }
    }

    // 5. Product Quality & Credibility Multiplier
    score += product.rating * 4; // up to 20 pts
    if (product.tags.includes('smart-pick')) {
      score += 5;
    }

    // Add unique strengths from metadata if reasons are few
    if (product.smartMatchMeta.strengths.length > 0 && reasons.length < 3) {
      reasons.push(product.smartMatchMeta.strengths[0]);
    }

    // Normalized final match score out of 100
    const normalizedScore = Math.min(99, Math.max(55, Math.round(score)));

    if (normalizedScore >= 60 || queryTokens.length === 0) {
      scoredResults.push({
        product,
        score: normalizedScore,
        reasons: Array.from(new Set(reasons)).slice(0, 3),
        budgetFit,
        savings
      });
    }
  }

  // Sort descending by score, then by rating
  scoredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.product.rating - a.product.rating;
  });

  return scoredResults.map(r => ({
    product: r.product,
    matchScore: r.score,
    reasons: r.reasons,
    budgetFit: r.budgetFit,
    savingsAmount: r.savings
  }));
}
