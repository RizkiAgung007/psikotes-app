import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowRight,
    Layers,
    Loader2,
    Lock,
    Mail,
    User,
    UserPlus,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Baru" />

            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <Link
                        href="/"
                        className="bg-indigo-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-200"
                    >
                        <Layers className="w-8 h-8" />
                    </Link>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Buat Akun Baru
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                    Bergabunglah untuk memulai perjalanan asesmen Anda.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Input Nama */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Nama Lengkap
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors shadow-sm"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            placeholder="Username"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Input Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Alamat Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors shadow-sm"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            placeholder="nama@email.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Input Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
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
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            placeholder="Minimal 8 karakter"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Input Konfirmasi Password */}
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Konfirmasi Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition-colors shadow-sm"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                            placeholder="Ulangi Password"
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                    {processing ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Mendaftarkan...
                        </>
                    ) : (
                        <>
                            Daftar Sekarang
                            <UserPlus className="w-4 h-4" />
                        </>
                    )}
                </button>

                {/* Login */}
                <div className="text-center mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Sudah punya akun?{" "}
                        <Link
                            href={route("login")}
                            className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            Masuk
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
