import QuestionGroup from "@/Components/QuestionGroup";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FileQuestion, LayoutList, Plus } from "lucide-react";
import React from "react";

export default function Index({ auth, questions }) {

    // Grouping Data
    const groupedQuestions = questions.reduce((groups, question) => {
        const moduleName = question.module
            ? question.module.name
            : "Tanpa Module";
        if (!groups[moduleName]) {
            groups[moduleName] = [];
        }
        groups[moduleName].push(question);
        return groups;
    }, {});

    // Fungsi hapus
    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (confirm("Anda yakin ingin menghapus soal ini?")) {
            destroy(route("admin.questions.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <LayoutList className="w-6 h-6 text-gray-700" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Kelola Soal
                    </h2>
                </div>
            }
        >
            <Head title="Daftar Soal" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Tombol Tambah Soal */}
                    <div className="flex justify-end mb-6">
                        <Link
                            href={route("admin.questions.create")}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" />
                            Buat Soal Baru
                        </Link>
                    </div>

                    {/* State jika data Kosong */}
                    {questions.length === 0 && (
                        <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-12 text-center">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileQuestion className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Belum ada soal
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Silakan tambah modul dan soal baru.
                            </p>
                        </div>
                    )}

                    {/* Looping Group Modul */}
                    {Object.keys(groupedQuestions).map((moduleName, index) => (
                        <QuestionGroup
                            key={index}
                            moduleName={moduleName}
                            questions={groupedQuestions[moduleName]}
                            onDelete={handleDelete}
                        />
                    ))}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
