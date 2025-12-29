import QuestionPreviewCard from "@/Components/Question/QuestionPreviewCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, FileText, Hash, Layers } from "lucide-react";
import React from "react";

export default function Show({ auth, module }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Layers className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="font-bold text-xl text-gray-800 leading-tight">
                        Review Modul
                    </h2>
                </div>
            }
        >
            <Head title={`Review ${module.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Header Info Modul */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                        <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {module.name}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {module.description ||
                                    "Tidak ada deskripsi untuk modul ini."}
                            </p>

                            <div className="mt-6 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100 shadow-sm">
                                    <Hash className="w-4 h-4" />
                                    Total {module.questions.length} Soal
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Preview Soal */}
                    <div className="space-y-6">
                        {module.questions.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Belum ada soal
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    Modul ini belum memiliki soal.
                                </p>
                            </div>
                        ) : (
                            // Looping menggunakan komponen baru
                            module.questions.map((q, index) => (
                                <QuestionPreviewCard
                                    key={q.id}
                                    question={q}
                                    index={index}
                                />
                            ))
                        )}
                    </div>

                    {/* Tombol Kembali */}
                    <div className="mt-10 flex justify-center mb-10">
                        <Link
                            href={route("admin.questions.index")}
                            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Kembali ke Daftar Soal
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
