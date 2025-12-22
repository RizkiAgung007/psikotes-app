import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Trophy } from "lucide-react";
import React from "react";

export default function Result({ auth, test, results }) {
    const sortedResult = Object.entries(results || {});

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Hasil Test: {test.module.name}
                </h2>
            }
        >
            <Head title="Hasil Test" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-4 rounded-full">
                                <Trophy className="w-12 h-12 text-green-600" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-green-700 mb-2">
                            Tes Selesai!
                        </h3>
                        <p className="text-gray-500 mb-8">
                            Berikut adalah profil kepribadian anda berdasarkan
                            urutan skor dominan
                        </p>

                        {/* Table Skor */}
                        <div className="border rounded-xl overflow-hidden mb-8">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Peringkat
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Kategori / Tipe
                                        </th>
                                        <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                                            Total Skor
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {sortedResult.map(([cat, score], index) => (
                                        <tr
                                            key={cat}
                                            className={
                                                index === 0
                                                    ? "bg-green-50/50"
                                                    : ""
                                            }
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td>
                                                {cat}
                                                {index === 0 && (
                                                    <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                                                        Dominan
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold text-right">
                                                {score}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Link
                            href={route("dashboard")}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            Kembali ke Dashboard <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
