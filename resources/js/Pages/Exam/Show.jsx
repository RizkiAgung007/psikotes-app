import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Save } from "lucide-react";
import React from "react";

export default function Show({ auth, test, questions }) {
    // State jawaban: { option_id: score }
    const { data, setData, post, processing } = useForm({
        answers: {},
    });

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
                            Berikan penilaian untuk setiap pernyataan di bawah
                            ini.
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
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {questions.map((question, qIndex) => {
                                {
                                    /* Maksimal Skala */
                                }
                                const maxScale = question.options.length;
                                const dynamicScale = Array.from(
                                    { length: maxScale },
                                    (_, i) => i + 1
                                );

                                return (
                                    <div
                                        key={question.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100"
                                    >
                                        {/* Header Pertanyaan */}
                                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex gap-3 items-start">
                                            <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                                {qIndex + 1}
                                            </span>
                                            <h3 className="text-gray-900 font-bold text-lg leading-snug pt-1">
                                                {question.question_text}
                                            </h3>
                                        </div>

                                        {/* List Opsi */}
                                        <div className="divide-y divide-gray-50">
                                            {question.options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    className="p-4 md:p-6 hover:bg-gray-50/50 transition-colors"
                                                >
                                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                                        {/* Teks Pernyataan */}
                                                        <div className="flex-1 min-w-[300px]">
                                                            <p className="text-gray-700 font-medium">
                                                                {
                                                                    option.option_text
                                                                }
                                                            </p>
                                                        </div>

                                                        {/* Tombol Rate */}
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {dynamicScale.map(
                                                                (
                                                                    scoreValue
                                                                ) => {
                                                                    const isSelected =
                                                                        data
                                                                            .answers[
                                                                            option
                                                                                .id
                                                                        ] ===
                                                                        scoreValue;
                                                                    const isTakenByOther =
                                                                        question.options.some(
                                                                            (
                                                                                opt
                                                                            ) =>
                                                                                opt.id !==
                                                                                    option.id &&
                                                                                data
                                                                                    .answers[
                                                                                    opt
                                                                                        .id
                                                                                ] ===
                                                                                    scoreValue
                                                                        );

                                                                    return (
                                                                        <label
                                                                            key={
                                                                                scoreValue
                                                                            }
                                                                            className="cursor-pointer relative"
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={`option_${option.id}`}
                                                                                value={
                                                                                    scoreValue
                                                                                }
                                                                                checked={
                                                                                    isSelected
                                                                                }
                                                                                onChange={() =>
                                                                                    handleRatingChange(
                                                                                        question,
                                                                                        option.id,
                                                                                        scoreValue
                                                                                    )
                                                                                }
                                                                                className="sr-only"
                                                                            />

                                                                            {/* Tombol */}
                                                                            <div
                                                                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border transition-all duration-200
                                                                            ${
                                                                                isSelected
                                                                                    ? "bg-indigo-600 border-indigo-600 text-white shadow-md scale-110 z-10"
                                                                                    : isTakenByOther
                                                                                    ? "bg-gray-100 border-gray-200 text-gray-300"
                                                                                    : "bg-white border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500"
                                                                            }
                                                                        `}
                                                                            >
                                                                                {" "}
                                                                                {
                                                                                    scoreValue
                                                                                }
                                                                            </div>
                                                                        </label>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
                                <div className="hidden md:flex flex-col">
                                    <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                                        Progress
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {answeredCount} / {totalItemsToRate}{" "}
                                        Item Dinilai
                                    </span>
                                </div>

                                <div className="flex-1 flex gap-4 items-center justify-end">
                                    <div className="hidden sm:block w-32 md:w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${
                                                isAllAnswered
                                                    ? "bg-green-500"
                                                    : "bg-indigo-500"
                                            }`}
                                            style={{
                                                width: `${
                                                    (answeredCount /
                                                        totalItemsToRate) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                                            isAllAnswered
                                                ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                                                : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                    >
                                        {processing ? (
                                            "Menyimpan..."
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                <span>Kirim Jawaban</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
