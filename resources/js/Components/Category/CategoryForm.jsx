import { Plus, Save, X } from "lucide-react";
import React from "react";

export default function CategoryForm({
    data,
    setData,
    errors,
    processing,
    modules,
    editingCategory,
    onSubmit,
    onCancel,
}) {
    return (
        <div
            className={`overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-4 transition-colors ${
                editingCategory
                    ? "bg-indigo-50 border border-indigo-200"
                    : "bg-white"
            }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
                </h3>
                {editingCategory && (
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
                    >
                        <X className="w-4 h-4" /> Batal
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Input Pilih Modul */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pilih Modul
                    </label>
                    <select
                        value={data.module_id}
                        onChange={(e) => setData("module_id", e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">-- Pilih Modul --</option>
                        {modules.map((mod) => (
                            <option key={mod.id} value={mod.id}>
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
                            setData("code", e.target.value.toUpperCase())
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
                        onChange={(e) => setData("name", e.target.value)}
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
                            <Save className="w-5 h-5" /> Simpan Perubahan
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" /> Tambah
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
