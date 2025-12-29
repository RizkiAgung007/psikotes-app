import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p className="text-sm text-gray-600">
                Setelah akun Anda dihapus, semua sumber daya dan datanya akan
                dihapus secara permanen. Sebelum menghapus akun Anda, harap
                unduh data atau informasi apa pun yang ingin Anda simpan.
            </p>

            <DangerButton onClick={confirmUserDeletion}>
                Hapus Akun
            </DangerButton>

            {/* Modal Konfitmasi Hapus */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <AlertTriangle className="w-8 h-8" />
                        <h2 className="text-lg font-medium text-gray-900">
                            Apakah Anda yakin ingin menghapus akun ini?
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                        Setelah akun Anda dihapus, semua sumber daya dan datanya
                        akan dihapus secara permanen. Silakan masukkan kata
                        sandi Anda untuk mengonfirmasi bahwa Anda ingin
                        menghapus akun Anda secara permanen.
                    </p>

                    {/* Input Password */}
                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4 rounded-lg border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm transition-colors"
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton
                            className="ms-3 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                            disabled={processing}
                        >
                            Hapus Akun
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
