import { HelpCircle } from "lucide-react";
import React from "react";

export default function QuestionCard({
    question,
    index,
    answers,
    onRatingChange,
}) {
    const maxScale = question.options.length;
    const dynamicScale = Array.from({ length: maxScale }, (_, i) => i + 1);

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-200 transition-all hover:shadow-md">
            {/* Header Pertanyaan */}
            <div className="bg-gray-50/50 px-6 py-5 border-b border-gray-100 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
                    {index + 1}
                </div>
                <div>
                    <h3 className="text-gray-900 font-bold text-lg leading-snug">
                        {question.question_text}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400 font-medium">
                        <HelpCircle className="w-3 h-3" />
                        <span>
                            Urutkan prioritas (1 - {maxScale}) untuk setiap opsi
                            di bawah.
                        </span>
                    </div>
                </div>
            </div>

            {/* List Opsi */}
            <div className="divide-y divide-gray-50">
                {question.options.map((option) => (
                    <div
                        key={option.id}
                        className="p-5 md:p-6 hover:bg-indigo-50/10 transition-colors"
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Teks Pernyataan */}
                            <div className="flex-1 min-w-[200px]">
                                <p className="text-gray-700 font-medium text-base leading-relaxed">
                                    {option.option_text}
                                </p>
                            </div>

                            {/* Tombol Rate */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                {dynamicScale.map((scoreValue) => {
                                    // Cek apakah nilai ini dipilih untuk opsi INI
                                    const isSelected =
                                        answers[option.id] === scoreValue;

                                    // Cek apakah nilai ini SUDAH dipakai oleh opsi LAIN dalam pertanyaan yang sama
                                    const isTakenByOther =
                                        question.options.some(
                                            (opt) =>
                                                opt.id !== option.id &&
                                                answers[opt.id] === scoreValue
                                        );

                                    return (
                                        <label
                                            key={scoreValue}
                                            className={`relative group ${
                                                isTakenByOther
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`option_${option.id}`}
                                                value={scoreValue}
                                                checked={isSelected}
                                                disabled={isTakenByOther}
                                                onChange={() =>
                                                    onRatingChange(
                                                        question,
                                                        option.id,
                                                        scoreValue
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <div
                                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 border-2 ${
                                                    isSelected
                                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110 z-10 ring-2 ring-indigo-100 ring-offset-1"
                                                        : isTakenByOther
                                                        ? "bg-gray-50 border-gray-100 text-gray-300 opacity-60"
                                                        : "bg-white border-gray-200 text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-sm"
                                                }`}
                                            >
                                                {scoreValue}
                                            </div>

                                            {/* Tooltip sederhana untuk UX jika disabled */}
                                            {isTakenByOther && (
                                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    Dipakai
                                                </div>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
