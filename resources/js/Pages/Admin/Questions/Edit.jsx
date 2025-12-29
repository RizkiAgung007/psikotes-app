import QuestionForm from "@/Components/QuestionForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, FileEdit, Save } from "lucide-react";
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
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <FileEdit className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Edit Soal
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Perbarui detail pertanyaan dan opsi jawaban.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Edit Soal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
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

                        {/* Card Tombol Aksi */}
                        <div className="mt-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <Link
                                    href={route("admin.questions.index")}
                                    className="w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 font-bold py-3 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Batal & Kembali
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <Save className="w-5 h-5" />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
