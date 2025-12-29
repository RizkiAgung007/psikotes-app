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
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
            {/* Header Pertanyaan */}
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex gap-3 items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    {index + 1}
                </span>
                <h3 className="text-gray-900 font-bold text-lg leading-snug pt-1">
                    {question.question_text}
                </h3>
            </div>

            {/* List Opsi */}
            <div className="divide-y divide-gray-50">
                {question.options.map((option) => (
                    <div
                        key={option.id}
                        className="p-4 md:p-6 hover:bg-gray-50/50 transition-colors"
                    >
                        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                            {/* Teks Pernyataan */}
                            <div className="flex-1 min-w-[300px]">
                                <p className="text-gray-700 font-medium">
                                    {option.option_text}
                                </p>
                            </div>

                            {/* Tombol Rate */}
                            <div className="flex flex-wrap items-center gap-2">
                                {dynamicScale.map((scoreValue) => {
                                    const isSelected =
                                        answers[option.id] === scoreValue;

                                    const isTakenByOther =
                                        question.options.some(
                                            (opt) =>
                                                opt.id !== option.id &&
                                                answers[opt.id] === scoreValue
                                        );

                                    return (
                                        <label
                                            key={scoreValue}
                                            className="cursor-pointer relative"
                                        >
                                            <input
                                                type="radio"
                                                name={`option_${option.id}`}
                                                value={scoreValue}
                                                checked={isSelected}
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
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border transition-all duration-200 ${
                                                    isSelected
                                                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md scale-110 z-10"
                                                        : isTakenByOther
                                                        ? "bg-gray-100 border-gray-200 text-gray-300"
                                                        : "bg-white border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500"
                                                }`}
                                            >
                                                {scoreValue}
                                            </div>
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
