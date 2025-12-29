import React from "react";

export default function ResultItemCard({ item }) {
    if (!item) return null;

    const isDominant = item.rank === 1;

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-100 p-8 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                isDominant
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {isDominant
                                ? "Dominan (Rank 1)"
                                : `Peringkat #${item.rank}`}
                        </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                        Tipe {item?.name} ({item?.code})
                    </h4>
                </div>
                <div className="text-center bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="block text-xs text-gray-400 uppercase">
                        Skor
                    </span>
                    <span className="block text-xl font-bold text-indigo-600">
                        {item?.score || 0}
                    </span>
                </div>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed text-justify border-t pt-4">
                {item?.description || "Tidak ada deskripsi tersedia."}
            </div>
        </div>
    );
}
