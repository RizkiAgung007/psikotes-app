import { Link } from "@inertiajs/react";
import { Eye, Folder, Hash, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function QuestionGroup({ moduleName, questions, onDelete }) {
    const firstQuestion = questions[0];
    const moduleId = firstQuestion?.module?.id;

    return (
        <div className="mb-8 bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
            {/* Header Modul */}
            <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm text-indigo-600">
                        <Folder className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">
                            {moduleName}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            Modul Soal
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Tombol Review */}
                    {moduleId && (
                        <Link
                            href={route("admin.modules.show", moduleId)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-sm"
                            title="Review Tampilan Modul"
                        >
                            <Eye className="w-4 h-4" />
                            Review
                        </Link>
                    )}

                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
                        <Hash className="w-3 h-3" />
                        {questions.length} Soal
                    </span>
                </div>
            </div>

            {/* Tabel Soal */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-white border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                            <th className="px-6 py-4 w-16 text-center">No</th>
                            <th className="px-6 py-4">Pertanyaan</th>
                            <th className="px-6 py-4 w-1/3">Opsi Jawaban</th>
                            <th className="px-6 py-4 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {questions.map((q, index) => (
                            <tr
                                key={q.id}
                                className="hover:bg-gray-50 transition-colors duration-150 group"
                            >
                                <td className="px-6 py-4 text-center text-gray-400 font-medium">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-800 font-medium line-clamp-2 leading-relaxed">
                                        {q.question_text}
                                    </p>
                                </td>

                                {/* Badge Opsi */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {q.options.map((opt, i) => (
                                            <div
                                                key={opt.id}
                                                className="group/tooltip relative"
                                            >
                                                <span className="cursor-help inline-flex items-center gap-1.5 px-2 py-1 rounded border border-gray-200 bg-white text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                                                    <span className="font-bold text-gray-400">
                                                        {String.fromCharCode(65 + i)}
                                                    </span>
                                                    <span className="h-3 w-px bg-gray-200"></span>
                                                    <span className="font-medium">
                                                        {opt.category
                                                            ? opt.category.code
                                                            : "?"}
                                                    </span>
                                                </span>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block w-max max-w-xs bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 shadow-lg">
                                                    {opt.option_text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                {/* Tombol Aksi Row */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-2">
                                        <Link
                                            href={route(
                                                "admin.questions.edit",
                                                q.id
                                            )}
                                            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
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
