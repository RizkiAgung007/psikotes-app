import { Calendar, FileText, User } from "lucide-react";
import React from "react";

export default function UserInfoCard({ user, moduleName, finishedAt }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-full border border-indigo-100 text-indigo-600">
                    <User className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {user?.name || "Nama Tidak Ada"}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">
                        {user?.email || "-"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>
                        Modul:{" "}
                        <span className="font-bold text-gray-900">
                            {moduleName || "-"}
                        </span>
                    </span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>
                        Selesai:{" "}
                        <span className="font-bold text-gray-900">
                            {finishedAt
                                ? new Date(finishedAt).toLocaleDateString(
                                      "id-ID",
                                      {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                      }
                                  )
                                : "-"}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
