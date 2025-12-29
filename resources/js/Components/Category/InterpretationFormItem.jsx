import { FileText, Hash } from "lucide-react";
import React from "react";

export default function InterpretationFormItem({
    rank,
    categoryName,
    value,
    onChange,
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md hover:border-indigo-100">
            {/* Header Item */}
            <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Hash className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-gray-900 leading-tight">
                        Posisi Peringkat #{rank}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">
                        Penjelasan jika kategori{" "}
                        <span className="font-bold text-indigo-600">
                            "{categoryName}"
                        </span>{" "}
                        berada di urutan ke-{rank}.
                    </p>
                </div>
            </div>

            {/* Input Area */}
            <div className="relative group">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows="4"
                    className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 placeholder:text-gray-400 hover:bg-gray-50 focus:bg-white min-h-[140px] resize-y"
                    placeholder={`Masukkan deskripsi interpretasi untuk ranking ${rank} disini...`}
                    required
                />
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium px-1">
                <FileText className="w-3.5 h-3.5" />
                <span>
                    Deskripsi ini akan ditampilkan secara otomatis pada hasil
                    tes peserta.
                </span>
            </div>
        </div>
    );
}
