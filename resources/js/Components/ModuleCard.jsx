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
            className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${
                module.is_done
                    ? "border-green-200 bg-green-50/30"
                    : !module.is_active && !isAdmin
                    ? "border-gray-200 bg-gray-50 opacity-75"
                    : "border-gray-200"
            }`}
        >
            <div className="p-6">
                {/* Kartu Modul */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`p-3 rounded-lg ${
                            module.is_done
                                ? "bg-green-100 text-green-600"
                                : !module.is_active
                                ? "bg-red-200 text-gray-500"
                                : "bg-indigo-50 text-indigo-600"
                        }`}
                    >
                        {module.is_done ? (
                            <CheckCircle className="w-6 h-6" />
                        ) : !module.is_active ? (
                            <div className="text-red-700 border-red-200">
                                <Lock className="w-6 h-6" />
                            </div>
                        ) : (
                            <BookOpen className="w-6 h-6" />
                        )}
                    </div>

                    {/* Badge status khusus Admin */}
                    {isAdmin && (
                        <span
                            className={`text-xs font-bold px-2 py-1 rounded border ${
                                module.is_active
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                            }`}
                        >
                            {module.is_active ? "Terbuka" : "Terkunci"}
                        </span>
                    )}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {module.name}
                </h4>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                    {module.description || "Tes Kompetensi."}
                </p>

                {/* Info Soal */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />{" "}
                        {module.questions_count} Soal
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-4 border-t border-gray-100">
                    {isAdmin ? (
                        <div className="flex gap-2">
                            <button
                                disabled
                                className="flex-1 flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed border border-gray-200 text-sm"
                            >
                                <Eye className="w-4 h-4" /> Preview
                            </button>

                            <button
                                onClick={() => onToggle(module.id)}
                                className={`flex-1 flex justify-center items-center gap-2 font-bold py-2.5 px-4 rounded-lg transition-all border text-sm ${
                                    module.is_active
                                        ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                        : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
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
                        // User Biasa
                        <>
                            {module.is_done ? (
                                <button
                                    disabled
                                    className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-500 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed"
                                >
                                    <CheckCircle className="w-5 h-5" /> Sudah
                                    Dikerjakan
                                </button>
                            ) : !module.is_active ? (
                                <button
                                    disabled
                                    className="w-full flex justify-center items-center gap-2 bg-gray-200 text-gray-400 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed border border-gray-300"
                                >
                                    <Lock className="w-5 h-5" /> Belum Dibuka
                                </button>
                            ) : (
                                <Link
                                    href={route("exam.start")}
                                    method="post"
                                    data={{ module_id: module.id }}
                                    as="button"
                                    className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm"
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
