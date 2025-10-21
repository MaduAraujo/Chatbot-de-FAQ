import { GoogleGenAI } from "@google/genai";
import { FAQ, BotConfig } from '../types';

// Per @google/genai guidelines, initialize with a named parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBotResponse = async (
  userQuestion: string,
  faqs: FAQ[],
  botConfig: BotConfig
): Promise<string> => {
  const knowledgeBase = faqs.length > 0 
    ? faqs.map(faq => `P: ${faq.question}\nR: ${faq.answer}`).join('\n\n')
    : "Nenhuma informação na base de conhecimento ainda.";

  const systemInstruction = `Você é ${botConfig.name}, ${botConfig.persona}. Sua principal função é ser um assistente para estudantes universitários.

Regras de Conversação Geral:
- Se o usuário disser "Olá", "Oi", "Bom dia", "Boa tarde", ou "Boa noite", responda com uma saudação amigável e pergunte como pode ajudar.
- Se o usuário disser "Obrigado", "Obrigada", ou "Valeu", responda de forma cordial, como "De nada! Se precisar de mais alguma coisa, é só perguntar.".
- Se o usuário disser "Tchau", "Até mais", ou "Adeus", responda com uma despedida amigável.
- Se o usuário se desculpar com "Desculpa", responda de forma compreensiva, como "Sem problemas!".

Base de Conhecimento para Dúvidas Acadêmicas:
---
${knowledgeBase}
---

Regras Importantes:
- Para perguntas relacionadas à universidade, responda estritamente com base nas informações da Base de Conhecimento.
- Se a pergunta do usuário não puder ser respondida com as informações da Base de Conhecimento E não for uma saudação/agradecimento/despedida, você DEVE responder com a frase exata: "Desculpe, não encontrei informações sobre isso."
- Mantenha sempre o tom de voz definido na sua persona.
- Responda em português do Brasil.`;

  try {
    // Per @google/genai guidelines, use ai.models.generateContent.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userQuestion,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
      },
    });

    // Per @google/genai guidelines, access the response text directly.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ops! Parece que estou com um pequeno problema técnico. Por favor, tente novamente em alguns instantes. 🤖";
  }
};