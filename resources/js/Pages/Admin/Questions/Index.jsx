import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import QuestionGroup from "@/Components/QuestionGroup";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { AlertTriangle, FileQuestion, LayoutList, Plus } from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, questions }) {
    const [confirmationDelete, setConfirmationDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Grouping Data
    const groupedQuestions = questions.reduce((groups, question) => {
        const moduleName = question.module
            ? question.module.name
            : "Tanpa Module";
        if (!groups[moduleName]) {
            groups[moduleName] = [];
        }
        groups[moduleName].push(question);
        return groups;
    }, {});

    // Fungsi open modal
    const openModal = (id) => {
        setDeleteId(id);
        setConfirmationDelete(true);
    };

    // Fungsi close modal
    const closeModal = () => {
        setConfirmationDelete(false);
        setDeleteId(null);
    };

    // Tombol hapus
    const deleteModal = () => {
        router.delete(route("admin.questions.destroy", deleteId), {
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
                        <LayoutList className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Kelola Soal
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Atur daftar pertanyaan dan modul.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Daftar Soal" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Tombol Tambah Soal */}
                    <div className="flex justify-end mb-8">
                        <Link
                            href={route("admin.questions.create")}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-95 transform hover:-translate-y-0.5"
                        >
                            <Plus className="w-5 h-5" />
                            Buat Soal Baru
                        </Link>
                    </div>

                    {/* State jika data Kosong */}
                    {questions.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-16 text-center">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileQuestion className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Belum ada soal
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Modul ini masih kosong. Silakan tambahkan
                                pertanyaan baru untuk memulai.
                            </p>
                        </div>
                    )}

                    {/* Looping Group Modul */}
                    <div className="space-y-8">
                        {Object.keys(groupedQuestions).map(
                            (moduleName, index) => (
                                <QuestionGroup
                                    key={index}
                                    moduleName={moduleName}
                                    questions={groupedQuestions[moduleName]}
                                    onDelete={openModal}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Modal hapus */}
            <Modal show={confirmationDelete} onClose={closeModal}>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                Hapus Soal?
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        Apakah Anda yakin ingin menghapus soal ini secara
                        permanen? Semua opsi jawaban serta bobot nilai yang
                        terkait akan ikut terhapus.
                    </p>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton onClick={deleteModal}>
                            Ya, Hapus Soal
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
