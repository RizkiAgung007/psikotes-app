import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    Clock,
    Layers,
    LayoutDashboard,
    TrendingUp,
} from "lucide-react";
import React from "react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang" />

            <div className="min-h-screen bg-gray-50 text-gray-900">
                {/* Navbar */}
                <nav className="fixed w-full z-20 bg-white/50 backdrop-blur-md border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-bold text-gray-800 tracking-tight">
                                    Assessment{" "}
                                    <span className="text-indigo-600">
                                        Online
                                    </span>
                                </span>
                            </div>

                            {/* Link Auth */}
                            <div className="flex items-center gap-8">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-all"
                                    >
                                        <LayoutDashboard />
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="px-5 py-2.5 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                        <span className="inline-block py-4 px-8 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-6 border border-indigo-100">
                            🚀 Platform Psikotes & Kompetensi Terpercaya
                        </span>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
                            Kenali Potensi Diri <br />
                            <span className="text-indigo-600 border-b-4">
                                Secara Akurat
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Aplikasi assessment online dengan berbagai modul tes
                            adaptif. Dapatkan analisis hasil instan untuk
                            mengetahui gaya belajar, kepribadian, dan kompetensi
                            anda.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    Lanjut ke Dashboard
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    href={route("register")}
                                    className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                >
                                    Mulai Tes Sekarang
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            )}

                            <a
                                href="#info"
                                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                </div>

                {/* Grid Info */}
                <div
                    id="info"
                    className="py-24 bg-white border-t border-gray-100"
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Mengapa Memilih Kami?
                            </h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Kami menyediakan fitur lengkap untuk mendukung
                                proses asesmen yang efektif dan efisien.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Beragam Modul Tes
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Tersedia berbagai jenis modul tes mulai dari
                                    gaya belajar, kepribadian, hingga kompetensi
                                    teknis yang dapat dipilih sesuai kebutuhan.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Hasil Real-time
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Tidak perlu menunggu lama. Hasil analisis
                                    dan skor akan langsung muncul begitu Anda
                                    menyelesaikan ujian beserta penjelasannya.
                                </p>
                            </div>

                            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    Analisis Mendalam
                                </h3>

                                <p className="text-gray-600 leading-relaxed text-justify">
                                    Setiap hasil dilengkapi dengan interpretasi
                                    deskriptif yang membantu Anda memahami
                                    kekuatan dan area pengembangan diri.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-600" />
                        <span className="text-xl font-bold text-gray-800 tracking-tight">
                            Assessment{" "}
                            <span className="text-indigo-600">Online</span>
                        </span>{" "}
                    </div>
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Assessment Online System. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
