import { Calendar, FileText, User } from "lucide-react";
import React from "react";

export default function UserInfoCard({ user, moduleName, finishedAt }) {
    return (
        <div className="bg-white shadow-sm sm:rounded-lg border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <User className="w-6 h-6 text-indigo-600" />
                    {user?.name || "Nama Tidak Ada"}
                </h3>
                <p className="text-gray-500 text-sm ml-8">{user?.email || "-"}</p>
            </div>
            <div className="text-right space-y-1">
                <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    Modul: <span className="font-bold">{moduleName || "-"}</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Selesai:{" "}
                    <span className="font-bold">
                        {finishedAt
                            ? new Date(finishedAt).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "-"}
                    </span>
                </div>
            </div>
        </div>
    );
}
