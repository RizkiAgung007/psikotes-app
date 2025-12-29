import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Activity, CheckCircle, Home, Trophy, Hash } from "lucide-react";
import React from "react";

export default function Result({ auth, test, results }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-green-600">
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
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mb-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                        <div className="flex justify-center mb-4">
                            <div className="bg-green-50 p-4 rounded-full text-green-500 ring-8 ring-green-50/50">
                                <Trophy className="w-12 h-12" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                            Tes Selesai!
                        </h3>
                        <p className="text-gray-500 text-lg max-w-xl mx-auto">
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
                                    className={`bg-white overflow-hidden shadow-sm sm:rounded-xl border transition-all duration-300 p-6 md:p-8
                                    ${
                                        isRank1
                                            ? "border-indigo-200 ring-4 ring-indigo-50 shadow-indigo-100"
                                            : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                                    }`}
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                                        <div>
                                            {/* Badge Rank */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                        isRank1
                                                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                                            : "bg-gray-50 text-gray-600 border-gray-200"
                                                    }`}
                                                >
                                                    {isRank1 ? (
                                                        <Trophy className="w-3 h-3" />
                                                    ) : (
                                                        <Hash className="w-3 h-3" />
                                                    )}
                                                    {isRank1
                                                        ? "Tipe Dominan (Rank 1)"
                                                        : `Peringkat #${result.rank}`}
                                                </span>
                                            </div>

                                            {/* Judul Kategori */}
                                            <h4 className="text-2xl md:text-3xl font-bold text-gray-900">
                                                Tipe {result.name}
                                            </h4>
                                        </div>

                                        {/* Score Box */}
                                        <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-3 rounded-xl border border-gray-200 min-w-[100px]">
                                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                                <Activity className="w-3 h-3" />
                                                Total Skor
                                            </div>
                                            <span className="text-3xl font-bold text-indigo-600 leading-none mt-1">
                                                {result.score}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="prose max-w-none text-gray-600 leading-relaxed text-justify">
                                        <p className="text-base md:text-lg">
                                            {result.description ||
                                                "Tidak ada deskripsi tersedia untuk peringkat ini."}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-10 flex justify-center pb-12">
                        <Link
                            href={route("dashboard")}
                            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-gray-200 transition-all transform active:scale-95"
                        >
                            <Home className="w-5 h-5" /> Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
