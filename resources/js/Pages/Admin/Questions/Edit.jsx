import QuestionForm from "@/Components/QuestionForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Pencil, Save } from "lucide-react";
import React from "react";

export default function Edit({ auth, categories, modules, question }) {
    // Setup Form Data
    const { data, setData, put, processing, errors } = useForm({
        module_id: question.module_id,
        question_text: question.question_text,
        options: question.options.map((opt) => ({
            text: opt.option_text,
            category_id: opt.category_id,
        })),
    });

    // Helper untuk menambah opsi kategori
    const addOption = () => {
        setData("options", [...data.options, { text: "", category_id: "" }]);
    };

    // Fungsi untuk mengapus opsi
    const removeOption = (index) => {
        const newOptions = [...data.options];
        newOptions.splice(index, 1);
        setData("options", newOptions);
    };

    // Fungsi untuk merubah isi field
    const handleOptionChange = (index, field, value) => {
        const newOptions = [...data.options];
        newOptions[index][field] = value;
        setData("options", newOptions);
    };

    // Fungsi Submit
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
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            <form onSubmit={submit}>
                                {/* Panggil Komponen Form */}
                                <QuestionForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    modules={modules}
                                    categories={categories}
                                    addOption={addOption}
                                    removeOption={removeOption}
                                    handleOptionChange={handleOptionChange}
                                />

                                {/* Tombol Aksi (Footer Form) */}
                                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
                                    <Link
                                        href={route("admin.questions.index")}
                                        className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Batal
                                        & Kembali
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        <Save className="w-4 h-4" />
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
