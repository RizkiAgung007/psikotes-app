import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowRight, Layers, Loader2, Lock, Mail } from "lucide-react";
import React from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login Assessment Online" />

            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <Link
                        href="/"
                        className="bg-indigo-600 p-3 rounded-xl text-white"
                    >
                        <Layers className="w-8 h-8" />
                    </Link>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Selamat Datang Kembali
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    Silahkan masuk untuk mengakses sistem
                </p>
            </div>

            {status && (
                <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm font-medium">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Input Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors shadow-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="name@gmail.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Input Password */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        {/* {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Lupa password?
                            </Link>
                        )} */}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors shadow-sm"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="******"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remeber me
                <div>
                    <label>
                        <Checkbox
                            name="remember"
                            checked={data.reminder}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="text-indigo-600 focus:ring-indigo-500 rounded"
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Ingat saya?
                        </span>
                    </label>
                </div> */}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Memproses
                        </>
                    ) : (
                        <>
                            Masuk Sekarang
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>

                {/* Register */}
                <div className="text-center mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Belum memiliki akun?
                    </p>
                    <Link
                        href={route("register")}
                        className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Daftar sekarang
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
