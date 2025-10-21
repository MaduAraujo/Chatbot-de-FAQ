export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type MessageSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  isHelpful?: boolean | null; // null: not yet answered, true: yes, false: no
}

export interface BotConfig {
  name: string;
  persona: string;
}

export interface SimulationStats {
  totalInteractions: number;
  successes: number;
  failures: number;
  unrecognizedQuestions: string[];
}
