import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Info, Save } from "lucide-react";
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
        setData("Interpretations", updatedInterpretations);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.categories.index")}
                        className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 border shadow-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Atur Penjelasan Hasil
                        </h2>
                        <p className="text-sm text-gray-500">
                            Kategori:{" "}
                            <span className="font-bold text-indigo-600">
                                {category.name} ({category.code})
                            </span>
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Penjelasan - ${category.name}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Info Box */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Info className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    Total ada{" "}
                                    <strong>{totalRanks} Ranking</strong> dalam
                                    modul ini.
                                    <br />
                                    Silakan isi narasi untuk setiap posisi
                                    ranking.
                                    <br />
                                    <em>
                                        Contoh: Rank 1 = "Kekuatan Utama Anda",
                                        Rank Terakhir = "Kelemahan Anda".
                                    </em>
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Looping input berdasarkan rank */}
                        {data.interpretations.map((item, index) => (
                            <div
                                key={item.rank}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100 p-6"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block font-bold text-gray-800 text-lg">
                                        Jika Kategori ini berada di{" "}
                                        <span className="text-indigo-600 decoration-indigo-300">
                                            {" "}
                                            Posisi #{item.rank}
                                        </span>
                                    </label>
                                </div>

                                <textarea
                                    value={item.description}
                                    onChange={(e) =>
                                        handleDescriptionChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    rows="4"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all"
                                    placeholder={`Masukkan penjelasan jika ${category.name} berada di urutan ke-${item.rank}...`}
                                    required
                                />
                            </div>
                        ))}

                        <div className="flex justify-end sticky bottom-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Semua Penjelasan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
