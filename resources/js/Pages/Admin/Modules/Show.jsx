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
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Review Modul
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Tinjau detail modul dan daftar soal.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Review ${module.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Header Info Modul */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                        <div className="p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 relative">
                            {/* Background Decoration */}
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                                    {module.name}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg max-w-3xl">
                                    {module.description ||
                                        "Tidak ada deskripsi untuk modul ini."}
                                </p>

                                <div className="mt-6 flex items-center gap-3">
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold border border-indigo-100 shadow-sm">
                                        <Hash className="w-4 h-4" />
                                        Total {module.questions.length} Soal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Preview Soal */}
                    <div className="space-y-6">
                        {module.questions.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Belum ada soal
                                </h3>
                                <p className="text-gray-500 max-w-xs mx-auto">
                                    Modul ini belum memiliki soal. Silakan tambahkan soal melalui menu Kelola Soal.
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
                    <div className="mt-10 flex justify-center pb-12">
                        <Link
                            href={route("admin.questions.index")}
                            className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-bold py-3 px-8 rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 transform hover:-translate-y-0.5"
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