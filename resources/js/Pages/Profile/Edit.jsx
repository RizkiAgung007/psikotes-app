import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Lock, Settings, Trash2, User } from "lucide-react"; // Import Ikon
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status, auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <Settings className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 leading-tight">
                        Pengaturan Profil
                    </h2>
                </div>
            }
        >
            <Head title="Pengaturan Profil" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl space-y-8 sm:px-6 lg:px-8">
                    {/* Update Profil */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-xl border border-gray-100 sm:p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="bg-indigo-50 p-2 rounded-full">
                                <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Informasi Pribadi
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Perbarui nama akun dan alamat email Anda.
                                </p>
                            </div>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Update Password */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-xl border border-gray-100 sm:p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="bg-orange-50 p-2 rounded-full">
                                <Lock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                    Keamanan Akun
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Pastikan akun Anda aman dengan password
                                    yang kuat.
                                </p>
                            </div>
                        </div>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Hapus Akun */}
                    <div className="bg-white p-4 shadow-sm sm:rounded-xl border border-red-100 sm:p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-100">
                            <div className="bg-red-50 p-2 rounded-full">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-red-600">
                                    Hapus Akun
                                </h3>
                                <p className="text-sm text-red-400">
                                    Hapus akun Anda secara permanen.
                                </p>
                            </div>
                        </div>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
