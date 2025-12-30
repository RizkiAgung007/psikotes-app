import { Link } from "@inertiajs/react";
import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    FileText,
    Lock,
    Play,
    Unlock,
} from "lucide-react";
import React from "react";

export default function ModuleCard({ module, isAdmin, onToggle }) {
    // Menghitung soal
    const questionCount = module.questions_count || 0;
    const isReady = questionCount >= 5;

    // Menentukan Warna Tema Berdasarkan Status
    const getTheme = () => {
        if (module.is_done) return { color: "emerald", icon: CheckCircle2 };
        if (!isReady) return { color: "amber", icon: AlertTriangle };
        if (!module.is_active) return { color: "rose", icon: Lock };
        return { color: "indigo", icon: FileText };
    };

    const theme = getTheme();

    // Mapping class warna 
    const colorClasses = {
        emerald: {
            border: "border-emerald-100",
            bg: "bg-emerald-50/50",
            text: "text-emerald-600",
            badge: "bg-emerald-100 text-emerald-700",
            btn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200",
            bar: "bg-emerald-500",
        },
        amber: {
            border: "border-amber-100",
            bg: "bg-amber-50/50",
            text: "text-amber-600",
            badge: "bg-amber-100 text-amber-700",
            btn: "bg-gray-100 text-gray-400 cursor-not-allowed",
            bar: "bg-amber-500",
        },
        rose: {
            border: "border-rose-100",
            bg: "bg-rose-50/50",
            text: "text-rose-600",
            badge: "bg-rose-100 text-rose-700",
            btn: "bg-gray-100 text-gray-400 cursor-not-allowed",
            bar: "bg-rose-500",
        },
        indigo: {
            border: "border-indigo-100",
            bg: "bg-white",
            text: "text-indigo-600",
            badge: "bg-indigo-50 text-indigo-700",
            btn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200",
            bar: "bg-indigo-500",
        },
    };

    const currentStyle = colorClasses[theme.color];
    const StatusIcon = theme.icon;

    return (
        <div
            className={`group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full`}
        >
            {/* Status Bar */}
            <div className={`h-1.5 w-full ${currentStyle.bar}`} />

            <div className="p-6 flex flex-col h-full">
                {/* Icon & Badge */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${currentStyle.bg} ${currentStyle.text}`}
                    >
                        <StatusIcon className="w-5 h-5" />
                    </div>

                    {/* Status Text Badge */}
                    <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${currentStyle.badge}`}
                    >
                        {module.is_done
                            ? "Selesai"
                            : !isReady
                            ? "Draft"
                            : module.is_active
                            ? "Tersedia"
                            : "Terkunci"}
                    </span>
                </div>

                {/* Title & Desc */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                        {module.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {module.description ||
                            "Tidak ada deskripsi untuk modul ini."}
                    </p>
                </div>

                {/* Info Grid (Durasi & Soal) */}
                <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                        <span className="block text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">
                            Durasi
                        </span>
                        <div className="flex items-center justify-center gap-1.5 text-gray-700 font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{module.time_limit} m</span>
                        </div>
                    </div>
                    <div
                        className={`${
                            !isReady ? "bg-amber-50 border-amber-100" : "bg-gray-50 border-gray-100"
                        } rounded-xl p-3 border text-center`}
                    >
                        <span className="block text-xs text-gray-400 font-bold uppercase tracking-wide mb-1">
                            Soal
                        </span>
                        <div
                            className={`flex items-center justify-center gap-1.5 font-bold ${
                                !isReady ? "text-amber-600" : "text-gray-700"
                            }`}
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{questionCount}</span>
                        </div>
                    </div>
                </div>

                {/* Alert jika Draft/Belum Siap */}
                {!isReady && (
                    <div className="mb-4 bg-amber-50 rounded-xl p-3 flex gap-2.5 items-start">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-amber-800 font-medium leading-relaxed">
                            Soal belum lengkap (Min. 5). Modul tidak dapat diakses.
                        </span>
                    </div>
                )}

                {/* Tombol aksi */}
                <div>
                    {isAdmin ? (
                        <button
                            onClick={() => onToggle(module.id)}
                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 border-2 flex items-center justify-center gap-2 ${
                                module.is_active
                                    ? "border-gray-200 text-gray-600 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50"
                                    : "border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                            }`}
                        >
                            {module.is_active ? (
                                <>
                                    <Lock className="w-4 h-4" /> Kunci Modul
                                </>
                            ) : (
                                <>
                                    <Unlock className="w-4 h-4" /> Buka Akses
                                </>
                            )}
                        </button>
                    ) : (
                        // Tomol user
                        <Link
                            href={route("exam.start")}
                            method="post"
                            data={{ module_id: module.id }}
                            as="button"
                            disabled={!module.is_active || !isReady || module.is_done}
                            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                                module.is_done
                                    ? "bg-emerald-100 text-emerald-700 shadow-none cursor-default"
                                    : !isReady || !module.is_active
                                    ? "bg-gray-100 text-gray-400 shadow-none cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 active:scale-95 hover:-translate-y-0.5"
                            }`}
                        >
                            {module.is_done ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" /> Selesai
                                </>
                            ) : !isReady ? (
                                <>
                                    <Lock className="w-4 h-4" /> Belum Siap
                                </>
                            ) : !module.is_active ? (
                                <>
                                    <Lock className="w-4 h-4" /> Terkunci
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 fill-current" /> Mulai Tes
                                </>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}