import ResultItemCard from "@/Components/Result/ResultItemCard";
import UserInfoCard from "@/Components/Result/UserInfoCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function Show({ auth, testResult }) {
    if (!testResult || !testResult.user) {
        return (
            <AuthenticatedLayout user={auth?.user}>
                <div className="p-12 text-center text-red-500 font-bold border-2 border-red-100 rounded-lg m-8">
                    Data Hasil Tes Tidak Ditemukan atau Rusak.
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
                        className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 border shadow-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Detail Hasil Peserta
                    </h2>
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
                            <div className="p-12 text-center bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
                                <p className="text-gray-400 italic">
                                    Data hasil kosong atau format tidak sesuai.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
