import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    AlertCircle,
    BookIcon,
    BookOpen,
    CheckCircle,
    Eye,
    PlayCircle,
} from "lucide-react";
import React from "react";

export default function Dashboard({ auth, modules }) {
    const isAdmin = auth.user.role === "admin";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                    Dashboard Peserta
                    {isAdmin && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200">
                            Preview
                        </span>
                    )}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Banner Welcome */}
                    <div
                        className={`rounded-2xl shadow-lg p-8 mb-10 text-white ${
                            isAdmin
                                ? "bg-gray-800"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600"
                        }`}
                    >
                        <h3 className="text-3xl font-bold mb-2">
                            {isAdmin
                                ? `Halo, ${auth.user.name}`
                                : `Halo, ${auth.user.name}! 👋`}
                        </h3>
                        <p className="opacity-90 text-lg">
                            {isAdmin
                                ? "Ini adalah tampilan yang dilihat oleh peserta. Anda tidak dapat mengerjakan tes di mode ini."
                                : "Selamat datang di platform asesmen. Silakan pilih modul tes yang tersedia di bawah ini."}
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BookIcon className="w-6 h-6 text-indigo-600" />
                        Daftar Modul Tes
                    </h3>

                    {/* Grid Modul */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.map((module) => (
                            <div
                                key={module.id}
                                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 ${
                                    module.is_done
                                        ? "border-green-200 bg-green-50/30"
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
                                                    : "bg-indigo-50 text-indigo-600"
                                            }`}
                                        >
                                            {module.is_done ? (
                                                <CheckCircle className="w-6 h-6" />
                                            ) : (
                                                <BookOpen className="w-6 h-6" />
                                            )}
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                                        {module.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
                                        {module.description || "Tes Kometensi."}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                        <div className="flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />{" "}
                                            {module.questions_count} Soal
                                        </div>
                                    </div>

                                    {/* Tombol Role */}
                                    <div className="pt-4 border-t border-gray-100">
                                        {isAdmin ? (
                                            <button
                                                disabled
                                                className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-400 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed border border-gray-200"
                                            >
                                                <Eye className="w-5 h-5" />
                                                Preview
                                            </button>
                                        ) : module.is_done ? (
                                            <button
                                                disabled
                                                className="w-full flex justify-center items-center gap-2 bg-gray-100 text-gray-500 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                                Sudah Dikerjakan
                                            </button>
                                        ) : (
                                            <Link
                                                href={route("exam.start")}
                                                method="post"
                                                data={{ module_id: module.id }}
                                                as="button"
                                                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm"
                                            >
                                                <PlayCircle className="w-5 h-5" />
                                                Mulai Tes
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
