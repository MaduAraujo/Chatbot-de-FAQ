import React from 'react';
import { BotConfig } from '../types';

interface BotSettingsProps {
    botConfig: BotConfig;
    onBotConfigChange: (newConfig: BotConfig) => void;
}

const BotSettings: React.FC<BotSettingsProps> = ({ botConfig, onBotConfigChange }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onBotConfigChange({
            ...botConfig,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="space-y-4">
             <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 border-t border-slate-200 dark:border-slate-700 pt-4 mb-4">Personalidade do Bot</h3>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Nome do Bot
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={botConfig.name}
                    onChange={handleChange}
                    placeholder="Ex: UniBot"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                />
            </div>
            <div>
                 <label htmlFor="persona" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Tom de Voz / Persona
                </label>
                <textarea
                    id="persona"
                    name="persona"
                    value={botConfig.persona}
                    onChange={handleChange}
                    placeholder="Ex: um assistente amigável e prestativo..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    rows={3}
                />
            </div>
        </div>
    )
}

export default BotSettings;