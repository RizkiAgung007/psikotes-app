import ExamFooter from "@/Components/Exam/ExamFooter";
import QuestionCard from "@/Components/Exam/QuestionCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Show({ auth, test, questions, remaining_time }) {
    // State timer
    const [timeLeft, setTimeLeft] = useState(remaining_time);

    // State jawaban
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    handleAutoSubmit();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Fungsi auto submit
    const handleAutoSubmit = () => {
        post(route("exam.submit", test.id), {
            replace: true,
        });
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

        // Mengecek opsi lain pada pertanyaan yang sama
        question.options.forEach((opt) => {
            if (opt.id !== currentOptionId) {
                if (newAnswers[opt.id] === newScore) {
                    delete newAnswers[opt.id];
                }
            }
        });

        setData("answers", newAnswers);
    };

    // Menghitung Progreess
    const totalItemsToRate = questions.reduce(
        (total, q) => total + q.options.length,
        0
    );
    const answeredCount = Object.keys(data.answers).length;
    const isAllAnswered = answeredCount === totalItemsToRate;

    // Handle Submit
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

        post(route("exam.submit", test.id));
    };

    const isWarn = timeLeft < 300;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {test.module.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Berikan penilaian untuk setiap pernyataan di bawah ini.
                        </p>
                    </div>
                    {/* Badge Progress */}
                    <div
                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                            isAllAnswered
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-indigo-50 text-indigo-700 border-indigo-200"
                        }`}
                    >
                        Terisi: {answeredCount} / {totalItemsToRate} Item
                    </div>
                </div>
            }
        >
            <Head title={`Ujian: ${test.module.name}`} />

            <div className="py-12 pb-32">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    {/* Warning Waktu */}
                    {isWarn && timeLeft > 0 && (
                        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm flex items-center gap-3 animate-pulse">
                            <AlertTriangle className="text-red-500 w-6 h-6" />
                            <p className="font-bold text-red-700">
                                Waktu Hampir Habis!
                            </p>
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

                        {/* Footer Component */}
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
