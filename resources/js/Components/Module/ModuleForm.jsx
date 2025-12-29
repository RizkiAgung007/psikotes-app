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
            className={`overflow-hidden shadow-sm sm:rounded-lg p-6 sticky top-4 transition-colors ${
                editingModule
                    ? "bg-indigo-50 border border-indigo-200"
                    : "bg-white"
            }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {editingModule ? "Edit Modul" : "Tambah Modul"}
                </h3>
                {editingModule && (
                    <button
                        onClick={onCancel}
                        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
                    >
                        <X className="w-4 h-4" /> Batal
                    </button>
                )}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Input Nama Modul */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Modul
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Contoh: Tes Gaya Belajar"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Input Deskripsi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deskripsi
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Penjelasan Singkat..."
                        rows="3"
                    ></textarea>
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </div>
                    )}
                </div>

                {/* Input Time Limit */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                        <span>Durasi (Menit)</span>
                        <span className="text-xs text-gray-400 font-normal">
                            Min: 1 Menit
                        </span>
                    </label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        <input
                            type="number"
                            min="1"
                            value={data.time_limit}
                            onChange={(e) =>
                                setData("time_limit", e.target.value)
                            }
                            className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="10"
                        />
                    </div>
                    {errors.time_limit && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.time_limit}
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
