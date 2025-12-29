import { Clock, Layers, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function ModuleList({ modules, onEdit, onDelete }) {
    return (
        <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200 flex items-center gap-3">
                <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100 text-indigo-600">
                    <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">
                    Daftar Modul
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <th className="p-4 text-center w-16">No</th>
                            <th className="p-4">Nama Modul</th>
                            <th className="p-4 w-1/5">Waktu</th>
                            <th className="p-4 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {modules.length > 0 ? (
                            modules.map((mod, index) => (
                                <tr
                                    key={mod.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="p-4 text-center text-gray-500 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800 mb-0.5">
                                            {mod.name}
                                        </div>
                                        <div className="text-xs text-gray-500 line-clamp-1 max-w-md">
                                            {mod.description || "-"}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100">
                                            <Clock className="w-3 h-3" />
                                            {mod.time_limit} Menit
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
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
                                    className="p-8 text-center text-gray-400 italic"
                                >
                                    Belum ada modul, silakan tambah modul
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
