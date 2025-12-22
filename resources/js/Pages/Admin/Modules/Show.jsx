import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, FileText, Hash, Layers } from "lucide-react";
import React from "react";

export default function Show({ auth, module }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-6">
                    <Layers className="w-6 h-6 text-gray-700" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Review Modal
                    </h2>
                </div>
            }
        >
            <Head title={`Review ${module.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Info Kartu Modul */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {module.name}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {module.description ||
                                    "Tidak ada deskripsi untuk modul ini."}
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-100">
                                    <Hash className="w-4 h-4" />
                                    Total {module.questions.length} Soal
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Preview Soal */}
                    <div className="space-y-6">
                        {module.questions.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">
                                    Belum ada soal di modul ini
                                </p>
                            </div>
                        ) : (
                            module.questions.map((q, index) => (
                                <div
                                    key={q.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative group hover:border-indigo-300 transition-colors"
                                >
                                    {/* Badge No Soal */}
                                    <div className="absolute -left-3 -top-3 w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold shadow-md border-2 border-white z-10">
                                        {index + 1}
                                    </div>

                                    {/* Pertanyaan */}
                                    <div className="ml-5 mb-6">
                                        <h4 className="text-lg text-gray-800 font-medium leading-relaxed">
                                            {q.question_text}
                                        </h4>
                                    </div>

                                    {/* Opsi Jawaban */}
                                    <div className="ml-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {q.options.map((opt, index) => (
                                            <div
                                                key={opt.id}
                                                className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/30 transition-colors"
                                            >
                                                {/* Label A/B/C/D */}
                                                <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded text-xs font-bold text-gray-500 shadow-sm">
                                                    {String.fromCharCode(
                                                        65 + index
                                                    )}
                                                </div>

                                                <div className="flex-grow">
                                                    <p className="text-gray-700 text-sm font-medium">
                                                        {opt.option_text}
                                                    </p>

                                                    {/* Kategori */}
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
                            ))
                        )}
                    </div>

                    {/* Tombol Kembali */}
                    <div className="mt-10 flex justify-center mb-10">
                        <Link
                            href={route("admin.questions.index")}
                            className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                        >
                            <ArrowLeft />
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
