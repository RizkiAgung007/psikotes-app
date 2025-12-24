import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle, Home } from "lucide-react";
import React from "react";

export default function Result({ auth, test, results }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hasil Tes: {test.module ? test.module.name : "Evaluasi"}
                </h2>
            }
        >
            <Head title="Hasil Tes" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6 p-8 text-center border-b-4 border-indigo-500">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">
                            Tes Selesai!
                        </h3>
                        <p className="text-gray-500 text-lg">
                            Berikut adalah analisis lengkap profil Anda
                            berdasarkan jawaban yang telah diberikan.
                        </p>
                    </div>

                    {/* Hasil Tes looping semu/a */}
                    <div className="space-y-6">
                        {results.map((result, index) => (
                            <div
                                key={result.id}
                                className={`bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-8 transition-all
                                    ${
                                        index === 0
                                            ? "ring-2 ring-indigo-500 shadow-indigo-100"
                                            : ""
                                    }
                                `}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                                    <div>
                                        {/* Label */}
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                ${
                                                    index === 0
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {index === 0
                                                    ? "Tipe Dominan (Rank 1)"
                                                    : `Peringkat #${result.rank}`}
                                            </span>
                                        </div>

                                        {/* Kategori */}
                                        <h4 className="text-2xl font-bold text-gray-800">
                                            Tipe: {result.name}
                                        </h4>
                                    </div>

                                    {/* Skor/ */}
                                    <div className="text-right">
                                        <span className="block text-sm text-gray-400">
                                            Total Skor
                                        </span>
                                        <span className="block text-xl font-bold text-indigo-600">
                                            {result.score}
                                        </span>
                                    </div>
                                </div>

                                {/* Deskripsi */}
                                <div className="prose max-w-none text-gray-700 leading-relaxed text-justify">
                                    <p className="text-lg">
                                        {result.description ||
                                            "Tidak ada deskripsi tersedia untuk peringkat ini."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-8 flex justify-center">
                        <Link
                            href={route("dashboard")}
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                        >
                            <Home className="w-5 h-5" /> Kembali ke Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
