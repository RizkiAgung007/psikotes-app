import ResultTable from "@/Components/Result/ResultTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import React from "react";

export default function Index({ auth, results }) {
    // Logic Reset (Callback)
    const handleReset = (id, name) => {
        if (
            confirm(
                `Apakah Anda yakin ingin me-reset hasil tes milik "${name}"? \nUser harus mengerjakan ulang tes ini.`
            )
        ) {
            router.delete(route("admin.results.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Monitoring Hasil Tes
                </h2>
            }
        >
            <Head title="Riwayat Hasil Tes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Panggil Table Component */}
                    <ResultTable results={results} onReset={handleReset} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
