import React from 'react';
import { SimulationStats } from '../types';

interface SimulationReportModalProps {
    stats: SimulationStats;
    onClose: () => void;
    onRestart: () => void;
}

const SimulationReportModal: React.FC<SimulationReportModalProps> = ({ stats, onClose, onRestart }) => {
    const successRate = stats.totalInteractions > 0 ? ((stats.successes / stats.totalInteractions) * 100).toFixed(1) : '0.0';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Relatório de Simulação</h2>

                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stats.totalInteractions}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Interações Totais</div>
                    </div>
                     <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{successRate}%</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Taxa de Acerto</div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Perguntas Não Reconhecidas</h3>
                <div className="bg-slate-100 dark:bg-slate-900/50 rounded-lg p-3 max-h-40 overflow-y-auto">
                    {stats.unrecognizedQuestions.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                            {stats.unrecognizedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma pergunta não reconhecida. Ótimo trabalho! 🎉</p>
                    )}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none"
                    >
                        Continuar Simulação
                    </button>
                    <button 
                        onClick={onRestart}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none"
                    >
                        Nova Simulação
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SimulationReportModal;