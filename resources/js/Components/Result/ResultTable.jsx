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
                    <span className="text-red-400 text-xs">Error Format</span>
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
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold border border-indigo-200">
                    {dominan.name} ({dominan.score})
                </span>
            );
        }

        return <span className="text-gray-400">-</span>;
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100">
            <div className="p-6">
                <div className="overscroll-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                                <th className="p-4 font-bold">
                                    Tanggal Selesai
                                </th>
                                <th className="p-4 font-bold">Peserta</th>
                                <th className="p-4 font-bold">Modul Tes</th>
                                <th className="p-4 font-bold">Hasil Dominan</th>
                                <th className="p-4 font-bold text-right">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {results.data.length > 0 ? (
                                results.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {/* Tanggal */}
                                        <td className="p-4 whitespace-nowrap text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {formatDate(item.finished_at)}
                                            </div>
                                        </td>

                                        {/* Peserta */}
                                        <td className="p-4 font-bold text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div className="flex flex-col">
                                                    <p>
                                                        {item.user
                                                            ? item.user.name
                                                            : "Deleted User"}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {item.user
                                                            ? item.user.email
                                                            : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Modul */}
                                        <td className="p-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                {item.module
                                                    ? item.module.name
                                                    : "Deleted Module"}
                                            </div>
                                        </td>

                                        {/* Hasil Dominan */}
                                        <td className="p-4">
                                            {getDominantResult(item.result)}
                                        </td>

                                        {/* Aksi */}
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end items-center gap-2">
                                                <Link
                                                    href={route(
                                                        "admin.results.show",
                                                        item.id
                                                    )}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="w-5 h-5" />
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
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-400 italic bg-gray-50"
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
                    <div className="mt-4 flex justify-end gap-1">
                        {results.links.map((link, k) => (
                            <Link
                                key={k}
                                href={link.url}
                                className={`px-3 py-1 text-sm rounded border ${
                                    link.active
                                        ? "bg-indigo-600 text-white border-indigo-600"
                                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
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
