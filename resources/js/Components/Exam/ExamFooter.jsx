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
        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200 p-4 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.05)] z-50 transition-all">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                    {/* Timer */}
                    <div
                        className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-sm transition-all duration-300 ${
                            isWarn
                                ? "bg-red-50 border-red-100 text-red-600 animate-pulse ring-2 ring-red-50"
                                : "bg-white border-gray-200 text-gray-700"
                        }`}
                    >
                        <Clock
                            className={`w-5 h-5 ${isWarn ? "animate-bounce" : ""}`}
                        />
                        <span className="text-xl font-mono font-bold tracking-tight tabular-nums">
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    {/* Progress Text (Mobile) */}
                    <div className="flex flex-col items-end md:hidden">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            Terjawab
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-900">
                                {answeredCount}
                            </span>
                            <span className="text-sm text-gray-400 font-medium">
                                / {totalItemsToRate}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col-reverse md:flex-row gap-5 items-center justify-end w-full md:w-auto">
                    {/* Progress Bar Wrapper (Desktop) */}
                    <div className="hidden md:flex flex-col items-end gap-1.5 min-w-[240px]">
                        <div className="flex justify-between w-full text-xs font-bold tracking-wide">
                            <span className="text-gray-400 uppercase">
                                Kelengkapan
                            </span>
                            <span
                                className={
                                    isAllAnswered
                                        ? "text-emerald-600"
                                        : "text-indigo-600"
                                }
                            >
                                {answeredCount} / {totalItemsToRate} Soal (
                                {Math.round(progressPercentage)}%)
                            </span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                            <div
                                className={`h-full transition-all duration-700 ease-out rounded-full ${
                                    isAllAnswered
                                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                        : "bg-gradient-to-r from-indigo-400 to-indigo-500"
                                }`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                            isAllAnswered
                                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200 ring-4 ring-emerald-50"
                                : "bg-gray-800 hover:bg-gray-900 shadow-gray-300"
                        }`}
                    >
                        {processing ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Memproses...</span>
                            </>
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