import QuestionForm from "@/Components/QuestionForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, CheckCircle, Plus, Save } from "lucide-react";
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
                <div className="flex items-center gap-2">
                    <Plus className="w-6 h-6 text-gray-700" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Buat Soal Baru
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Soal" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Flash Message */}
                    {flash.success && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 shadow-sm">
                            <CheckCircle className="w-5 h-5" />
                            <div>{flash.success}</div>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            <form>
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
                                        className="bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95"
                                    >
                                        <ArrowLeft className="w-4 h-4" />{" "}
                                        Kembali
                                    </Link>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) =>
                                                submit(
                                                    e,
                                                    "save_and_create_another"
                                                )
                                            }
                                            disabled={processing}
                                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                        >
                                            <Plus className="w-4 h-4" />
                                            {processing
                                                ? "Menyimpan..."
                                                : "Simpan & Tambah Lagi"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => submit(e, "finish")}
                                            disabled={processing}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                                        >
                                            <Save className="w-4 h-4" />
                                            Simpan Selesai
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
