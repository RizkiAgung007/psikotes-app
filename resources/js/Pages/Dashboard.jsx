import ModuleCard from "@/Components/ModuleCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { BookIcon } from "lucide-react";
import React from "react";

export default function Dashboard({ auth, modules }) {
    const isAdmin = auth.user.role === "admin";

    // Fungsi Toggle tetap disini (sebagai Controller Logic di Frontend)
    const handleToggle = (moduleId) => {
        router.patch(
            route("admin.modules.padlock", moduleId),
            {},
            { preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center gap-2">
                    Dashboard Peserta
                    {isAdmin && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200">
                            Preview Mode
                        </span>
                    )}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Banner Welcome */}
                    <div className={`rounded-2xl shadow-lg p-8 mb-10 text-white ${
                        isAdmin
                            ? "bg-gray-800"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600"
                    }`}>
                        <h3 className="text-3xl font-bold mb-2">
                            {isAdmin ? `Halo, Admin ${auth.user.name}` : `Halo, ${auth.user.name}! 👋`}
                        </h3>
                        <p className="opacity-90 text-lg">
                            {isAdmin
                                ? "Ini adalah tampilan yang dilihat oleh peserta. Anda tidak dapat mengerjakan tes di mode ini."
                                : "Selamat datang di platform asesmen. Silakan pilih modul tes."}
                        </p>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <BookIcon className="w-6 h-6 text-indigo-600" />
                        Daftar Modul Tes
                    </h3>

                    {/* Grid Modul - Jauh lebih bersih! */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {modules.length > 0 ? (
                            modules.map((module) => (
                                <ModuleCard
                                    key={module.id}
                                    module={module}
                                    isAdmin={isAdmin}
                                    onToggle={handleToggle}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-10 text-gray-500">
                                Belum ada modul yang tersedia.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
