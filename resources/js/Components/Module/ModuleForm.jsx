import { Clock, Plus, Save, X } from "lucide-react";
import React from "react";

export default function ModuleForm({
    data,
    setData,
    errors,
    processing,
    editingModule,
    onSubmit,
    onCancel,
}) {
    return (
        <div
            className={`overflow-hidden shadow-sm sm:rounded-xl border p-6 sticky top-6 transition-colors ${
                editingModule
                    ? "bg-indigo-50/50 border-indigo-200"
                    : "bg-white border-gray-200"
            }`}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                    {editingModule ? "Edit Modul" : "Tambah Modul"}
                </h3>
                {editingModule && (
                    <button
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 transition-colors bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm hover:bg-gray-50"
                    >
                        <X className="w-4 h-4" /> Batal
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                {/* Input Nama Modul */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Nama Modul
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 transition-colors"
                        placeholder="Contoh: Tes Gaya Belajar"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1 font-medium">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Input Deskripsi */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Deskripsi
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 transition-colors min-h-[100px]"
                        placeholder="Penjelasan Singkat..."
                        rows="3"
                    ></textarea>
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1 font-medium">
                            {errors.description}
                        </div>
                    )}
                </div>

                {/* Input Time Limit */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between items-center">
                        <span>Durasi (Menit)</span>
                        <span className="text-xs text-gray-400 font-normal bg-gray-100 px-2 py-0.5 rounded">
                            Min: 1 Menit
                        </span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            min="1"
                            value={data.time_limit}
                            onChange={(e) =>
                                setData("time_limit", e.target.value)
                            }
                            className="w-full pl-10 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2.5 transition-colors"
                            placeholder="10"
                        />
                    </div>
                    {errors.time_limit && (
                        <div className="text-red-500 text-sm mt-1 font-medium">
                            {errors.time_limit}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full flex justify-center items-center gap-2 font-bold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white ${
                        editingModule
                            ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200"
                            : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                    }`}
                >
                    {editingModule ? (
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
