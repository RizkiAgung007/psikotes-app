import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    HelpCircle,
    Layers,
    ListChecks,
    Pencil,
    Plus,
    Save,
    Trash2,
} from "lucide-react";
import React from "react";

export default function Edit({ auth, categories, modules, question }) {
    // Setup form data lama
    const { data, setData, put, processing, errors } = useForm({
        module_id: question.module_id,
        question_text: question.question_text,
        options: question.options.map((opt) => ({
            text: opt.option_text,
            category_id: opt.category_id,
        })),
    });

    // Fungsi tambah ospi
    const addOption = () => {
        setData("options", [...data.options, { text: "", category_id: "" }]);
    };

    // Fungsi hapus opsi
    const removeOption = (index) => {
        const newOptions = [...data.options];
        newOptions.splice(index, 1);
        setData("options", newOptions);
    };

    // Fungsi mengubah field
    const handleOptionChange = (index, field, value) => {
        const newOptions = [...data.options];
        newOptions[index][field] = value;
        setData("options", newOptions);
    };

    // Fungsi submit form
    const submit = (e) => {
        e.preventDefault();
        put(route("admin.questions.update", question.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <Pencil className="w-6 h-6 text-gray-700" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Edit Soal
                    </h2>
                </div>
            }
        >
            <Head title="Edit Soal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            <form onSubmit={submit}>
                                <div className="space-y-6 border-b border-gray-100 pb-8 mb-8">
                                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-indigo-500" />
                                        Detail Soal
                                    </h3>

                                    {/* Piliih Modul */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pilih Modul
                                        </label>
                                        <select
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                            value={data.module_id}
                                            onChange={(e) =>
                                                setData(
                                                    "module_id",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="">
                                                - Pilih Modul -
                                            </option>
                                            {modules.map((mod) => (
                                                <option
                                                    key={mod.id}
                                                    value={mod.id}
                                                >
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
                                            placeholder="Tuliskan pertanyaan lengkap disini..."
                                            onChange={(e) =>
                                                setData(
                                                    "question_text",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                        {errors.question_text && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.question_text}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* FIeld Opsi */}
                                <div className="mb-8">
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
                                            <Plus />
                                            Tambah Opsi
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
                                                    {String.fromCharCode(
                                                        65 + index
                                                    )}
                                                </div>

                                                {/* Input Teks */}
                                                <div className="flex-grow">
                                                    <input
                                                        type="text"
                                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        placeholder={`Jawaban opsi ${
                                                            index + 1
                                                        }`}
                                                        value={option.text}
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                index,
                                                                "text",
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    {errors[
                                                        `options.${index}.text`
                                                    ] && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            Wajib diisi/
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Dropdown Kategori */}
                                                <div className="w-1/3 min-w-[120px]">
                                                    <select
                                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        value={
                                                            option.category_id
                                                        }
                                                        onChange={(e) =>
                                                            handleOptionChange(
                                                                index,
                                                                "category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            - Kategori -
                                                        </option>
                                                        {categories.map(
                                                            (cat) => (
                                                                <option
                                                                    key={cat.id}
                                                                    value={
                                                                        cat.id
                                                                    }
                                                                >
                                                                    {cat.code} -{" "}
                                                                    {cat.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    {errors[
                                                        `options.${index}.category_id`
                                                    ] && (
                                                        <p className="to-red-500 text-xs mt-1">
                                                            Pilih Kategori
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Tombol Hapus */}
                                                {data.options.length > 2 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeOption(index)
                                                        }
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

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                    <Link
                                        href={route("admin.questions.index")}
                                        className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        Batal & Kembali
                                    </Link>

                                    {/* Tombol simpan */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        <Save />
                                        {processing
                                            ? "Menyimpan Perubahan..."
                                            : "Simpan Perubahan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
