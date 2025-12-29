import { Clock, Eye, Trash2, User } from "lucide-react";
import { Link } from "@inertiajs/react";
import React from "react";

export default function ResultTable({ results, onReset }) {
    // Helper format tanggal
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    // Mengambil dominan dari hasil tes json
    const getDominantResult = (resultData) => {
        let data = resultData;

        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (error) {
                console.error("Gagal parsing JSON:", error);
                return (
                    <span className="text-red-500 text-xs font-medium">
                        Error Format
                    </span>
                );
            }
        }

        if (!data || !Array.isArray(data) || data.length === 0) {
            return <span className="text-gray-400 italic">Data Kosong</span>;
        }

        const dominan = data.find(
            (item) => item.rank === 1 || item.rank === "1"
        );

        if (dominan) {
            return (
                <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold border border-indigo-100">
                    {dominan.name} ({dominan.score})
                </span>
            );
        }

        return <span className="text-gray-400">-</span>;
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
            <div className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                                <th className="p-4">Tanggal Selesai</th>
                                <th className="p-4">Peserta</th>
                                <th className="p-4">Modul Tes</th>
                                <th className="p-4">Hasil Dominan</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                            {results.data.length > 0 ? (
                                results.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        {/* Tanggal */}
                                        <td className="p-4 whitespace-nowrap text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {formatDate(item.finished_at)}
                                            </div>
                                        </td>

                                        {/* Peserta */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-800">
                                                        {item.user
                                                            ? item.user.name
                                                            : "Deleted User"}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {item.user
                                                            ? item.user.email
                                                            : ""}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Modul */}
                                        <td className="p-4 text-gray-700 font-medium">
                                            {item.module
                                                ? item.module.name
                                                : "Deleted Module"}
                                        </td>

                                        {/* Hasil Dominan */}
                                        <td className="p-4">
                                            {getDominantResult(item.result)}
                                        </td>

                                        {/* Aksi */}
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <Link
                                                    href={route(
                                                        "admin.results.show",
                                                        item.id
                                                    )}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        onReset(
                                                            item.id,
                                                            item.user?.name ||
                                                                "User"
                                                        )
                                                    }
                                                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    title="Reset Hasil"
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
                                        colSpan="5"
                                        className="p-12 text-center text-gray-400 italic bg-white"
                                    >
                                        Belum ada data hasil tes yang masuk.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {results.links && results.links.length > 3 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex justify-end gap-1">
                        {results.links.map((link, k) => (
                            <Link
                                key={k}
                                href={link.url}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                                    link.active
                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                } ${
                                    !link.url
                                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                                        : ""
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
