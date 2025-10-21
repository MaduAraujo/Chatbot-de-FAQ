import React, { useState, useEffect } from 'react';
import KnowledgeBase from './components/KnowledgeBase';
import ChatSimulator from './components/ChatSimulator';
import { FAQ, BotConfig } from './types';

const defaultFaqs: FAQ[] = [
  // Matrícula e Rematrícula
  { id: 'faq-1', question: 'Quando começam as aulas?', answer: 'O calendário acadêmico com todas as datas importantes, incluindo o início das aulas, está disponível no Portal do Aluno.', category: 'Matrícula e Rematrícula' },
  { id: 'faq-2', question: 'Como faço minha rematrícula?', answer: 'A rematrícula é feita online através do Portal do Aluno durante o período definido no calendário acadêmico. Fique atento aos prazos!', category: 'Matrícula e Rematrícula' },
  { id: 'faq-3', question: 'Perdi o prazo de matrícula, e agora?', answer: 'Caso tenha perdido o prazo, você deve procurar a secretaria acadêmica do seu curso para verificar a possibilidade de matrícula em disciplinas com vagas remanescentes.', category: 'Matrícula e Rematrícula' },

  // Financeiro
  { id: 'faq-4', question: 'Onde pego a segunda via do meu boleto?', answer: 'A segunda via do boleto da mensalidade pode ser gerada a qualquer momento na seção "Financeiro" do Portal do Aluno.', category: 'Financeiro' },
  { id: 'faq-5', question: 'Como funcionam as bolsas de estudo?', answer: 'A universidade oferece diversas modalidades de bolsas. Para mais informações sobre critérios e processos de seleção, acesse a página de bolsas no site da universidade ou contate o setor de assistência estudantil.', category: 'Financeiro' },
  { id: 'faq-6', question: 'Posso pagar a mensalidade com cartão de crédito?', answer: 'Sim, o pagamento via cartão de crédito é aceito através do Portal do Aluno, na seção "Financeiro".', category: 'Financeiro' },

  // Horários e Salas
  { id: 'faq-7', question: 'Onde consulto meus horários de aula?', answer: 'Seus horários, disciplinas e salas de aula estão sempre atualizados no Portal do Aluno.', category: 'Grade de Horários' },
  { id: 'faq-8', question: 'A sala da minha aula mudou, como serei avisado?', answer: 'Qualquer alteração de sala ou horário é comunicada por e-mail e também atualizada no Portal do Aluno. Verifique sempre antes de ir para a aula.', category: 'Grade de Horários' },

  // Portal do Aluno
  { id: 'faq-9', question: 'Esqueci minha senha do Portal do Aluno, como recupero?', answer: 'Na tela de login do Portal do Aluno, clique em "Esqueci minha senha" e siga as instruções para criar uma nova senha através do seu e-mail cadastrado.', category: 'Portal do Aluno' },
  { id: 'faq-10', question: 'Como acesso o Wi-Fi da universidade?', answer: 'Para acessar a rede Wi-Fi, utilize seu RA como login e a mesma senha do Portal do Aluno.', category: 'Portal do Aluno' },

  // Vida no Campus
  { id: 'faq-11', question: 'Qual o horário de funcionamento da biblioteca?', answer: 'A biblioteca central funciona de segunda a sexta, das 8h às 22h, e aos sábados, das 9h às 14h.', category: 'Campus' },
  { id: 'faq-12', question: 'Como faço a carteirinha de estudante?', answer: 'A solicitação da carteirinha de estudante é feita no início do semestre na secretaria acadêmica. Fique de olho nos avisos!', category: 'Campus' },

  // Eventos
  { id: 'faq-13', question: 'Quando acontece a semana de recepção de calouros?', answer: 'A semana de recepção de calouros acontece sempre na primeira semana de aulas do primeiro semestre. A programação completa é divulgada no site e nas redes sociais da universidade.', category: 'Eventos' },
];

const App: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    try {
      const savedFaqs = localStorage.getItem('faqs');
      const parsedFaqs = savedFaqs ? JSON.parse(savedFaqs) : null;
      return parsedFaqs && parsedFaqs.length > 0 ? parsedFaqs : defaultFaqs;
    } catch (error) {
      console.error("Failed to load FAQs from localStorage", error);
      return defaultFaqs;
    }
  });

  const [botConfig, setBotConfig] = useState<BotConfig>(() => {
    try {
      const savedBotConfig = localStorage.getItem('botConfig');
      return savedBotConfig ? JSON.parse(savedBotConfig) : {
        name: 'UniBot',
        persona: 'um assistente acadêmico amigável e prestativo, sempre pronto para ajudar os alunos com suas dúvidas sobre a universidade.',
      };
    } catch (error) {
      console.error("Failed to load bot config from localStorage", error);
      return {
        name: 'UniBot',
        persona: 'um assistente acadêmico amigável e prestativo, sempre pronto para ajudar os alunos com suas dúvidas sobre a universidade.',
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('faqs', JSON.stringify(faqs));
    } catch (error) {
      console.error("Failed to save FAQs to localStorage", error);
    }
  }, [faqs]);

  useEffect(() => {
    try {
      localStorage.setItem('botConfig', JSON.stringify(botConfig));
    } catch (error) {
      console.error("Failed to save bot config to localStorage", error);
    }
  }, [botConfig]);


  const handleAddFaq = (newFaq: Omit<FAQ, 'id'>) => {
    const faqWithId: FAQ = { ...newFaq, id: crypto.randomUUID() };
    setFaqs(prevFaqs => [...prevFaqs, faqWithId]);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== id));
  };

  const handleBotConfigChange = (newConfig: BotConfig) => {
    setBotConfig(newConfig);
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <header className="bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-sky-600 dark:text-sky-400">
            Chatbot
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Crie, teste e refine o conhecimento do seu chatbot universitário.
          </p>
        </div>
      </header>
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:col-span-1">
           <KnowledgeBase
            faqs={faqs}
            onAddFaq={handleAddFaq}
            onDeleteFaq={handleDeleteFaq}
            botConfig={botConfig}
            onBotConfigChange={handleBotConfigChange}
          />
        </div>
        <div className="lg:col-span-1">
          <ChatSimulator faqs={faqs} botConfig={botConfig} />
        </div>
      </main>
    </div>
  );
};

export default App;