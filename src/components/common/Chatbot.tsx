import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  ExternalLink,
  RefreshCw,
  Tag,
  Package,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
}

const N8N_WEBHOOK_URL =
  'https://varsha1705.app.n8n.cloud/webhook/4fc8b9ca-488a-40cd-90a6-58f401c82e73/chat';

const QUICK_PROMPTS = [
  'Headphones under ₹3000 for study and travel',
  'What active coupons can I use?',
  'Track my order #NC-98421',
  'Skincare for dry sensitive skin'
];

export const Chatbot: React.FC = () => {
  const { isChatOpen, setIsChatOpen, addToast } = useStore();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem('nova_chat_messages');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed loading chat history', e);
    }
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: "Hello! I am NOVA, your intelligent shopping concierge powered by n8n. Ask me anything about our 32 curated products, active coupons, order status, or recommendations tailored to your exact budget.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  // Session ID for n8n conversation memory
  const [sessionId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('nova_chat_session_id');
      if (stored) return stored;
      const newId = 'nova-sess-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
      localStorage.setItem('nova_chat_session_id', newId);
      return newId;
    } catch {
      return 'nova-sess-default';
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed saving chat messages', e);
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasUnread(false);
    }
  }, [messages, isChatOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isChatOpen]);

  const handleClearHistory = () => {
    const welcome: ChatMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'assistant',
      text: "Conversation refreshed. How can I assist your shopping journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcome]);
    addToast('Chat Cleared', 'Conversation history has been reset.', 'info');
  };

  const parseN8nResponse = (data: any): string => {
    if (typeof data === 'string') return data;
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0];
      return (
        first?.output ||
        first?.text ||
        first?.response ||
        first?.message ||
        JSON.stringify(first)
      );
    }
    if (typeof data === 'object' && data !== null) {
      return (
        data.output ||
        data.text ||
        data.response ||
        data.message ||
        data.data?.output ||
        data.result ||
        JSON.stringify(data)
      );
    }
    return String(data || 'I processed your request, but received an empty response.');
  };

  // Local fallback response generator if n8n webhook workflow is inactive or temporarily unreachable
  const getFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('coupon') || q.includes('promo') || q.includes('discount') || q.includes('offer')) {
      return "Here are the active promo codes for NOVA CART:\n\n• **NOVA10**: 10% off entire order (no minimum spend).\n• **WELCOME20**: Flat ₹500 off orders over ₹2,000.\n• **FREESHIP**: Complimentary priority air shipping on any cart.\n\nAll domestic orders above ₹999 automatically qualify for free express shipping!";
    }

    if (q.includes('headphone') || q.includes('earbud') || q.includes('audio') || q.includes('sound')) {
      return "For audio under ₹3,000, our #1 recommendation is:\n\n**Aether ANC Over-Ear Studio Headphones** — **₹2,899** (Save 42% from MRP ₹4,999).\n• Features: Hybrid -38dB Active Noise Cancellation, 48-hour battery, memory foam cushions.\n• Honest Trade-off: Acoustic sound profile is tuned for vocal neutrality rather than boomy bass.\n\nAlternatively, for gym & pocket carry, check out the **Pulse Air TWS Earbuds** at **₹1,499** (IPX5, 32h playtime).";
    }

    if (q.includes('skin') || q.includes('serum') || q.includes('beauty') || q.includes('dry')) {
      return "For dry or sensitive skin, we recommend:\n\n**Botanica Squalane & Ceramide Barrier Serum 30ml** — **₹1,299** (Save 35% from MRP ₹1,999).\n• 100% plant-derived squalane with 5 essential ceramides and centella asiatica.\n• Lightweight, non-greasy, and fragrance-free.\n\nPair it with **Bakuchiol Youth Renewal Night Crème** (₹1,599) for gentle collagen replenishment without retinol peeling.";
    }

    if (q.includes('track') || q.includes('order') || q.includes('nc-98421') || q.includes('status')) {
      return "Tracking for **Order #NC-98421**:\n• Status: **Out for Delivery** (BlueDart Priority Air)\n• Expected Arrival: **Today by 6:00 PM**\n• Courier Partner: Vikram K. (+91 98110 54321)\n• Items: Aether ANC Headphones + AeroFlask 750ml\n\nYou can also view full visual timeline details on the **Track Order** tab.";
    }

    if (q.includes('return') || q.includes('refund') || q.includes('warranty')) {
      return "NOVA CART Policy Summary:\n• **14-Day Returns**: Free doorstep pickup with immediate refund to your original payment method or store credit.\n• **1-Year Warranty**: Full manufacturer replacement guarantee on all electronics and hardware.\n• **Shipping**: Free on orders over ₹999.";
    }

    return "Thank you for your message! NOVA CART curates 32 premium essentials across Electronics, Fitness, Beauty, Fashion, Home, Travel, Accessories, and Gourmet Pantry. How can I help you match your budget or select the right item today?";
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Send payload compatible with n8n Chat Trigger & Webhook standards
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          message: text,
          sessionId: sessionId,
          metadata: {
            source: 'nova_cart_web',
            timestamp: new Date().toISOString()
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let replyText = '';

      if (contentType.includes('application/json')) {
        const jsonData = await response.json();
        replyText = parseN8nResponse(jsonData);
      } else {
        replyText = await response.text();
      }

      if (!replyText || replyText.trim() === '') {
        replyText = getFallbackResponse(text);
      }

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      if (!isChatOpen) setHasUnread(true);
    } catch (err: any) {
      console.warn('n8n webhook notice:', err.message);

      // Provide accurate contextual fallback from NOVA CART knowledge base
      const fallbackReply = getFallbackResponse(text);
      const isAbort = err.name === 'AbortError';

      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'assistant',
        text: fallbackReply + (isAbort ? "\n\n*(Note: n8n cloud took >12s to respond, provided instant catalog data)*" : ""),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
      if (!isChatOpen) setHasUnread(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple Markdown text renderer (handles bolding, linebreaks, bullets)
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Bold syntax **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <span key={idx} className="block leading-relaxed">
          {formattedLine.length > 0 ? formattedLine : '\u00A0'}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        {!isChatOpen && (
          <button
            onClick={() => {
              setIsChatOpen(true);
              setHasUnread(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-stone-900 hover:bg-emerald-900 text-white rounded-full shadow-2xl border border-stone-700/80 transition-all duration-300 hover:scale-103 cursor-pointer"
            aria-label="Open NOVA AI Shopping Concierge"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <span className="text-xs font-semibold tracking-wide font-display">
              Ask NOVA AI
            </span>
            {hasUnread && (
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>
        )}
      </div>

      {/* Floating Chat Modal */}
      {isChatOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white shadow-2xl border border-stone-200 overflow-hidden ${
            isExpanded
              ? 'inset-4 md:inset-10 rounded-2xl'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl'
          }`}
        >
          {/* Header */}
          <div className="bg-stone-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-stone-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold font-display tracking-tight text-white">
                    NOVA Assistant
                  </h3>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded font-mono-data border border-emerald-800">
                    n8n AI
                  </span>
                </div>
                <p className="text-[10px] text-stone-400">
                  Shopping that understands you
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                title="Clear conversation"
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore size' : 'Expand window'}
                className="hidden sm:block p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                title="Close chat"
                className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Webhook Status Indicator Bar */}
          <div className="bg-stone-50 border-b border-stone-200/80 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-stone-500 font-mono-data">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Webhook: varsha1705.app.n8n.cloud</span>
            </div>
            <span className="text-[10px] text-stone-400">Session ID: {sessionId.slice(0, 14)}...</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-7 h-7 rounded-full bg-stone-900 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-stone-700">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-800 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-xs'
                  }`}
                >
                  <div className="space-y-1">
                    {renderMessageContent(msg.text)}
                  </div>
                  <div
                    className={`text-[9px] mt-1.5 text-right font-mono-data ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-950 text-white flex items-center justify-center shrink-0 mt-0.5 border border-emerald-800">
                    <User className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-emerald-400 flex items-center justify-center shrink-0 border border-stone-700">
                  <Bot className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs px-3.5 py-2.5 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-stone-400 ml-1">Consulting n8n agent...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-white border-t border-stone-200/80 overflow-x-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
                Suggested:
              </span>
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 border border-stone-200 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 text-stone-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-stone-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about products, budget matches, coupons..."
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white text-stone-900 transition-all placeholder:text-stone-400"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 bg-stone-900 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1.5 px-1">
              <span>Connected to n8n Cloud</span>
              <span>14-day returns · 1-yr replacement</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
