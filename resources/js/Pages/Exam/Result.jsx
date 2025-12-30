import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Activity, CheckCircle, Hash, Home, Trophy } from "lucide-react";
import React from "react";

export default function Result({ auth, test, results }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-emerald-600">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Hasil Tes
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            {test.module ? test.module.name : "Evaluasi"}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Hasil Tes" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Success Banner */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center mb-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />
                        
                        <div className="flex justify-center mb-6">
                            <div className="bg-emerald-50 p-5 rounded-full text-emerald-500 ring-8 ring-emerald-50/50 shadow-sm animate-in zoom-in duration-500">
                                <Trophy className="w-12 h-12" />
                            </div>
                        </div>
                        
                        <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                            Tes Selesai!
                        </h3>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
                            Terima kasih telah berpartisipasi. Berikut adalah
                            analisis lengkap profil Anda berdasarkan jawaban
                            yang telah diberikan.
                        </p>
                    </div>

                    {/* Hasil Tes Looping */}
                    <div className="space-y-6">
                        {results.map((result, index) => {
                            const isRank1 = index === 0;

                            return (
                                <div
                                    key={result.id}
                                    className={`bg-white overflow-hidden shadow-sm sm:rounded-2xl border transition-all duration-300 p-6 sm:p-8
                                    ${
                                        isRank1
                                            ? "border-indigo-200 ring-4 ring-indigo-50 shadow-indigo-100 z-10 relative transform hover:-translate-y-1"
                                            : "border-gray-100 hover:border-indigo-200 hover:shadow-md"
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                                        <div className="flex-1">
                                            {/* Badge Rank */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                        isRank1
                                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                                                            : "bg-gray-50 text-gray-600 border-gray-200"
                                                    }`}
                                                >
                                                    {isRank1 ? (
                                                        <Trophy className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <Hash className="w-3.5 h-3.5" />
                                                    )}
                                                    {isRank1
                                                        ? "Dominan (Rank 1)"
                                                        : `Peringkat #${result.rank}`}
                                                </span>
                                            </div>

                                            {/* Judul Kategori */}
                                            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                                Tipe {result.name}
                                            </h4>
                                            <p className="text-gray-400 font-medium text-lg mt-1">
                                                Kode: {result.code}
                                            </p>
                                        </div>

                                        {/* Score Box */}
                                        <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 min-w-[120px] self-start md:self-center">
                                            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                                <Activity className="w-3.5 h-3.5" />
                                                Total Skor
                                            </div>
                                            <span className="text-4xl font-extrabold text-indigo-600 leading-none mt-1 tracking-tight">
                                                {result.score}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="prose max-w-none text-gray-600 leading-relaxed text-justify">
                                        <p className="text-base md:text-lg">
                                            {result.description || (
                                                <span className="italic text-gray-400">
                                                    Tidak ada deskripsi tersedia untuk peringkat ini.
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-12 flex justify-center pb-16">
                        <Link
                            href={route("dashboard")}
                            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-xl shadow-gray-200 transition-all transform active:scale-95 hover:-translate-y-0.5"
                        >
                            <Home className="w-5 h-5" />
                            Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}