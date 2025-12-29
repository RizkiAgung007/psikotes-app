import { CheckCircle } from "lucide-react";
import React from "react";

export default function QuestionPreviewCard({ question, index }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative group hover:border-indigo-200 transition-colors">
            {/* Badge No Soal */}
            <div className="absolute -left-3 -top-3 w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl font-bold shadow-lg shadow-indigo-200 border-4 border-gray-50 z-10">
                {index + 1}
            </div>

            {/* Pertanyaan */}
            <div className="ml-5 mb-6">
                <h4 className="text-lg text-gray-800 font-bold leading-relaxed">
                    {question.question_text}
                </h4>
            </div>

            {/* Opsi Jawaban */}
            <div className="ml-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((opt, i) => (
                    <div
                        key={opt.id}
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all"
                    >
                        {/* Label A/B/C/D */}
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 shadow-sm">
                            {String.fromCharCode(65 + i)}
                        </div>

                        <div className="flex-grow">
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                {opt.option_text}
                            </p>

                            {/* Kategori Info */}
                            <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 w-fit px-2 py-0.5 rounded-md border border-indigo-100">
                                <CheckCircle className="w-3 h-3" />
                                <span>
                                    Tipe:{" "}
                                    {opt.category
                                        ? `${opt.category.code} - ${opt.category.name}`
                                        : "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
