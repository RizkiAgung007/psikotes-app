import { Link } from "@inertiajs/react";
import {
    AlertCircle,
    BookOpen,
    CheckCircle,
    Eye,
    Lock,
    PlayCircle,
    Unlock,
} from "lucide-react";
import React from "react";

export default function ModuleCard({ module, isAdmin, onToggle }) {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                module.is_done
                    ? "border-green-200 bg-green-50/30"
                    : !module.is_active && !isAdmin
                    ? "border-gray-200 bg-gray-50 opacity-75"
                    : "border-gray-200"
            }`}
        >
            <div className="p-5 sm:p-6">
                {/* Kartu Modul */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`p-3 rounded-xl shadow-sm ${
                            module.is_done
                                ? "bg-green-100 text-green-600"
                                : !module.is_active
                                ? "bg-red-100 text-red-500"
                                : "bg-indigo-50 text-indigo-600"
                        }`}
                    >
                        {module.is_done ? (
                            <CheckCircle className="w-6 h-6" />
                        ) : !module.is_active ? (
                            <Lock className="w-6 h-6" />
                        ) : (
                            <BookOpen className="w-6 h-6" />
                        )}
                    </div>

                    {/* Badge status khusus Admin */}
                    {isAdmin && (
                        <span
                            className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                module.is_active
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                            }`}
                        >
                            {module.is_active ? "Terbuka" : "Terkunci"}
                        </span>
                    )}
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {module.name}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
                    {module.description || "Tes Kompetensi."}
                </p>

                {/* Info Soal */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 bg-gray-50 p-2 rounded-lg border border-gray-100 w-fit px-3">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-indigo-500" />{" "}
                        <span className="font-medium">
                            {module.questions_count} Soal
                        </span>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-4 border-t border-gray-100">
                    {isAdmin ? (
                        <div className="flex gap-2">
                            <button
                                disabled
                                className="flex-1 flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-semibold py-2.5 px-4 rounded-xl cursor-not-allowed border border-gray-200 text-sm transition-colors"
                            >
                                <Eye className="w-4 h-4" /> Preview
                            </button>

                            <button
                                onClick={() => onToggle(module.id)}
                                className={`flex-1 flex justify-center items-center gap-2 font-bold py-2.5 px-4 rounded-xl transition-all border text-sm shadow-sm active:scale-95 ${
                                    module.is_active
                                        ? "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                        : "bg-white text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300"
                                }`}
                            >
                                {module.is_active ? (
                                    <>
                                        <Lock className="w-4 h-4" /> Kunci
                                    </>
                                ) : (
                                    <>
                                        <Unlock className="w-4 h-4" /> Buka
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* User Biasa */
                        <>
                            {module.is_done ? (
                                <button
                                    disabled
                                    className="w-full flex justify-center items-center gap-2 bg-green-50 text-green-600 font-bold py-2.5 px-4 rounded-xl cursor-not-allowed border border-green-200 text-sm"
                                >
                                    <CheckCircle className="w-5 h-5" /> Sudah
                                    Dikerjakan
                                </button>
                            ) : !module.is_active ? (
                                <button
                                    disabled
                                    className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-bold py-2.5 px-4 rounded-xl cursor-not-allowed border border-gray-200 text-sm"
                                >
                                    <Lock className="w-5 h-5" /> Belum Dibuka
                                </button>
                            ) : (
                                <Link
                                    href={route("exam.start")}
                                    method="post"
                                    data={{ module_id: module.id }}
                                    as="button"
                                    className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm"
                                >
                                    <PlayCircle className="w-5 h-5" /> Mulai Tes
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
