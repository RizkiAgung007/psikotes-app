import { HelpCircle, Layers, ListChecks, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function QuestionForm({
    data,
    setData,
    errors,
    modules,
    categories,
    addOption,
    removeOption,
    handleOptionChange,
}) {
    return (
        <div className="space-y-8">
            {/* Modul & Pertanyaan */}
            <div className="space-y-6 border-b border-gray-100 pb-8">
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-500" />
                    Detail Soal
                </h3>

                {/* Pilih Modul */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Modul
                    </label>
                    <select
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                        value={data.module_id}
                        onChange={(e) => setData("module_id", e.target.value)}
                    >
                        <option value="">-- Pilih Modul --</option>
                        {modules.map((mod) => (
                            <option key={mod.id} value={mod.id}>
                                {mod.name}
                            </option>
                        ))}
                    </select>
                    {errors.module_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.module_id}
                        </p>
                    )}
                </div>

                {/* Pertanyaan */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        Pertanyaan
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </label>
                    <textarea
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                        rows="3"
                        value={data.question_text}
                        placeholder="Tuliskan pertanyaan lengkap di sini..."
                        onChange={(e) =>
                            setData("question_text", e.target.value)
                        }
                    ></textarea>
                    {errors.question_text && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.question_text}
                        </p>
                    )}
                </div>
            </div>

            {/* Pilihan Jawaban */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-indigo-500" />
                        Pilihan Jawaban
                    </h3>
                    <button
                        type="button"
                        onClick={addOption}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" /> Tambah Opsi
                    </button>
                </div>

                <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-200/60">
                    {data.options.map((option, index) => (
                        <div
                            key={index}
                            className="flex gap-3 items-start group"
                        >
                            {/* Label A/B/C/D */}
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-bold text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
                                {String.fromCharCode(65 + index)}
                            </div>

                            {/* Input Teks Jawaban */}
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder={`Jawaban opsi ${index + 1}`}
                                    value={option.text}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                />
                                {errors[`options.${index}.text`] && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Wajib diisi
                                    </p>
                                )}
                            </div>

                            {/* Dropdown Kategori */}
                            <div className="w-1/3 min-w-[120px]">
                                <select
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={option.category_id}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            "category_id",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.code} - {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors[`options.${index}.category_id`] && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Pilih kategori
                                    </p>
                                )}
                            </div>

                            {/* Tombol Hapus Opsi */}
                            {data.options.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    className="mt-2 text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Hapus opsi ini"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
