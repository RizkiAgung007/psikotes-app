import { Activity, Hash, Trophy } from "lucide-react";
import React from "react";

export default function ResultItemCard({ item }) {
    if (!item) return null;

    const isDominant = item.rank === 1;

    return (
        <div
            className={`bg-white overflow-hidden shadow-sm sm:rounded-xl border transition-all hover:shadow-md p-6 ${
                isDominant
                    ? "border-indigo-200 ring-1 ring-indigo-50"
                    : "border-gray-100"
            }`}
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                isDominant
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
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
                    <h4 className="text-xl font-bold text-gray-900">
                        Tipe {item?.name}{" "}
                        <span className="text-gray-400 font-normal">
                            ({item?.code})
                        </span>
                    </h4>
                </div>
                <div className="flex flex-col items-center justify-center bg-indigo-50 px-5 py-2.5 rounded-xl border border-indigo-100 min-w-[90px]">
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        <Activity className="w-3 h-3" /> Skor
                    </span>
                    <span className="text-2xl font-bold text-indigo-700 leading-none mt-1">
                        {item?.score || 0}
                    </span>
                </div>
            </div>

            <div className="prose max-w-none text-gray-600 leading-relaxed text-justify border-t border-gray-100 pt-5 mt-2">
                {item?.description || "Tidak ada deskripsi tersedia."}
            </div>
        </div>
    );
}
