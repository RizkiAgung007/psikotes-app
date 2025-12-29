import ResultTable from "@/Components/Result/ResultTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Head, router } from "@inertiajs/react";
import { Activity, AlertTriangle } from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, results }) {
    const [confirmingReset, setConfirmingReset] = useState(false);
    const [resetTarget, setResetTarget] = useState({ id: null, name: "" });

    // Fungsi Reset
    const handleReset = (id, name) => {
        setResetTarget({ id, name });
        setConfirmingReset(true);
    };

    const closeModal = () => {
        setConfirmingReset(false);
        setResetTarget({ id: null, name: "" });
    };

    const executeReset = () => {
        router.delete(route("admin.results.destroy", resetTarget.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Activity className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="font-bold text-xl text-gray-800 leading-tight">
                        Monitoring Hasil Tes
                    </h2>
                </div>
            }
        >
            <Head title="Riwayat Hasil Tes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Table Component */}
                    <ResultTable results={results} onReset={handleReset} />
                </div>
            </div>

            <Modal show={confirmingReset} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Reset Hasil Tes?
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        Apakah Anda yakin ingin me-reset hasil tes milik "
                        {resetTarget.name}"? <br />
                        User harus mengerjakan ulang tes ini.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton onClick={executeReset}>
                            Ya, Reset Data
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
