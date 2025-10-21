import React, { useState, useMemo } from 'react';
import { FAQ, BotConfig } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import BotSettings from './BotSettings';

interface KnowledgeBaseProps {
  faqs: FAQ[];
  onAddFaq: (faq: Omit<FAQ, 'id'>) => void;
  onDeleteFaq: (id: string) => void;
  botConfig: BotConfig;
  onBotConfigChange: (newConfig: BotConfig) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ faqs, onAddFaq, onDeleteFaq, botConfig, onBotConfigChange }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim() && category.trim()) {
      onAddFaq({ question, answer, category });
      setQuestion('');
      setAnswer('');
      setCategory('');
    }
  };

  const groupedFaqs = useMemo(() => {
    return faqs.reduce((acc, faq) => {
      (acc[faq.category] = acc[faq.category] || []).push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);
  }, [faqs]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pergunta do Usuário
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Como acesso o portal do aluno?"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              rows={2}
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Resposta do Bot
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Ex: O acesso é feito pelo site da universidade com seu RA e senha."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              rows={3}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Categoria
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Matrícula e Rematrícula"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!question.trim() || !answer.trim() || !category.trim()}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Adicionar FAQ
          </button>
        </form>

        <BotSettings botConfig={botConfig} onBotConfigChange={onBotConfigChange} />

        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 border-t border-slate-200 dark:border-slate-700 pt-4 my-4">Base de Conhecimento</h3>
        
        {faqs.length > 0 ? (
          <div className="space-y-3">
            {Object.entries(groupedFaqs).map(([categoryName, categoryFaqs]) => (
              <details key={categoryName} className="bg-slate-100 dark:bg-slate-700/50 rounded-lg" open>
                <summary className="font-semibold text-slate-800 dark:text-slate-100 p-4 cursor-pointer">
                  {categoryName}
                </summary>
                <ul className="space-y-3 p-4 pt-0">
                  {categoryFaqs.map(faq => (
                    <li key={faq.id} className="bg-white dark:bg-slate-700 p-4 rounded-lg flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-sky-800 dark:text-sky-300">{faq.question}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{faq.answer}</p>
                      </div>
                      <button
                        onClick={() => onDeleteFaq(faq.id)}
                        className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label="Deletar FAQ"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">Nenhuma FAQ cadastrada ainda.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Adicione perguntas e respostas no formulário acima.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;