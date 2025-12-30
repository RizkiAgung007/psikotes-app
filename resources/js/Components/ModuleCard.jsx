import { Link } from "@inertiajs/react";
import {
    AlertCircle,
    BookOpen,
    CheckCircle,
    Eye,
    Lock,
    PlayCircle,
    Unlock,
    FileWarning, 
} from "lucide-react";
import React from "react";

export default function ModuleCard({ module, isAdmin, onToggle }) {
    // Cek Jumlah Soal
    const questionCount = module.questions_count || 0;
    const isReady = questionCount >= 5; 

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md flex flex-col h-full ${
                module.is_done
                    ? "border-green-200 bg-green-50/30"
                    : !isReady
                    ? "border-amber-200 bg-amber-50/30"
                    : !module.is_active && !isAdmin
                    ? "border-gray-200 bg-gray-50 opacity-75"
                    : "border-gray-200"
            }`}
        >
            <div className="p-5 sm:p-6 flex-grow">
                {/* Header Kartu */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`p-3 rounded-xl shadow-sm ${
                            module.is_done
                                ? "bg-green-100 text-green-600"
                                : !isReady 
                                ? "bg-amber-100 text-amber-600"
                                : !module.is_active
                                ? "bg-red-100 text-red-500"
                                : "bg-indigo-50 text-indigo-600"
                        }`}
                    >
                        {module.is_done ? (
                            <CheckCircle className="w-6 h-6" />
                        ) : !isReady ? (
                            <FileWarning className="w-6 h-6" /> 
                        ) : !module.is_active ? (
                            <Lock className="w-6 h-6" />
                        ) : (
                            <BookOpen className="w-6 h-6" />
                        )}
                    </div>

                    {/* Badge Status (Admin & User) */}
                    <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            module.is_done
                                ? "bg-green-100 text-green-700 border-green-200"
                                : !isReady
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : module.is_active
                                ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                                : "bg-red-100 text-red-700 border-red-200"
                        }`}
                    >
                        {module.is_done
                            ? "Selesai"
                            : !isReady
                            ? "Draft (Belum Siap)"
                            : module.is_active
                            ? "Terbuka"
                            : "Terkunci"}
                    </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {module.name}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10 leading-relaxed">
                    {module.description || "Tes Kompetensi."}
                </p>

                {/* Info Soal */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 bg-white/60 p-2 rounded-lg border border-gray-100 w-fit px-3">
                    <div className="flex items-center gap-2">
                        <AlertCircle
                            className={`w-4 h-4 ${
                                isReady ? "text-indigo-500" : "text-amber-500"
                            }`}
                        />
                        <span className="font-medium">
                            {questionCount} Soal
                        </span>
                    </div>
                </div>

                {/* Alert jika soal kosong/kurang */}
                {!isReady && (
                    <div className="mb-4 bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            Modul ini belum memiliki soal yang cukup (Min. 5).
                            Tidak dapat dikerjakan.
                        </p>
                    </div>
                )}
            </div>

            {/* Tombol Aksi */}
            <div className="p-5 sm:p-6 pt-0 mt-auto">
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
                            // Admin tetap bisa lock/unlock meski soal kosong (opsional)
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
                        ) : !isReady ? (
                            // Tombol Disabled jika Not Ready
                            <button
                                disabled
                                className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-bold py-2.5 px-4 rounded-xl cursor-not-allowed border border-gray-200 text-sm"
                            >
                                <Lock className="w-5 h-5" /> Belum Siap
                            </button>
                        ) : !module.is_active ? (
                            <button
                                disabled
                                className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-bold py-2.5 px-4 rounded-xl cursor-not-allowed border border-gray-200 text-sm"
                            >
                                <Lock className="w-5 h-5" /> Terkunci
                            </button>
                        ) : (
                            <Link
                                href={route("exam.start")}
                                method="post"
                                data={{ module_id: module.id }}
                                as="button"
                                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 text-sm hover:-translate-y-0.5"
                            >
                                <PlayCircle className="w-5 h-5" /> Mulai Tes
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}