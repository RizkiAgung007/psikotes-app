import ResultItemCard from "@/Components/Result/ResultItemCard";
import UserInfoCard from "@/Components/Result/UserInfoCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { AlertCircle, ArrowLeft, FileText } from "lucide-react";
import React from "react";

export default function Show({ auth, testResult }) {
    if (!testResult || !testResult.user) {
        return (
            <AuthenticatedLayout user={auth?.user}>
                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center shadow-sm">
                            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-red-800 mb-2">
                                Data Tidak Ditemukan
                            </h3>
                            <p className="text-red-600">
                                Data hasil tes tidak ditemukan atau rusak.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route("admin.results.index")}
                                    className="text-red-700 font-bold hover:underline"
                                >
                                    Kembali ke Daftar
                                </Link>
                            </div>
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
                        className="p-2 bg-white rounded-lg text-gray-400 hover:text-indigo-600 border border-gray-200 shadow-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-800 leading-tight">
                            Detail Hasil Peserta
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {testResult.user.name}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Hasil - ${testResult.user.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
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
                            <div className="p-12 text-center bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Data Kosong
                                </h3>
                                <p className="text-gray-500 mt-1">
                                    Data hasil kosong atau format tidak sesuai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}s
