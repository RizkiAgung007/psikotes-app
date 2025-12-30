import { Clock, Layers, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function ModuleList({ modules, onEdit, onDelete }) {
    return (
        <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 transition-all hover:shadow-md">
            {/* Header */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600 shrink-0">
                    <Layers className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        Daftar Modul
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                        Manajemen Modul
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <th className="px-6 py-4 text-center w-16">No</th>
                            <th className="px-6 py-4">Nama Modul</th>
                            <th className="px-6 py-4 w-1/5">Waktu</th>
                            <th className="px-6 py-4 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {modules.length > 0 ? (
                            modules.map((mod, index) => (
                                <tr
                                    key={mod.id}
                                    className="hover:bg-gray-50/80 transition-colors duration-150 group"
                                >
                                    <td className="px-6 py-5 text-center text-gray-400 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="font-bold text-gray-900 text-base mb-1">
                                            {mod.name}
                                        </div>
                                        <div className="text-sm text-gray-500 line-clamp-1 max-w-md font-medium">
                                            {mod.description || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 shadow-sm">
                                            <Clock className="w-3.5 h-3.5" />
                                            {mod.time_limit} Menit
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => onEdit(mod)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(mod.id)}
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
                                    colSpan="4"
                                    className="p-12 text-center text-gray-400 italic bg-white"
                                >
                                    Belum ada modul, silakan tambah modul baru.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}