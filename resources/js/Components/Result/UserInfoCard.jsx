import { Calendar, FileText, User } from "lucide-react";
import React from "react";

export default function UserInfoCard({ user, moduleName, finishedAt }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-6 transition-all hover:shadow-md">
            {/* User Info Left */}
            <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0 shadow-sm">
                    <User className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                        {user?.name || "Nama Tidak Ada"}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">
                        {user?.email || "-"}
                    </p>
                </div>
            </div>

            {/* Meta Info Right */}
            <div className="flex flex-col sm:flex-row gap-3 md:items-center">
                {/* Badge Modul */}
                <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[180px]">
                    <div className="p-1.5 bg-white rounded-lg text-indigo-600 shadow-sm border border-gray-100">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Modul Tes
                        </span>
                        <span className="text-sm font-bold text-gray-900 line-clamp-1">
                            {moduleName || "-"}
                        </span>
                    </div>
                </div>

                {/* Badge Tanggal */}
                <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 min-w-[180px]">
                    <div className="p-1.5 bg-white rounded-lg text-emerald-600 shadow-sm border border-gray-100">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Selesai Pada
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                            {finishedAt
                                ? new Date(finishedAt).toLocaleDateString(
                                      "id-ID",
                                      {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      }
                                  )
                                : "-"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}