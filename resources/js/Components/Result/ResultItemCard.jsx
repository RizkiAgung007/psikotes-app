import { Activity, Hash, Trophy } from "lucide-react";
import React from "react";

export default function ResultItemCard({ item }) {
    if (!item) return null;

    const isDominant = item.rank === 1;

    return (
        <div
            className={`bg-white overflow-hidden shadow-sm sm:rounded-2xl border transition-all duration-300 p-6 ${
                isDominant
                    ? "border-indigo-200 ring-4 ring-indigo-50 shadow-indigo-100"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
            }`}
        >
            <div className="flex justify-between items-start mb-6 gap-4">
                <div>
                    {/* Badge Peringkat */}
                    <div className="flex items-center gap-2 mb-3">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                isDominant
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                    : "bg-gray-50 text-gray-600 border-gray-200"
                            }`}
                        >
                            {isDominant ? (
                                <Trophy className="w-3 h-3" />
                            ) : (
                                <Hash className="w-3 h-3" />
                            )}
                            {isDominant
                                ? "Dominan (Rank 1)"
                                : `Peringkat #${item.rank}`}
                        </span>
                    </div>

                    {/* Nama Kategori */}
                    <h4 className="text-xl font-bold text-gray-900 leading-tight">
                        Tipe {item?.name}{" "}
                        <span className="text-gray-400 font-medium text-lg ml-1">
                            ({item?.code})
                        </span>
                    </h4>
                </div>

                {/* Box Skor */}
                <div className="flex flex-col items-center justify-center bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100 min-w-[90px]">
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        <Activity className="w-3 h-3" /> Skor
                    </span>
                    <span className="text-3xl font-bold text-indigo-600 leading-none mt-1">
                        {item?.score || 0}
                    </span>
                </div>
            </div>

            {/* Deskripsi */}
            <div className="prose max-w-none text-gray-600 leading-relaxed text-justify border-t border-gray-100 pt-5">
                {item?.description || (
                    <span className="italic text-gray-400">
                        Tidak ada deskripsi tersedia untuk hasil ini.
                    </span>
                )}
            </div>
        </div>
    );
}