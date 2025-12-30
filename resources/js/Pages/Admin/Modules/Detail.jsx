import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, BookOpen, Hash, Info, Layers, Tag } from "lucide-react";
import React from "react";

export default function Detail({ auth, module }) {
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
                                Detail Modul
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {module.name}
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Detail ${module.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 px-4 space-y-8">
                    {/* Header Info (Optional, jika ingin menampilkan deskripsi modul lagi) */}
                    {/* ... */}

                    {/* Looping Kategori */}
                    {module.categories.length > 0 ? (
                        module.categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 transition-all hover:shadow-md"
                            >
                                {/* Header Kategori */}
                                <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-indigo-600 shrink-0">
                                            <Tag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                                {cat.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                                                Kategori Penilaian
                                            </p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm font-bold border border-gray-200 shadow-sm self-start sm:self-center">
                                        <Hash className="w-3.5 h-3.5 text-gray-400" />
                                        Kode: {cat.code}
                                    </span>
                                </div>

                                {/* Isi Interpretasi */}
                                <div className="p-6 sm:p-8 bg-gray-50/30">
                                    {cat.interpretations.length > 0 ? (
                                        <div className="grid gap-4">
                                            {cat.interpretations.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border border-gray-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all duration-200 group"
                                                >
                                                    {/* Rank Badge */}
                                                    <div className="flex-shrink-0">
                                                        <div className="w-16 h-16 flex flex-col items-center justify-center bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-600 group-hover:bg-indigo-100 group-hover:border-indigo-200 transition-colors">
                                                            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                                                                Rank
                                                            </span>
                                                            <span className="text-3xl font-extrabold leading-none">
                                                                {item.rank}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <div className="flex-grow flex items-center">
                                                        <p className="text-gray-600 leading-relaxed text-justify text-sm sm:text-base font-medium">
                                                            {item.description || (
                                                                <span className="italic text-gray-400">
                                                                    Belum ada deskripsi untuk peringkat ini.
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Info className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <h4 className="text-gray-900 font-bold mb-1">
                                                Belum ada Interpretasi
                                            </h4>
                                            <p className="text-gray-500 text-sm">
                                                Belum ada data penjelasan hasil untuk kategori ini.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Layers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">
                                Kategori Kosong
                            </h3>
                            <p className="text-gray-500 mt-1">
                                Modul ini belum memiliki kategori penilaian apapun.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}