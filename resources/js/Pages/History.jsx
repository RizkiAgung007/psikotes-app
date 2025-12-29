import HistoryTable from "@/Components/History/HistoryTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

export default function History({ auth, histories }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Riwayat Tes Saya
                </h2>
            }
        >
            <Head title="Riwayat Tes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-6">
                            {/* Render Table Component */}
                            <HistoryTable histories={histories} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
