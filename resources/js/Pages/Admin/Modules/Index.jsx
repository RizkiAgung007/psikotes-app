import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { Layers, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import React, { useState } from "react";

export default function Index({ auth, modules }) {
    const [editingModule, setEditingModule] = useState(null);

    // Setup form
    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
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
                        {/* Table Modul */}
                        <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5" /> Daftar Modul
                            </h3>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b bg-gray-50">
                                            <th className="p-3 text-sm text-center font-semibold text-gray-600">
                                                No
                                            </th>
                                            <th className="p-3 text-sm font-semibold text-gray-600">
                                                Nama Modul
                                            </th>
                                            <th className="p-3 pr-10 text-sm font-semibold text-gray-600 text-right">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {modules.length > 0 ? (
                                            modules.map((mod, index) => (
                                                <tr
                                                    key={mod.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="p-3 w-1/6 text-center text-gray-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="p-3 font-medium text-gray-800">
                                                        {mod.name}
                                                    </td>
                                                    <td className="p-3 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        mod
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
                                                                        mod.id
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
                                                    className="p-4 text-center text-gray-400"
                                                >
                                                    Belum ada modul, silakan
                                                    tambah modul
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Form Input Modul */}
                        <div className="w-full md:w-1/3">
                            <div
                                className={`overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-4 transition-colors ${
                                    editingModule
                                        ? "bg-indigo-50 border border-indigo-200"
                                        : "bg-white"
                                }`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold">
                                        {editingModule
                                            ? "Edit Modul"
                                            : "Tambah Modul"}
                                    </h3>
                                    {editingModule && (
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Modul
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Contoh: Tes Gaya Belajar"
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
                                            editingModule
                                                ? "bg-emerald-500 hover:bg-emerald-600"
                                                : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                                    >
                                        {editingModule ? (
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
