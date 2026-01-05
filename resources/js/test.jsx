import ExamFooter from "@/Components/Exam/ExamFooter";
import QuestionCard from "@/Components/Exam/QuestionCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// 1. TAMBAHKAN IMPORT 'router' DI SINI
import { Head, router, useForm } from "@inertiajs/react";
import { AlertTriangle, FileText } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function Show({ auth, test, questions, remaining_time }) {
    // State timer
    const [timeLeft, setTimeLeft] = useState(remaining_time);

    // State jawaban
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    // Ref untuk menyimpan jawaban terbaru agar terbaca oleh Timer
    const answersRef = useRef(data.answers);

    // Update Ref setiap kali state berubah
    useEffect(() => {
        answersRef.current = data.answers;
    }, [data.answers]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    // Panggil fungsi auto submit
                    handleAutoSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // 2. PERBAIKAN UTAMA DI SINI (Gunakan router.post, bukan post dari useForm)
    const handleAutoSubmit = () => {
        // Kita gunakan router.post manual agar bisa memaksa kirim data dari Ref
        router.post(
            route("exam.submit", test.id),
            {
                answers: answersRef.current, // Kirim isi Ref terbaru
            },
            {
                replace: true,
            }
        );
    };

    // Helper format waktu
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}:${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
        }
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Handle Rating
    const handleRatingChange = (question, currentOptionId, newScore) => {
        const newAnswers = { ...data.answers };
        newAnswers[currentOptionId] = newScore;

        question.options.forEach((opt) => {
            if (opt.id !== currentOptionId) {
                if (newAnswers[opt.id] === newScore) {
                    delete newAnswers[opt.id];
                }
            }
        });

        setData("answers", newAnswers);
    };

    const totalItemsToRate = questions.reduce(
        (total, q) => total + q.options.length,
        0
    );
    const answeredCount = Object.keys(data.answers).length;
    const isAllAnswered = answeredCount === totalItemsToRate;

    // Handle Submit Manual (Tetap gunakan useForm post karena ini dipicu user click)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAllAnswered) {
            if (
                !confirm(
                    `Anda baru menilai ${answeredCount} dari ${totalItemsToRate} item. Yakin ingin mengumpulkan?`
                )
            ) {
                return;
            }
        } else {
            if (!confirm("Apakah Anda yakin ingin mengumpulkan jawaban ini?")) {
                return;
            }
        }

        // Submit manual tetap pakai helper bawaan useForm karena state-nya fresh (bukan closure)
        post(route("exam.submit", test.id));
    };

    const isWarn = timeLeft < 300;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-indigo-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-gray-900 leading-tight">
                                {test.module.name}
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Silakan berikan penilaian prioritas untuk setiap
                                pernyataan.
                            </p>
                        </div>
                    </div>

                    <div
                        className={`px-4 py-2 rounded-xl text-sm font-bold border flex items-center gap-2 shadow-sm transition-all ${
                            isAllAnswered
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-white text-gray-600 border-gray-200"
                        }`}
                    >
                        <div
                            className={`w-2.5 h-2.5 rounded-full ${
                                isAllAnswered
                                    ? "bg-emerald-500 animate-pulse"
                                    : "bg-gray-300"
                            }`}
                        />
                        <span>
                            Terisi: {answeredCount} / {totalItemsToRate} Item
                        </span>
                    </div>
                </div>
            }
        >
            <Head title={`Ujian: ${test.module.name}`} />

            <div className="pb-48 pt-12 md:py-32">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 px-4">
                    {/* Warning Waktu */}
                    {isWarn && timeLeft > 0 && (
                        <div className="mb-8 bg-red-50 border border-red-100 p-5 rounded-2xl shadow-sm flex items-center gap-4 animate-pulse">
                            <div className="bg-white p-2.5 rounded-xl text-red-600 shadow-sm border border-red-100">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-red-800 text-lg">
                                    Waktu Hampir Habis!
                                </h4>
                                <p className="text-sm text-red-600 font-medium">
                                    Segera selesaikan dan kumpulkan jawaban Anda
                                    sebelum waktu habis.
                                </p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {questions.map((question, qIndex) => (
                                <QuestionCard
                                    key={question.id}
                                    question={question}
                                    index={qIndex}
                                    answers={data.answers}
                                    onRatingChange={handleRatingChange}
                                />
                            ))}
                        </div>

                        <ExamFooter
                            timeLeft={timeLeft}
                            formatTime={formatTime}
                            isWarn={isWarn}
                            answeredCount={answeredCount}
                            totalItemsToRate={totalItemsToRate}
                            isAllAnswered={isAllAnswered}
                            processing={processing}
                        />
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
