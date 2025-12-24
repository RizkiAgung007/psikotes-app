import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    BookOpen,
    Eye,
    Layers,
    Pencil,
    Plus,
    Save,
    Tag,
    Trash2,
    X,
} from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, categories, modules }) {
    const [editingCategory, setEditingCategory] = useState(null);

    // form untuk tambah kategori
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            code: "",
            module_id: "",
        });

    // Fungis untuk submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCategory) {
            put(route("admin.categories.update", editingCategory.id), {
                onSuccess: () => cancelEdit(),
            });
        } else {
            post(
                route("admin.categories.store", {
                    onSuccess: () => reset(),
                })
            );
        }
    };

    // Fungsi untuk edit
    const handleEdit = (category) => {
        setEditingCategory(category);
        setData({
            name: category.name,
            code: category.code,
            module_id: category.module_id,
        });
        clearErrors();
    };

    // Fungsi cancel edit
    const cancelEdit = () => {
        setEditingCategory(null);
        reset();
        clearErrors();
    };

    // Fungsi untuk hapus
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
                                    <div
                                        key={module.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100"
                                    >
                                        {/* Header Modul */}
                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Layers className="w-5 h-5 text-indigo-600" />
                                                <h3 className="font-bold text-gray-800 text-lg">
                                                    Modul: {module.name}
                                                </h3>
                                            </div>

                                            <Link
                                                href={route(
                                                    "admin.modules.detail",
                                                    module.id
                                                )}
                                                className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Lihat Detail
                                            </Link>
                                        </div>

                                        <div className="p-6">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b bg-gray-50">
                                                            <th className="p-3 text-sm font-semibold text-gray-600">
                                                                Kode
                                                            </th>
                                                            <th className="p-3 text-sm font-semibold text-gray-600">
                                                                Nama Kategori
                                                            </th>
                                                            <th className="p-3 text-sm font-semibold text-gray-600 text-right">
                                                                Aksi
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {/* Filter tampilkan kategorimodul ini */}
                                                        {categories.filter(
                                                            (cat) =>
                                                                cat.module_id ===
                                                                module.id
                                                        ).length > 0 ? (
                                                            categories
                                                                .filter(
                                                                    (cat) =>
                                                                        cat.module_id ===
                                                                        module.id
                                                                )
                                                                .map((cat) => (
                                                                    <tr
                                                                        key={
                                                                            cat.id
                                                                        }
                                                                        className="hover:bg-gray-50"
                                                                    >
                                                                        <td className="p-3">
                                                                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">
                                                                                {
                                                                                    cat.code
                                                                                }
                                                                            </span>
                                                                        </td>
                                                                        <td className="p-3 text-gray-800 font-medium">
                                                                            {
                                                                                cat.name
                                                                            }
                                                                        </td>
                                                                        <td className="p-3 text-right">
                                                                            <div className="flex justify-end gap-2">
                                                                                {/* Tombol Atur Penjelasan */}
                                                                                <Link
                                                                                    href={route(
                                                                                        "admin.categories.interpretations",
                                                                                        cat.id
                                                                                    )}
                                                                                    className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all"
                                                                                    title="Atur Penjelasan Hasil"
                                                                                >
                                                                                    <BookOpen className="w-4 h-4" />
                                                                                </Link>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleEdit(
                                                                                            cat
                                                                                        )
                                                                                    }
                                                                                    className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                                                    title="Edit"
                                                                                >
                                                                                    <Pencil className="w-4 h-4" />
                                                                                </button>

                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleDelete(
                                                                                            cat.id
                                                                                        )
                                                                                    }
                                                                                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                                                    title="Hapus"
                                                                                >
                                                                                    <Trash2 className="w-4 h-4" />
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                        ) : (
                                                            <tr>
                                                                <td
                                                                    colSpan="3"
                                                                    className="p-4 text-center text-gray-400 italic"
                                                                >
                                                                    Belum ada
                                                                    kategori di
                                                                    modul ini.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                    Belum ada modul yang dibuat. Silakan buat
                                    Modul terlebih dahulu.
                                </div>
                            )}
                        </div>

                        {/* Form Tambah dan edit */}
                        <div className="w-full md:w-1/3">
                            <div
                                className={`overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-4 transition-colors ${
                                    editingCategory
                                        ? "bg-indigo-50 border border-indigo-200"
                                        : "bg-white"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">
                                        {editingCategory
                                            ? "Edit Kategori"
                                            : "Tambah Kategori"}
                                    </h3>
                                    {editingCategory && (
                                        <button
                                            onClick={cancelEdit}
                                            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
                                        >
                                            <X className="w-4 h-4" /> Batal
                                        </button>
                                    )}
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    {/* Input Pilih Modul  */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Pilih Modul
                                        </label>
                                        <select
                                            value={data.module_id}
                                            onChange={(e) =>
                                                setData(
                                                    "module_id",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">
                                                -- Pilih Modul --
                                            </option>
                                            {modules.map((mod) => (
                                                <option
                                                    key={mod.id}
                                                    value={mod.id}
                                                >
                                                    {mod.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.module_id && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.module_id}
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Kode */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kode (Singkatan)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData(
                                                    "code",
                                                    e.target.value.toUpperCase()
                                                )
                                            }
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Contoh: D"
                                            maxLength="5"
                                        />
                                        {errors.code && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.code}
                                            </div>
                                        )}
                                    </div>

                                    {/* Input Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Kategori
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Contoh: Dominance"
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-sm mt-1">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full flex justify-center items-center gap-2 font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 text-white ${
                                            editingCategory
                                                ? "bg-emerald-500 hover:bg-emerald-600"
                                                : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                                    >
                                        {editingCategory ? (
                                            <>
                                                <Save className="w-5 h-5" />{" "}
                                                Simpan Perubahan
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-5 h-5" />{" "}
                                                Tambah
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
