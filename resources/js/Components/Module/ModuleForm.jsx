import { Box, Clock, Plus, Save, X } from "lucide-react";
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
            className={`sticky top-6 overflow-hidden shadow-sm sm:rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                editingModule
                    ? "bg-indigo-50/40 border-indigo-200 ring-1 ring-indigo-100"
                    : "bg-white border-gray-100"
            }`}
        >
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div
                        className={`p-2.5 rounded-xl border ${
                            editingModule
                                ? "bg-white text-indigo-600 border-indigo-100 shadow-sm"
                                : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}
                    >
                        <Box className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {editingModule ? "Edit Modul" : "Tambah Modul"}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">
                            {editingModule
                                ? "Perbarui informasi modul ini."
                                : "Buat modul penilaian baru."}
                        </p>
                    </div>
                </div>

                {editingModule && (
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
                {/* Input Nama Modul */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">
                        Nama Modul
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white"
                        placeholder="Contoh: Tes Gaya Belajar"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Input Deskripsi */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 block">
                        Deskripsi
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white min-h-[100px] resize-y"
                        placeholder="Penjelasan singkat tentang modul ini..."
                        rows="3"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Input Time Limit */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-gray-700 block">
                            Durasi (Menit)
                        </label>
                        <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                            Min: 1 Menit
                        </span>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Clock className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="number"
                            min="1"
                            value={data.time_limit}
                            onChange={(e) =>
                                setData("time_limit", e.target.value)
                            }
                            className="w-full pl-11 border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white"
                            placeholder="10"
                        />
                    </div>
                    {errors.time_limit && (
                        <p className="text-red-500 text-sm mt-1 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.time_limit}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={`w-full flex justify-center items-center gap-2 font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white mt-4 ${
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
                            <Plus className="w-5 h-5" /> Tambah Modul
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}