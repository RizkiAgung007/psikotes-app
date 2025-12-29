import { Plus, Save, Tag, X } from "lucide-react";
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
            className={`sticky top-6 overflow-hidden shadow-sm sm:rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                editingCategory
                    ? "bg-indigo-50/40 border-indigo-200 ring-1 ring-indigo-100"
                    : "bg-white border-gray-100"
            }`}
        >
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div
                        className={`p-2.5 rounded-xl border ${
                            editingCategory
                                ? "bg-white text-indigo-600 border-indigo-100 shadow-sm"
                                : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                    >
                        <Tag className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            {editingCategory
                                ? "Perbarui data kategori terpilih."
                                : "Buat kategori penilaian baru."}
                        </p>
                    </div>
                </div>

                {editingCategory && (
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                        title="Batal Edit"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Input Pilih Modul */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">
                        Pilih Modul
                    </label>
                    <div className="relative">
                        <select
                            value={data.module_id}
                            onChange={(e) => setData("module_id", e.target.value)}
                            className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-50 focus:bg-white"
                        >
                            <option value="">-- Pilih Modul --</option>
                            {modules.map((mod) => (
                                <option key={mod.id} value={mod.id}>
                                    {mod.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.module_id && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.module_id}
                        </p>
                    )}
                </div>

                {/* Input Kode */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">
                        Kode (Singkatan)
                    </label>
                    <input
                        type="text"
                        value={data.code}
                        onChange={(e) =>
                            setData("code", e.target.value.toUpperCase())
                        }
                        className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white"
                        placeholder="Contoh: D"
                        maxLength="5"
                    />
                    {errors.code && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.code}
                        </p>
                    )}
                </div>

                {/* Input Nama */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white"
                        placeholder="Contoh: Dominance"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.name}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full flex justify-center items-center gap-2 font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white mt-4 ${
                        editingCategory
                            ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
                            : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                    }`}
                >
                    {editingCategory ? (
                        <>
                            <Save className="w-5 h-5" /> Simpan Perubahan
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" /> Tambah Kategori
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
