import CategoryForm from "@/Components/Category/CategoryForm";
import CategoryGroup from "@/Components/Category/CategoryGroup";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { AlertTriangle, ListFilter, Layers } from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, categories, modules }) {
    const [editingCategory, setEditingCategory] = useState(null);
    const [confirmationDelete, setConfirmationDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // State & Form Logic
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            code: "",
            module_id: "",
        });

    // Fungsi Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCategory) {
            put(route("admin.categories.update", editingCategory.id), {
                onSuccess: () => cancelEdit(),
            });
        } else {
            post(route("admin.categories.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    // Fungsi Edit
    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            code: category.code,
            module_id: category.module_id,
        });
        clearErrors();
    };

    // Fungsi Cancel
    const cancelEdit = () => {
        setEditingCategory(null);
        reset();
        clearErrors();
    };

    // Buka modal delete
    const openModal = (id) => {
        setDeleteId(id);
        setConfirmationDelete(true);
    };

    // Tutup modal delete
    const closeModal = () => {
        setConfirmationDelete(false);
        setDeleteId(null);
    };

    // Tombol hapus
    const deleteModal = () => {
        router.delete(route("admin.categories.destroy", deleteId), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingCategory && editingCategory.id === deleteId) {
                    cancelEdit();
                }
                closeModal();
            },
            onFinish: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <ListFilter className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Kelola Kategori
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Atur kategori penilaian untuk setiap modul.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Kelola Kategori" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Daftar Kategori (Kiri) */}
                        <div className="flex-1 space-y-8">
                            {modules.length > 0 ? (
                                modules.map((module) => (
                                    <CategoryGroup
                                        key={module.id}
                                        module={module}
                                        categories={categories}
                                        onEdit={handleEdit}
                                        onDelete={openModal}
                                    />
                                ))
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-16 text-center">
                                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Layers className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Belum ada modul
                                    </h3>
                                    <p className="text-gray-500 max-w-xs mx-auto">
                                        Silakan buat Modul terlebih dahulu
                                        sebelum menambahkan kategori.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Form Input (Kanan - Sticky) */}
                        <div className="w-full lg:w-1/3">
                            <CategoryForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                modules={modules}
                                editingCategory={editingCategory}
                                onSubmit={handleSubmit}
                                onCancel={cancelEdit}
                            />
                        </div>
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
                                Konfirmasi Penghapusan
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Tindakan ini berisiko.
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        Apakah Anda yakin ingin menghapus kategori ini?
                        <br />
                        Data interpretasi dan soal yang terkait dengan kategori
                        ini mungkin akan terpengaruh atau hilang.
                    </p>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton onClick={deleteModal}>
                            Ya, Hapus Kategori
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
