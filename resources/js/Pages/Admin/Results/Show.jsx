import ResultItemCard from "@/Components/Result/ResultItemCard";
import UserInfoCard from "@/Components/Result/UserInfoCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Activity, AlertCircle, ArrowLeft, FileText } from "lucide-react";
import React from "react";

export default function Show({ auth, testResult }) {
    // Tampilan Error jika data tidak valid
    if (!testResult || !testResult.user) {
        return (
            <AuthenticatedLayout user={auth?.user}>
                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-12 text-center shadow-sm">
                            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                                <AlertCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-red-900 mb-2">
                                Data Tidak Ditemukan
                            </h3>
                            <p className="text-red-700 mb-8 max-w-md mx-auto">
                                Data hasil tes untuk peserta ini tidak ditemukan atau mungkin telah dihapus.
                            </p>
                            <Link
                                href={route("admin.results.index")}
                                className="inline-flex items-center gap-2 bg-white text-red-700 border border-red-200 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-red-50 transition-all active:scale-95"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Kembali ke Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Melakukan parsing data ke json
    let results = [];
    try {
        if (typeof testResult.result === "string") {
            results = JSON.parse(testResult.result);
        } else {
            results = testResult.result || [];
        }
    } catch (e) {
        console.error("JSON Error:", e);
        results = [];
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.results.index")}
                        className="p-2.5 bg-white rounded-xl text-gray-500 hover:text-indigo-600 border border-gray-200 shadow-sm transition-all hover:bg-gray-50"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600 hidden sm:block">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-gray-900 leading-tight">
                                Detail Hasil Peserta
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {testResult.user.name}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Hasil - ${testResult.user.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Render Komponen Info User */}
                    <UserInfoCard
                        user={testResult.user}
                        moduleName={testResult.module?.name}
                        finishedAt={testResult.finished_at}
                    />

                    {/* Render List Hasil */}
                    <div className="space-y-6">
                        {Array.isArray(results) && results.length > 0 ? (
                            results.map((item, index) => (
                                <ResultItemCard key={index} item={item} />
                            ))
                        ) : (
                            <div className="p-16 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Data Kosong
                                </h3>
                                <p className="text-gray-500 max-w-xs mx-auto">
                                    Data hasil interpretasi kosong atau format data tidak valid.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}