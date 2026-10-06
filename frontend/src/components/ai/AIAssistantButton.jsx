import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, Bot, Loader2, CheckCircle2, Maximize2, Minimize2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AIAssistantButton = ({ context = 'dashboard' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Speech Bubble */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-4 relative bg-white text-[#0f172a] px-4 py-2.5 rounded-2xl rounded-br-none shadow-xl font-bold text-[13px] whitespace-nowrap border border-gray-100 animate-bounce"
          >
            Need any help?
            {/* Cloud tail */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
          </motion.div>
        )}
        
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative bg-transparent border-none p-0 outline-none flex items-center justify-center cursor-pointer w-24 h-24 drop-shadow-xl hover:drop-shadow-2xl transition-all"
        >
          {/* Using the user uploaded robot avatar without circle */}
          <img 
            src="/robot-assistant-transparent.png" 
            alt="AI Assistant" 
            className="w-full h-full object-contain"
          />
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && <AIChatPanel onClose={() => setIsOpen(false)} context={context} />}
      </AnimatePresence>
    </>
  );
};

const AIChatPanel = ({ onClose, context }) => {
  const initialMessage = context === 'landing' 
    ? "Hello! I'm Kaapde AI. I can tell you all about Kaapde CRM's features, pricing, and how it can help your boutique grow. Ask me anything!"
    : "Hello! I'm Kaapde AI, your intelligent CRM assistant. How can I help you today?";

  const [messages, setMessages] = useState([
    { role: 'ai', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, actionConfirm]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/ai/chat`, { message: userMessage, context });
      const data = response.data;
      
      if (data.actionRequired) {
        setActionConfirm(data.action);
        setMessages(prev => [...prev, { role: 'ai', content: data.message, isActionPrompt: true }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: data.message, cards: data.cards }]);
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to the CRM data right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionConfirm = async (confirmed) => {
    if (confirmed) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${API_URL}/ai/action`, { action: actionConfirm });
        setMessages(prev => [...prev, { role: 'ai', content: response.data.message }]);
      } catch (error) {
         setMessages(prev => [...prev, { role: 'ai', content: "Failed to execute action." }]);
      } finally {
        setIsLoading(false);
        setActionConfirm(null);
      }
    } else {
      setMessages(prev => [...prev, { role: 'ai', content: "Action cancelled." }]);
      setActionConfirm(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-24 right-6 z-[100] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#f0f0f0] transition-all duration-300 ${isExpanded ? 'w-[90vw] md:w-[800px] h-[85vh] max-h-[900px]' : 'w-[380px] h-[600px] max-h-[80vh]'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] p-4 flex justify-between items-center text-white">
        <div>
          <h3 className="font-bold text-[16px] flex items-center gap-2">
            <Sparkles size={18} /> Kaapde AI
          </h3>
          <p className="text-[12px] opacity-80">Your intelligent CRM assistant</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsExpanded(!isExpanded)} className="hover:bg-white/20 p-1.5 rounded-lg transition" title={isExpanded ? "Minimize" : "Maximize"}>
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-lg transition" title="Close">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 relative">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#1C1C1E] text-white' : 'bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[75%] rounded-2xl p-3 text-[14px] ${msg.role === 'user' ? 'bg-[#1C1C1E] text-white rounded-tr-sm' : 'bg-white border border-[#f0f0f0] text-[#1C1C1E] shadow-sm rounded-tl-sm'}`}>
              <div className="markdown-content text-[14px] leading-relaxed [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>li]:mb-1 [&>strong]:font-bold">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              
              {/* Cards / Data visualization within chat */}
              {msg.cards && (
                <div className="mt-3 space-y-2">
                  {msg.cards.map((card, cidx) => (
                    <div key={cidx} className="bg-gray-50 p-2 rounded-lg border border-gray-100 text-[13px]">
                      {card}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Action Buttons */}
              {msg.isActionPrompt && actionConfirm && (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleActionConfirm(true)} className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white text-[13px] font-bold py-2 rounded-lg transition flex justify-center items-center gap-1">
                    <CheckCircle2 size={16} /> Confirm
                  </button>
                  <button onClick={() => handleActionConfirm(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[13px] font-bold py-2 rounded-lg transition">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-[#f0f0f0] p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="text-[#3b82f6] animate-spin" />
              <span className="text-[13px] text-gray-500">Kaapde AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && !isLoading && (
        <div className="p-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100 bg-white">
          {(context === 'landing' 
            ? ["What features do you offer?", "Tell me about pricing", "Is WhatsApp supported?"] 
            : ["Show this month's sales", "Find hot leads", "Show pending invoices"]
          ).map((prompt, i) => (
            <button key={i} onClick={() => setInput(prompt)} className="shrink-0 bg-purple-50 text-[#2563eb] border border-purple-100 text-[12px] font-medium px-3 py-1.5 rounded-full hover:bg-purple-100 transition">
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-[#f0f0f0]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your CRM data..."
            className="w-full bg-gray-50 border border-gray-200 text-[#1C1C1E] rounded-full pl-4 pr-12 py-3 text-[14px] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-8 h-8 flex items-center justify-center bg-[#3b82f6] text-white rounded-full hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export { AIAssistantButton, AIChatPanel };
