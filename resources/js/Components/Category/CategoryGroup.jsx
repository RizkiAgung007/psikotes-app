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
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 mb-8 transition-all hover:shadow-md">
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600 shrink-0">
                        <Layers className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {module.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                            Modul Kategori
                        </p>
                    </div>
                </div>

                {/* Tombol ke Detail Modul */}
                <Link
                    href={route("admin.modules.show", module.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-xl text-sm font-bold hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
                >
                    <Eye className="w-4 h-4" /> Lihat Detail Modul
                </Link>
            </div>

            {/* Tabel Kategori */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <th className="px-6 py-4 w-32 text-center">Kode</th>
                            <th className="px-6 py-4">Nama Kategori</th>
                            <th className="px-6 py-4 text-center w-48">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {moduleCategories.length > 0 ? (
                            moduleCategories.map((cat) => (
                                <tr
                                    key={cat.id}
                                    className="hover:bg-gray-50/80 transition-colors duration-150"
                                >
                                    <td className="px-6 py-5 text-center">
                                        <span className="inline-flex items-center justify-center min-w-[3rem] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-indigo-100 shadow-sm">
                                            {cat.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-gray-900 font-medium">
                                        {cat.name}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center items-center gap-2">
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
                                                onClick={() => onDelete(cat.id)}
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
                                    className="p-12 text-center text-gray-400 italic bg-white"
                                >
                                    Belum ada kategori di modul ini.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
