import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FAQ, BotConfig, ChatMessage, SimulationStats } from '../types';
import { getBotResponse } from '../services/geminiService';
import SendIcon from './icons/SendIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import SimulationReportModal from './SimulationReportModal';

interface ChatSimulatorProps {
  faqs: FAQ[];
  botConfig: BotConfig;
}

const FALLBACK_MESSAGE = "Desculpe, não encontrei informações sobre isso.";

const ChatSimulator: React.FC<ChatSimulatorProps> = ({ faqs, botConfig }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [stats, setStats] = useState<SimulationStats>({
    totalInteractions: 0,
    successes: 0,
    failures: 0,
    unrecognizedQuestions: [],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateStats = useCallback(() => {
    const botMessages = messages.filter(m => m.sender === 'bot');
    const successes = botMessages.filter(m => !m.text.startsWith(FALLBACK_MESSAGE)).length;
    const failures = botMessages.filter(m => m.text.startsWith(FALLBACK_MESSAGE)).length;
    
    const unrecognizedQuestions: string[] = [];
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].sender === 'user' && messages[i+1]?.sender === 'bot' && messages[i+1]?.text.startsWith(FALLBACK_MESSAGE)) {
            unrecognizedQuestions.push(messages[i].text);
        }
    }

    setStats({
      totalInteractions: botMessages.length,
      successes,
      failures,
      unrecognizedQuestions,
    });
  }, [messages]);


  useEffect(() => {
    updateStats();
  }, [messages, updateStats]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: trimmedInput,
    };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const botText = await getBotResponse(trimmedInput, faqs, botConfig);
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: botText,
        isHelpful: null,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get bot response:', error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: 'Desculpe, ocorreu um erro ao buscar uma resposta. Tente novamente.',
        isHelpful: null,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, isHelpful: boolean) => {
    setMessages(prevMessages =>
      prevMessages.map(m =>
        m.id === messageId ? { ...m, isHelpful } : m
      )
    );
  };

  const handleRestartSimulation = () => {
    setMessages([]);
    setShowReport(false);
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col h-[85vh] max-h-[1000px]">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-center">
        Simulador de Chat
      </h2>
      
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="message-animate">
            <div className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-sky-500 text-white rounded-br-none' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
              }`}>
                <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
              </div>
            </div>
            {msg.sender === 'bot' && msg.isHelpful === null && !isLoading && !msg.text.startsWith(FALLBACK_MESSAGE) && (
               <div className="flex items-center space-x-2 mt-2 ml-2 message-animate">
                 <span className="text-xs text-slate-500 dark:text-slate-400">Essa resposta foi útil?</span>
                 <button 
                   onClick={() => handleFeedback(msg.id, true)} 
                   className="p-1 text-xs rounded-full bg-slate-200 dark:bg-slate-600 hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                   aria-label="Resposta útil"
                 >
                   👍
                 </button>
                 <button 
                   onClick={() => handleFeedback(msg.id, false)} 
                   className="p-1 text-xs rounded-full bg-slate-200 dark:bg-slate-600 hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
                   aria-label="Resposta não foi útil"
                 >
                   👎
                 </button>
               </div>
            )}
             {msg.sender === 'bot' && msg.isHelpful !== null && (
                 <div className="mt-2 ml-2 text-xs text-slate-500 dark:text-slate-400">
                    Obrigado pelo seu feedback!
                 </div>
            )}
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start message-animate">
            <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none">
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-slate-500 rounded-full dot-bounce dot-1"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full dot-bounce dot-2"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full dot-bounce"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userInput.trim() || isLoading}
            aria-label="Enviar mensagem"
          >
            <SendIcon className="w-5 h-5" />
          </button>
           <button
            type="button"
            onClick={() => setShowReport(true)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-500 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition"
            aria-label="Ver relatório"
          >
            <ChartBarIcon className="w-5 h-5" />
          </button>
        </form>
      </div>

      {showReport && (
        <SimulationReportModal
          stats={stats}
          onClose={() => setShowReport(false)}
          onRestart={handleRestartSimulation}
        />
      )}
    </div>
  );
};

export default ChatSimulator;