import CategoryForm from "@/Components/Category/CategoryForm";
import CategoryGroup from "@/Components/Category/CategoryGroup";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelola Kategori
                </h2>
            }
        >
            <Head title="Kelola Kategori" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Daftar Kategori */}
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
                                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                    Belum ada modul. Silakan buat Modul terlebih
                                    dahulu.
                                </div>
                            )}
                        </div>

                        {/* Form Input */}
                        <div className="w-full md:w-1/3">
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
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertTriangle className="w-8 h-8" />
                        <h2 className="text-lg font-medium text-gray-900">
                            Konfirmasi Penghapusan
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus kategori ini?
                        <br />
                        Data interpretasi dan soal yang terkait dengan kategori
                        ini mungkin akan terpengaruh.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
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
