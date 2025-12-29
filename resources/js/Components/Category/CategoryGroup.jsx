import { Link } from "@inertiajs/react";
import { BookOpen, Eye, Layers, Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function CategoryGroup({
    module,
    categories,
    onEdit,
    onDelete,
}) {
    // Filter kategori
    const moduleCategories = categories.filter(
        (cat) => cat.module_id === module.id
    );

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
            {/* Header Modul */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-gray-800 text-lg">
                        Modul: {module.name}
                    </h3>
                </div>

                {/* Tombol ke Detail Modul */}
                <Link
                    href={route("admin.modules.show", module.id)}
                    className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors border border-indigo-200"
                >
                    <Eye className="w-4 h-4" /> Lihat Detail
                </Link>
            </div>

            {/* Tabel Kategori */}
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
                            {moduleCategories.length > 0 ? (
                                moduleCategories.map((cat) => (
                                    <tr
                                        key={cat.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="p-3">
                                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold">
                                                {cat.code}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-800 font-medium">
                                            {cat.name}
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

                                                {/* Tombol Edit */}
                                                <button
                                                    onClick={() => onEdit(cat)}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

                                                {/* Tombol Hapus */}
                                                <button
                                                    onClick={() =>
                                                        onDelete(cat.id)
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
                                        Belum ada kategori di modul ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
