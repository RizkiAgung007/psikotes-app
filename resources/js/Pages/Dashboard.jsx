import ModuleCard from "@/Components/ModuleCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BookOpen, LayoutDashboard, ShieldAlert } from "lucide-react";
import React from "react";

export default function Dashboard({ auth, modules }) {
    const isAdmin = auth.user.role === "admin";

    const handleToggle = (moduleId) => {
        router.patch(
            route("admin.modules.padlock", moduleId),
            {},
            { preserveScroll: true }
        );
    };

    const visibleModules = modules.filter((module) => {
        if (isAdmin) return true; 
        return module.is_active; 
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                        <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="font-bold text-xl text-gray-900 leading-tight">
                                Dashboard Peserta
                            </h2>
                            {isAdmin && (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                                    <ShieldAlert className="w-3 h-3" />
                                    Mode Admin Preview
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            Selamat datang kembali, {auth.user.name.split(" ")[0]}!
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Banner Welcome */}
                    <div
                        className={`relative overflow-hidden rounded-2xl p-8 shadow-lg mb-10 transition-all ${
                            isAdmin
                                ? "bg-gray-900"
                                : "bg-gradient-to-br from-indigo-600 to-violet-600"
                        }`}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"></div>

                        <div className="relative z-10 text-white">
                            <h3 className="text-3xl font-bold mb-3 tracking-tight">
                                {isAdmin
                                    ? `Halo, Admin ${auth.user.name}`
                                    : `Halo, ${auth.user.name}! 👋`}
                            </h3>
                            <p className="text-lg font-medium opacity-90 leading-relaxed max-w-2xl">
                                {isAdmin
                                    ? "Anda dapat melihat semua modul (termasuk yang terkunci). Gunakan tombol kunci untuk menyembunyikan modul dari peserta."
                                    : "Selamat datang di platform asesmen kompetensi. Silakan pilih modul tes yang tersedia di bawah ini."}
                            </p>
                        </div>
                    </div>

                    {/* Section Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-indigo-600 shadow-sm">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Daftar Modul Tes
                        </h3>
                    </div>

                    {/* Grid Modul - Gunakan visibleModules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleModules.length > 0 ? (
                            visibleModules.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    isAdmin={isAdmin}
                                    onToggle={handleToggle}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Tidak Ada Modul Tersedia
                                </h3>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    {isAdmin
                                        ? "Belum ada modul yang dibuat."
                                        : "Saat ini tidak ada tes yang aktif untuk Anda kerjakan."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}