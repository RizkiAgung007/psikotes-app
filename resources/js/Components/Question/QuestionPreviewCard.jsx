import { CheckCircle } from "lucide-react";
import React from "react";

export default function QuestionPreviewCard({ question, index }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 relative group hover:border-indigo-200 hover:shadow-md transition-all duration-300">
            {/* Badge No Soal */}
            <div className="absolute -left-3 -top-3 w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl font-bold shadow-lg shadow-indigo-200 border-4 border-gray-50 z-10 text-sm">
                {index + 1}
            </div>

            {/* Pertanyaan */}
            <div className="ml-2 mb-6 pl-4 border-l-2 border-indigo-100">
                <h4 className="text-lg text-gray-900 font-bold leading-relaxed">
                    {question.question_text}
                </h4>
            </div>

            {/* Opsi Jawaban */}
            <div className="ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((opt, i) => (
                    <div
                        key={opt.id}
                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all duration-200 group/option"
                    >
                        {/* Label A/B/C/D */}
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 shadow-sm group-hover/option:text-indigo-600 group-hover/option:border-indigo-100">
                            {String.fromCharCode(65 + i)}
                        </div>

                        <div className="flex-grow">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed mb-2">
                                {opt.option_text}
                            </p>

                            {/* Kategori Info */}
                            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-indigo-700 font-bold bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">
                                <CheckCircle className="w-3 h-3" />
                                <span>
                                    {opt.category
                                        ? `${opt.category.code} - ${opt.category.name}`
                                        : "Tanpa Kategori"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}