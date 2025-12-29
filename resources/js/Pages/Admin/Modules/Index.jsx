import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import ModuleForm from "@/Components/Module/ModuleForm";
import ModuleList from "@/Components/Module/ModuleList";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { AlertTriangle, Layers } from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, modules }) {
    const [editingModule, setEditingModule] = useState(null);
    const [confirmationDelete, setConfirmationDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Setup form
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            description: "",
            time_limit: "",
        });

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingModule) {
            put(route("admin.modules.update", editingModule.id), {
                onSuccess: () => cancelEdit(),
            });
        } else {
            post(route("admin.modules.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    // Handle edit
    const handleEdit = (module) => {
        setEditingModule(module);
        setData({
            name: module.name,
            description: module.description || "",
            time_limit: module.time_limit || 10,
        });
        clearErrors();
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingModule(null);
        reset();
        clearErrors();
    };

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
        router.delete(route("admin.modules.destroy", deleteId), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingModule && editingModule.id === deleteId) {
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
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Layers className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="font-bold text-xl text-gray-800 leading-tight">
                        Kelola Modul
                    </h2>
                </div>
            }
        >
            <Head title="Kelola Modul" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* List Component */}
                        <ModuleList
                            modules={modules}
                            onEdit={handleEdit}
                            onDelete={openModal}
                        />

                        {/* Form Component */}
                        <div className="w-full md:w-1/3">
                            <ModuleForm
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                editingModule={editingModule}
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
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Konfirmasi Penghapusan
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        Apakah Anda yakin ingin menghapus module ini?
                        <br />
                        Data interpretasi dan soal yang terkait dengan module
                        ini mungkin akan terpengaruh.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton onClick={deleteModal}>
                            Ya, Hapus Module
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
