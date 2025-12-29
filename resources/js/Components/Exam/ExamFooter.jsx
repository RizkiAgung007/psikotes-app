import { CheckCircle, Clock, Send } from "lucide-react";
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
    // Hitung persentase progress
    const progressPercentage = Math.min(
        100,
        Math.max(0, (answeredCount / totalItemsToRate) * 100)
    );

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-40 transition-all">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Timer Section */}
                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                    <div
                        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border ${
                            isWarn
                                ? "bg-red-50 border-red-100 text-red-600 animate-pulse"
                                : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                    >
                        <Clock className="w-5 h-5" />
                        <span className="text-xl font-mono font-bold tracking-tight">
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    {/* Progress Text (Mobile Only) */}
                    <div className="flex flex-col items-end md:hidden">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            Progress
                        </span>
                        <span className="text-sm font-bold text-gray-700">
                            {answeredCount} / {totalItemsToRate}
                        </span>
                    </div>
                </div>

                {/* Progress Bar & Button */}
                <div className="flex-1 flex flex-col-reverse md:flex-row gap-4 items-center justify-end w-full md:w-auto">

                    {/* Progress Bar Wrapper */}
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <div className="flex justify-between w-48 text-xs font-medium text-gray-500">
                            <span>Kelengkapan</span>
                            <span className={isAllAnswered ? "text-green-600 font-bold" : ""}>
                                {Math.round(progressPercentage)}%
                            </span>
                        </div>
                        <div className="w-48 h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div
                                className={`h-full transition-all duration-500 ease-out rounded-full ${
                                    isAllAnswered
                                        ? "bg-green-500"
                                        : "bg-indigo-500"
                                }`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                            isAllAnswered
                                ? "bg-green-600 hover:bg-green-700 shadow-green-200 ring-2 ring-green-100 ring-offset-1"
                                : "bg-gray-800 hover:bg-gray-700 shadow-gray-300"
                        }`}
                    >
                        {processing ? (
                            "Memproses..."
                        ) : isAllAnswered ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                <span>Kirim Jawaban</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                <span>Simpan Sementara</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
