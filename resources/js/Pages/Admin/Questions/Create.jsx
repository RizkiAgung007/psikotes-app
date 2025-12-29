import QuestionForm from "@/Components/QuestionForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, FilePlus, Plus, Save } from "lucide-react";
import React, { useEffect } from "react";

export default function Create({ auth, categories, modules }) {
    const { flash = {} } = usePage().props;

    // Setup State Form
    const { data, setData, post, processing, errors, reset } = useForm({
        module_id: "",
        question_text: "",
        action: "finish",
        options: [
            { text: "", category_id: "" },
            { text: "", category_id: "" },
            { text: "", category_id: "" },
            { text: "", category_id: "" },
        ],
    });

    // Efek untuk mengingat modul terakhir
    useEffect(() => {
        if (flash.last_module_id) {
            setData("module_id", flash.last_module_id);
        }
    }, [flash]);

    // Helper untuk menambag opsi kategori
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
    const submit = (e, actionType) => {
        e.preventDefault();

        data.action = actionType;

        post(route("admin.questions.store"), {
            onSuccess: () => {
                if (actionType === "save_and_create_another") {
                    reset("question_text", "options");
                    setData((prevData) => ({
                        ...prevData,
                        question_text: "",
                        options: [
                            { text: "", category_id: "" },
                            { text: "", category_id: "" },
                            { text: "", category_id: "" },
                            { text: "", category_id: "" },
                        ],
                    }));
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <FilePlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl text-gray-900 leading-tight">
                            Buat Soal Baru
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                            Tambahkan pertanyaan baru ke modul kompetensi.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Soal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Flash Message */}
                    {flash.success && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-4 rounded-xl flex items-center gap-3 shadow-sm animate-in slide-in-from-top-2">
                            <div className="bg-emerald-100 p-1.5 rounded-full">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div className="font-medium">{flash.success}</div>
                        </div>
                    )}

                    <form>
                        {/* Area Form Input (QuestionForm sudah berbentuk Card) */}
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
                                    className="w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-500 hover:text-white font-bold py-3 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    Kembali
                                </Link>

                                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            submit(e, "save_and_create_another")
                                        }
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95"
                                    >
                                        <Plus className="w-5 h-5" />
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan & Tambah Lagi"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={(e) => submit(e, "finish")}
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-95"
                                    >
                                        <Save className="w-5 h-5" />
                                        Simpan Selesai
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
