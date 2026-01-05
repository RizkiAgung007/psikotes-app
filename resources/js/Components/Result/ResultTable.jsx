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
            month: "short",
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
                    <span className="text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded border border-red-100">
                        Error Format
                    </span>
                );
            }
        }

        if (!data || !Array.isArray(data) || data.length === 0) {
            return <span className="text-gray-400 text-xs italic">Data Kosong</span>;
        }

        const dominan = data.find(
            (item) => item.rank === 1 || item.rank === "1"
        );

        if (dominan) {
            return (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100 shadow-sm">
                    {dominan.name} ({dominan.score})
                </span>
            );
        }

        return <span className="text-gray-400">-</span>;
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 transition-all hover:shadow-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                            <th className="px-6 py-4 w-48">Tanggal Selesai</th>
                            <th className="px-6 py-4">Peserta</th>
                            <th className="px-6 py-4">Modul Tes</th>
                            <th className="px-6 py-4">Hasil Dominan</th>
                            <th className="px-6 py-4 text-center w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {results.data.length > 0 ? (
                            results.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-gray-50/80 transition-colors duration-150"
                                >
                                    {/* Tanggal */}
                                    <td className="px-6 py-5 whitespace-nowrap text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-700">
                                                {formatDate(item.finished_at)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Peserta */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200 shrink-0">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 text-sm">
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
                                    <td className="px-6 py-5">
                                        <span className="font-bold text-gray-800">
                                            {item.module
                                                ? item.module.name
                                                : "Deleted Module"}
                                        </span>
                                    </td>

                                    {/* Hasil Dominan */}
                                    <td className="px-6 py-5">
                                        {getDominantResult(item.result)}
                                    </td>

                                    {/* Aksi */}
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <Link
                                                href={route(
                                                    "admin.results.show",
                                                    item.id
                                                )}
                                                className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100"
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
                                                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                                                title="Reset Hasil (Hapus Data)"
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
                            className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition-all ${
                                link.active
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
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
    );
}
