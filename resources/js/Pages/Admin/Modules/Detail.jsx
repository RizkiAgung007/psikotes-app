import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function Detail({ auth, module }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.categories.index")}
                        className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 border shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800">
                        Detail Modul: {module.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Detail ${module.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* Looping Kategori */}
                    {module.categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200"
                        >
                            {/* Judul */}
                            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
                                <h3 className="text-lg font-bold text-indigo-900">
                                    Kategori: {cat.name} - ({cat.code})
                                </h3>
                            </div>

                            {/* Isi Interpretasi */}
                            <div>
                                {cat.interpretations.length > 0 ? (
                                    cat.interpretations.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 p-4 border rounded-lg bg-gray-50"
                                        >
                                            <div className="flex-shrink-0">
                                                <span className="bg-white border border-gray-300 font-bold px-3 py-1 rounded text-sm">
                                                    Rank {item.rank}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700 leading-relaxed text-justify">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400 italic">
                                        Belum ada data interpretasi.
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
