import { Clock, Layers, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function ModuleList({ modules, onEdit, onDelete }) {
    return (
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
                            <th className="p-3 text-sm font-semibold text-gray-600">
                                Waktu
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
                                    className="hover:bg-gray-50 border-b last:border-0"
                                >
                                    <td className="p-3 w-1/12 text-center text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="p-3">
                                        <div className="font-medium text-gray-800">
                                            {mod.name}
                                        </div>
                                        <div className="text-xs text-gray-500 line-clamp-1">
                                            {mod.description}
                                        </div>
                                    </td>
                                    <td className="p-3 w-1/6">
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                                            <Clock className="w-3 h-3" />{" "}
                                            {mod.time_limit} Menit
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
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
                                    className="p-4 text-center text-gray-400"
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
