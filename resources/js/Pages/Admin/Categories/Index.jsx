import CategoryForm from "@/Components/Category/CategoryForm";
import CategoryGroup from "@/Components/Category/CategoryGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Index({ auth, categories, modules }) {
    const [editingCategory, setEditingCategory] = useState(null);

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

    // Fungsi Delte
    const handleDelete = (id) => {
        if (confirm("Apakah anda yakin ingin menghapus kategori ini?")) {
            router.delete(route("admin.categories.destroy", id));
            if (editingCategory && editingCategory.id === id) {
                cancelEdit();
            }
        }
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
                                        onDelete={handleDelete}
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
        </AuthenticatedLayout>
    );
}
