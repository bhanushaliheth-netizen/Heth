import React, { useState, useRef, useEffect } from 'react';
import { useGoogleVerse } from '../context/GoogleVerseContext';
import { GeminiChatMessage, Product } from '../types';
import { PRODUCTS } from '../data/products';
import {
  Sparkles,
  X,
  Send,
  ShoppingBag,
  Bot,
  User,
  Loader2,
  HelpCircle,
  Shirt,
} from 'lucide-react';

export const GeminiMerchGuide: React.FC = () => {
  const {
    styleProfile,
    quizResult,
    cart,
    addToCart,
    setSelectedProductForDetail,
    setActiveModal,
  } = useGoogleVerse();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    'I need a gift for a developer.',
    'Show me something under ₹2,000.',
    'I want something for a YouTube creator.',
    'Build me a tech starter kit.',
    'Find something that matches my style.',
  ];

  const [messages, setMessages] = useState<GeminiChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'gemini',
      text: "✨ Hello! I'm your Gemini Merch Guide for GoogleVerse. Tell me what you're looking for or ask for personalized fashion advice!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Local Intelligent Fallback Engine
  const generateFallbackResponse = (query: string): { replyText: string; recommendedIds: string[] } => {
    const q = query.toLowerCase();
    let replyText = '';
    let recommendedIds: string[] = [];

    if (q.includes('developer') || q.includes('coding') || q.includes('code')) {
      replyText = 'For developers and coders, I recommend these ultra-comfortable, syntax-inspired essentials:';
      recommendedIds = ['gv-15', 'gv-16', 'gv-05', 'gv-19'];
    } else if (q.includes('2000') || q.includes('2000') || q.includes('budget') || q.includes('under')) {
      replyText = 'Here are awesome high-quality GoogleVerse items under ₹2,000:';
      recommendedIds = ['gv-01', 'gv-03', 'gv-07', 'gv-20'];
    } else if (q.includes('youtube') || q.includes('creator') || q.includes('video')) {
      replyText = 'For creators and video editors, these studio-ready pieces bring high energy:';
      recommendedIds = ['gv-11', 'gv-12', 'gv-13', 'gv-14'];
    } else if (q.includes('starter kit') || q.includes('kit') || q.includes('set')) {
      replyText = 'Here is the ultimate GoogleVerse Tech Starter Kit bundle:';
      recommendedIds = ['gv-01', 'gv-03', 'gv-06', 'gv-19'];
    } else if (q.includes('style') || q.includes('my style') || q.includes('match')) {
      if (styleProfile) {
        replyText = `Based on your scanned style profile (${styleProfile.style} style, ${styleProfile.fit} fit), I picked these for your vibe:`;
        recommendedIds = ['gv-02', 'gv-10', 'gv-18', 'gv-24'];
      } else {
        replyText = 'I recommend scanning your style profile first! In the meantime, here are our top matched essentials:';
        recommendedIds = ['gv-01', 'gv-02', 'gv-07', 'gv-17'];
      }
    } else {
      replyText = "Here are top-rated GoogleVerse merchandise recommendations curated for you:";
      recommendedIds = ['gv-01', 'gv-02', 'gv-07', 'gv-18'];
    }

    return { replyText, recommendedIds };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: GeminiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages,
          context: {
            styleProfile,
            quizIdentity: quizResult?.identity,
            cartItems: cart,
          },
        }),
      });

      const data = await response.json();

      if (data.reply) {
        // Extract product matches from text response
        const matchedIds: string[] = [];
        PRODUCTS.forEach((p) => {
          if (data.reply.toLowerCase().includes(p.name.toLowerCase())) {
            matchedIds.push(p.id);
          }
        });

        // Fallback matched products if none detected directly in text
        if (matchedIds.length === 0) {
          matchedIds.push(...generateFallbackResponse(query).recommendedIds);
        }

        const geminiMsg: GeminiChatMessage = {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProductIds: matchedIds.slice(0, 3),
        };

        setMessages((prev) => [...prev, geminiMsg]);
      } else {
        // Use local fallback
        const fallback = generateFallbackResponse(query);
        const geminiMsg: GeminiChatMessage = {
          id: `gemini-${Date.now()}`,
          sender: 'gemini',
          text: fallback.replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          recommendedProductIds: fallback.recommendedIds,
        };
        setMessages((prev) => [...prev, geminiMsg]);
      }
    } catch (err) {
      const fallback = generateFallbackResponse(query);
      const geminiMsg: GeminiChatMessage = {
        id: `gemini-${Date.now()}`,
        sender: 'gemini',
        text: fallback.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProductIds: fallback.recommendedIds,
      };
      setMessages((prev) => [...prev, geminiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-3xl hover:bg-slate-800 transition-all flex items-center gap-2.5 group hover:scale-105"
        title="Open Gemini Merch Guide"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#FBBC05] animate-pulse" />
          </div>
        </div>
        <span className="hidden sm:inline font-black text-xs uppercase tracking-wider">
          GEMINI MERCH GUIDE
        </span>
      </button>

      {/* Slide-Over Drawer Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-gray-200">
            
            {/* Header */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4285F4] to-[#A142F4] rounded-lg flex items-center justify-center text-white text-xs font-bold italic">
                  G
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900">
                    Gemini Merch Guide
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Your AI style companion
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1 bg-gray-50">
              
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {msg.sender === 'gemini' ? (
                      <>
                        <Bot className="w-3 h-3 text-[#4285F4]" />
                        <span>Gemini AI</span>
                      </>
                    ) : (
                      <>
                        <span>You</span>
                        <User className="w-3 h-3 text-gray-600" />
                      </>
                    )}
                    <span>• {msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-black text-white rounded-tr-none font-bold'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none italic whitespace-pre-line'
                    }`}
                  >
                    "{msg.text}"
                  </div>

                  {/* Recommended Products Carousel Cards in Chat */}
                  {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                    <div className="w-full mt-3 space-y-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        RECOMMENDED MERCH:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendedProductIds.map((pid) => {
                          const p = PRODUCTS.find((item) => item.id === pid);
                          if (!p) return null;
                          return (
                            <div
                              key={p.id}
                              className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-12 h-12 rounded-xl bg-gray-50 object-contain p-1 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 truncate">
                                  {p.name}
                                </h4>
                                <span className="text-[11px] font-black text-gray-700">
                                  ₹{p.price}
                                </span>
                              </div>
                              <button
                                onClick={() => addToCart(p)}
                                className="px-3 py-1.5 bg-black hover:bg-gray-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full shrink-0 flex items-center gap-1 cursor-pointer"
                              >
                                <ShoppingBag className="w-3 h-3 text-[#FBBC05]" />
                                <span>ADD</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#4285F4]" />
                  <span>Thinking about your perfect merch...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            <div className="p-4 bg-white border-t border-gray-100 space-y-2">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">
                SUGGESTED PROMPTS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full text-[9px] font-bold border border-gray-200 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Gemini..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full bg-gray-100 rounded-full px-5 py-3 text-xs outline-none border border-transparent focus:border-[#4285F4] text-gray-900"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="p-3 bg-black hover:bg-gray-800 text-white rounded-full disabled:opacity-40 transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
