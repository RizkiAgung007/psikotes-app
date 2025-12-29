import { Link } from "@inertiajs/react";
import { Eye, Folder, Hash, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function QuestionGroup({ moduleName, questions, onDelete }) {
    const firstQuestion = questions[0];
    const moduleId = firstQuestion?.module?.id;

    return (
        <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 transition-all hover:shadow-md">
            {/* Header Modul */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600 shrink-0">
                        <Folder className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {moduleName}
                        </h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                            Modul Soal
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Tombol Review */}
                    {moduleId && (
                        <Link
                            href={route("admin.modules.show", moduleId)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-xl text-sm font-bold hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                            title="Review Tampilan Modul"
                        >
                            <Eye className="w-4 h-4" />
                            Review
                        </Link>
                    )}

                    <span className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-indigo-200 shadow-sm">
                        <Hash className="w-3.5 h-3.5" />
                        {questions.length} Soal
                    </span>
                </div>
            </div>

            {/* Tabel Soal */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <th className="px-6 py-4 w-16 text-center">No</th>
                            <th className="px-6 py-4 min-w-[200px]">
                                Pertanyaan
                            </th>
                            <th className="px-6 py-4 w-1/3 min-w-[300px]">
                                Opsi Jawaban
                            </th>
                            <th className="px-6 py-4 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {questions.map((q, index) => (
                            <tr
                                key={q.id}
                                className="hover:bg-gray-50/80 transition-colors duration-150 group"
                            >
                                <td className="px-6 py-5 text-center text-gray-400 font-medium">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-gray-900 font-medium line-clamp-2 leading-relaxed text-sm sm:text-base">
                                        {q.question_text}
                                    </p>
                                </td>

                                {/* Badge Opsi */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        {q.options.map((opt, i) => (
                                            <div
                                                key={opt.id}
                                                className="group/tooltip relative"
                                            >
                                                <span className="cursor-help inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm transition-all">
                                                    <span className="font-bold text-gray-400 group-hover:text-indigo-500">
                                                        {String.fromCharCode(
                                                            65 + i
                                                        )}
                                                    </span>
                                                    <span className="h-3 w-px bg-gray-200"></span>
                                                    <span className="font-bold">
                                                        {opt.category
                                                            ? opt.category.code
                                                            : "?"}
                                                    </span>
                                                </span>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium rounded-lg py-2 px-3 z-10 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                                                    {opt.option_text}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                {/* Tombol Aksi Row */}
                                <td className="px-6 py-5">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link
                                            href={route(
                                                "admin.questions.edit",
                                                q.id
                                            )}
                                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>

                                        <button
                                            onClick={() => onDelete(q.id)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
