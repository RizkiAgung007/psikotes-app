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
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-8">
            {/* Modul & Pertanyaan */}
            <div className="space-y-6 border-b border-gray-100 pb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">
                            Detail Soal
                        </h3>
                        <p className="text-sm text-gray-500">
                            Tentukan modul dan isi pertanyaan.
                        </p>
                    </div>
                </div>

                {/* Pilih Modul */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Pilih Modul
                    </label>
                    <div className="relative">
                        <select
                            className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all py-3 px-4 text-gray-700 cursor-pointer hover:bg-gray-50 focus:bg-white"
                            value={data.module_id}
                            onChange={(e) =>
                                setData("module_id", e.target.value)
                            }
                        >
                            <option value="">-- Pilih Modul --</option>
                            {modules.map((mod) => (
                                <option key={mod.id} value={mod.id}>
                                    {mod.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.module_id && (
                        <p className="text-red-500 text-sm mt-1.5 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.module_id}
                        </p>
                    )}
                </div>

                {/* Pertanyaan */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                        Pertanyaan
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                    </label>
                    <textarea
                        className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all min-h-[140px] py-3 px-4 text-gray-700 placeholder:text-gray-400 resize-y hover:bg-gray-50 focus:bg-white"
                        rows="4"
                        value={data.question_text}
                        placeholder="Tuliskan pertanyaan lengkap di sini..."
                        onChange={(e) =>
                            setData("question_text", e.target.value)
                        }
                    ></textarea>
                    {errors.question_text && (
                        <p className="text-red-500 text-sm mt-1.5 font-medium flex items-center gap-1">
                            <span className="block w-1 h-1 bg-red-500 rounded-full" />
                            {errors.question_text}
                        </p>
                    )}
                </div>
            </div>

            {/* Pilihan Jawaban */}
            <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600 border border-indigo-100">
                            <ListChecks className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Pilihan Jawaban
                            </h3>
                            <p className="text-sm text-gray-500">
                                Atur opsi dan kategori penilaian.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={addOption}
                        className="inline-flex justify-center items-center gap-2 bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 text-sm font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Tambah Opsi
                    </button>
                </div>

                <div className="space-y-4">
                    {data.options.map((option, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50/50 p-4 sm:p-5 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all duration-200"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-stretch">
                                {/* Label A/B/C/D */}
                                <div className="hidden sm:flex w-12 h-12 flex-shrink-0 items-center justify-center font-bold text-gray-500 bg-white border border-gray-200 rounded-xl shadow-sm text-lg">
                                    {String.fromCharCode(65 + index)}
                                </div>

                                <div className="flex-grow w-full space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                                    {/* Mobile Label + Input Wrapper */}
                                    <div className="flex-grow space-y-2 w-full">
                                        <div className="flex sm:hidden items-center gap-2 mb-1">
                                            <span className="w-6 h-6 flex items-center justify-center font-bold text-xs text-white bg-indigo-600 rounded-md">
                                                {String.fromCharCode(
                                                    65 + index
                                                )}
                                            </span>
                                            <span className="text-xs font-bold text-gray-500 uppercase">
                                                Teks Jawaban
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 transition-colors"
                                            placeholder={`Tulis jawaban opsi ${String.fromCharCode(
                                                65 + index
                                            )}...`}
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
                                            <p className="text-red-500 text-xs mt-1 font-medium pl-1">
                                                * Teks jawaban wajib diisi
                                            </p>
                                        )}
                                    </div>

                                    {/* Dropdown Kategori */}
                                    <div className="w-full sm:w-1/3 sm:min-w-[180px] space-y-2">
                                        <div className="sm:hidden text-xs font-bold text-gray-500 uppercase">
                                            Kategori
                                        </div>
                                        <select
                                            className="w-full border-gray-300 bg-white rounded-xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 transition-colors cursor-pointer"
                                            value={option.category_id}
                                            onChange={(e) =>
                                                handleOptionChange(
                                                    index,
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Pilih Kategori --
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.code} - {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors[
                                            `options.${index}.category_id`
                                        ] && (
                                            <p className="text-red-500 text-xs mt-1 font-medium pl-1">
                                                * Pilih kategori
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tombol Hapus Opsi */}
                                {data.options.length > 2 && (
                                    <div className="w-full sm:w-auto flex justify-end sm:block">
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            className="sm:h-12 sm:w-12 w-full flex items-center justify-center gap-2 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 p-2 rounded-xl transition-all"
                                            title="Hapus opsi ini"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span className="sm:hidden font-medium">
                                                Hapus Opsi
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
