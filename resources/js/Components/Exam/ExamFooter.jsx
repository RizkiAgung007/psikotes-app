import { Clock, Save } from "lucide-react";
import React from "react";

export default function ExamFooter({
    timeLeft,
    formatTime,
    isWarn,
    answeredCount,
    totalItemsToRate,
    isAllAnswered,
    processing,
}) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Timer */}
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                    <div
                        className={`flex items-center gap-2 text-xl font-mono font-bold ${
                            isWarn
                                ? "text-red-600 animate-pulse"
                                : "text-gray-800"
                        }`}
                    >
                        <Clock className="w-6 h-6" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>

                    <div className="flex flex-col md:hidden">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                            Progress
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                            {answeredCount} / {totalItemsToRate}
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex gap-4 items-center justify-end w-full md:w-auto">
                    {/* Progress Bar */}
                    <div className="hidden md:block w-32 md:w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ${
                                isAllAnswered ? "bg-green-500" : "bg-indigo-500"
                            }`}
                            style={{
                                width: `${
                                    (answeredCount / totalItemsToRate) * 100
                                }%`,
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                            isAllAnswered
                                ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                                : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    >
                        {processing ? (
                            "Menyimpan..."
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Kirim Jawaban</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
