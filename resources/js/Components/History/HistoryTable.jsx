import { Calendar, Clock, Eye, FileText } from "lucide-react";
import { Link } from "@inertiajs/react";
import React from "react";

export default function HistoryTable({ histories }) {
    // --- Helper Functions ---
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const getDominantResult = (resultData) => {
        let data = resultData;

        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                return [];
            }
        }

        if (!data || !Array.isArray(data) || data.length === 0) {
            return (
                <span className="text-gray-400 italic text-xs">
                    Menunggu Hasil
                </span>
            );
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
        return "-";
    };

    if (histories.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-indigo-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                    Belum Ada Riwayat
                </h3>
                <p className="text-gray-500 mb-6">
                    Anda belum mengerjakan tes apapun.
                </p>
                <Link
                    href={route("dashboard")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700"
                >
                    Mulai Tes Sekarang
                </Link>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                        <th className="p-4 font-bold">Waktu Selesai</th>
                        <th className="p-4 font-bold">Modul Tes</th>
                        <th className="p-4 font-bold">Hasil Anda</th>
                        <th className="p-4 font-bold text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {histories.map((item) => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-4 whitespace-nowrap text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {formatDate(item.finished_at)}
                                </div>
                            </td>
                            <td className="p-4 font-bold text-gray-800">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-indigo-500" />
                                    {item.module.name}
                                </div>
                            </td>
                            <td className="p-4">
                                {getDominantResult(item.result)}
                            </td>
                            <td className="text-right p-4">
                                <Link
                                    href={route("exam.result", item.id)}
                                    className="inline-flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm"
                                    title="Lihat Detail"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
