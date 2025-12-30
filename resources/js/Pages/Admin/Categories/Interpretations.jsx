import InterpretationFormItem from "@/Components/Category/InterpretationFormItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, BookOpen, Info, Save } from "lucide-react";
import React from "react";

export default function Interpretations({
    auth,
    category,
    totalRanks,
    existing,
}) {
    // Membuat array inisialisasi interpretasi berdasarkan totalRanks dan data existing
    const initialInterpretations = Array.from(
        { length: totalRanks },
        (_, i) => {
            const rank = i + 1;
            const foundData = existing.find((item) => item.rank === rank);

            return {
                rank: rank,
                description: foundData ? foundData.description : "",
            };
        }
    );

    // Setup form
    const { data, setData, post, processing, errors } = useForm({
        interpretations: initialInterpretations,
    });

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.categories.interpretations.update", category.id));
    };

    // Handle description change
    const handleDescriptionChange = (index, value) => {
        const updatedInterpretations = [...data.interpretations];
        updatedInterpretations[index].description = value;
        setData("interpretations", updatedInterpretations);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.categories.index")}
                        className="p-2.5 bg-white rounded-xl text-gray-500 hover:text-indigo-600 border border-gray-200 shadow-sm transition-all hover:bg-gray-50"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600 hidden sm:block">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-gray-900 leading-tight">
                                Atur Penjelasan Hasil
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">
                                    Kategori:
                                </span>
                                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                                    {category.name} ({category.code})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Penjelasan - ${category.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-100 p-6 mb-8 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-2.5 rounded-xl text-blue-600">
                            <Info className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-blue-900 mb-1">
                                Panduan Pengisian
                            </h4>
                            <p className="text-sm text-blue-800 leading-relaxed">
                                Total ada{" "}
                                <strong className="font-bold bg-white px-1.5 rounded text-blue-700 border border-blue-200">
                                    {totalRanks} Ranking
                                </strong>{" "}
                                dalam modul ini. Silakan isi narasi untuk setiap
                                posisi ranking secara berurutan.
                            </p>
                            <p className="mt-3 text-xs font-medium text-blue-600 bg-blue-100/50 p-3 rounded-lg border border-blue-200 italic">
                                "Contoh: Jika Ranking 1 adalah yang paling
                                dominan, deskripsikan sebagai kekuatan utama
                                peserta."
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 relative"
                    >
                        {/* Looping input berdasarkan rank */}
                        {data.interpretations.map((item, index) => (
                            <InterpretationFormItem
                                key={item.rank}
                                rank={item.rank}
                                categoryName={category.name}
                                value={item.description}
                                onChange={(val) =>
                                    handleDescriptionChange(index, val)
                                }
                            />
                        ))}

                        {/* Sticky Action Button */}
                        <div className="sticky bottom-6 z-20 flex justify-end">
                            <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-gray-100 inline-block">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-5 h-5" />
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Semua Penjelasan"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
