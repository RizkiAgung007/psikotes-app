import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Hash, Info, Layers } from "lucide-react";
import React from "react";

export default function Detail({ auth, module }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.categories.index")}
                        className="p-2 bg-white rounded-lg text-gray-400 hover:text-indigo-600 border border-gray-200 shadow-sm transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="font-bold text-xl text-gray-800 leading-tight">
                            Detail Modul
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {module.name}
                        </p>
                    </div>
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
                            className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100"
                        >
                            {/* Judul */}
                            <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg border border-gray-200 text-gray-600 shadow-sm">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {cat.name}
                                    </h3>
                                </div>
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100 flex items-center gap-1">
                                    <Hash className="w-3 h-3" />
                                    {cat.code}
                                </span>
                            </div>

                            {/* Isi Interpretasi */}
                            <div className="p-6">
                                {cat.interpretations.length > 0 ? (
                                    <div className="space-y-4">
                                        {cat.interpretations.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-5 p-5 rounded-xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-sm transition-all"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 flex flex-col items-center justify-center bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-700">
                                                        <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                                                            Rank
                                                        </span>
                                                        <span className="text-2xl font-bold leading-none">
                                                            {item.rank}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-300">
                                        <Info className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-500 font-medium">
                                            Belum ada data interpretasi untuk
                                            kategori ini.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
