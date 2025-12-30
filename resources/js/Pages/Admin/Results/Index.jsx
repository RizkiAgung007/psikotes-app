import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import ResultTable from "@/Components/Result/ResultTable";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Monitoring Hasil Tes
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Pantau riwayat dan reset hasil tes peserta jika diperlukan.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Riwayat Hasil Tes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Table Component */}
                    <ResultTable results={results} onReset={handleReset} />
                </div>
            </div>

            {/* Modal Konfirmasi Reset */}
            <Modal show={confirmingReset} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Reset Hasil Tes?
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Tindakan ini akan menghapus data jawaban peserta.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        Apakah Anda yakin ingin me-reset hasil tes milik{" "}
                        <span className="font-bold text-gray-900">
                            "{resetTarget.name}"
                        </span>
                        ?
                        <br />
                        Peserta harus mengerjakan ulang tes ini dari awal. Data
                        yang sudah dihapus tidak dapat dikembalikan.
                    </p>

                    <div className="flex justify-end gap-3">
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