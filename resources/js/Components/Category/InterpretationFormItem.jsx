import React from "react";

export default function InterpretationFormItem({
    rank,
    categoryName,
    value,
    onChange,
}) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-3">
                <label className="block font-bold text-gray-800 text-lg">
                    Jika Kategori ini berada di{" "}
                    <span className="text-indigo-600 decoration-indigo-300">
                        {" "}
                        Posisi #{rank}
                    </span>
                </label>
            </div>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows="4"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                placeholder={`Masukkan penjelasan jika ${categoryName} berada di urutan ke-${rank}...`}
                required
            />
        </div>
    );
}
