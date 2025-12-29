import { CheckCircle } from "lucide-react";
import React from "react";

export default function QuestionPreviewCard({ question, index }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative group hover:border-indigo-300 transition-colors">

            {/* Badge No Soal */}
            <div className="absolute -left-3 -top-3 w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold shadow-md border-2 border-white z-10">
                {index + 1}
            </div>

            {/* Pertanyaan */}
            <div className="ml-5 mb-6">
                <h4 className="text-lg text-gray-800 font-medium leading-relaxed">
                    {question.question_text}
                </h4>
            </div>

            {/* Opsi Jawaban */}
            <div className="ml-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((opt, i) => (
                    <div
                        key={opt.id}
                        className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/30 transition-colors"
                    >
                        {/* Label A/B/C/D */}
                        <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded text-xs font-bold text-gray-500 shadow-sm">
                            {String.fromCharCode(65 + i)}
                        </div>

                        <div className="flex-grow">
                            <p className="text-gray-700 text-sm font-medium">
                                {opt.option_text}
                            </p>

                            {/* Kategori Info */}
                            <div className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-indigo-500 font-bold">
                                <CheckCircle className="w-3 h-3" />
                                Tipe:{" "}
                                {opt.category
                                    ? `${opt.category.code} - ${opt.category.name}`
                                    : "-"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
