import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, FileText, User } from "lucide-react";
import React from "react";

export default function Show({ auth, testResult }) {
    // Helper mengubah data hasil dari JSON ke array aman
    const getResultData = (data) => {
        if (typeof data === "string") {
            try {
                return JSON.parse(data);
            } catch (e) {
                return [];
            }
        }
        return data || [];
    };

    const results = getResultData(testResult.result);

    // Helper format tanggal
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.results.index")}
                        className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 border shadow-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Hasil Peserta: {testResult.user.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Hasil - ${testResult.user.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Info User */}
                    <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <User className="w-6 h-6 text-indigo-600" />
                                {testResult.user.name}
                            </h3>
                            <p className="text-gray-500 text-sm ml-8">
                                {testResult.user.email}
                            </p>
                        </div>
                        <div className="text-right space-y-1">
                            <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                                <FileText className="w-4 h-4" />
                                Modul:{" "}
                                <span className="font-bold">
                                    {testResult.module.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                Selesai:{" "}
                                <span className="font-bold">
                                    {formatDate(testResult.finished_at)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hasil Tes looping semua */}
                    <div className="space-y-6">
                        {results.length > 0 ? (
                            results.map((item, index) => (
                                <div key={index} c>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                                                    ${
                                                        item.rank === 1
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-gray-100 text-gray-600"
                                                    }
                                                `}
                                                >
                                                    {item.rank === 1
                                                        ? "Dominan (Rank 1)"
                                                        : `Peringkat #${item.rank}`}
                                                </span>
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-800">
                                                Tipe {item.name} ({item.code})
                                            </h4>
                                        </div>
                                        <div className="text-center bg-gray-50 px-4 py-2 rounded-lg">
                                            <span className="block text-xs text-gray-400 uppercase">
                                                Skor
                                            </span>
                                            <span className="block text-xl font-bold text-indigo-600">
                                                {item.score}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="prose max-w-none text-gray-700 leading-relaxed text-justify border-t pt-4 border-b-4">
                                        {item.description}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
                                <p className="text-gray-400 italic">
                                    Data hasil tidak dapat dibaca atau kosong.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
