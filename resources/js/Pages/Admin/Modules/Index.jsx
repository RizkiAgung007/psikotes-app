import ModuleForm from "@/Components/Module/ModuleForm";
import ModuleList from "@/Components/Module/ModuleList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index({ auth, modules }) {
    const [editingModule, setEditingModule] = useState(null);

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

    // Handle delete
    const handleDelete = (id) => {
        if (
            confirm(
                "Yakin hapus modul ini? Semua soal & Kategori didalamnya akan ikut terhapus!"
            )
        ) {
            router.delete(route("admin.modules.destroy", id));
            if (editingModule && editingModule.id === id) {
                cancelEdit();
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kelola Modul
                </h2>
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
                            onDelete={handleDelete}
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
        </AuthenticatedLayout>
    );
}
