import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import {
    Box,
    ChevronDown,
    FileText,
    Layers,
    LayoutDashboard,
    ListFilter,
    LogOut,
    Menu,
    User,
    X,
} from "lucide-react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Membuat inisial nama untuk avatar
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur-md transition-all">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Logo Section */}
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="group flex items-center gap-2.5"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 transition-all group-hover:scale-105 group-hover:shadow-indigo-300">
                                        <Layers className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold tracking-tight text-gray-900 leading-none">
                                            Assessment
                                        </span>
                                        <span className="text-xs font-semibold text-indigo-600 tracking-wider">
                                            ONLINE
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </div>
                                </NavLink>

                                {user.role === "user" && (
                                    <NavLink
                                        href={route("history")}
                                        active={route().current("history")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            History
                                        </div>
                                    </NavLink>
                                )}

                                {user.role === "admin" && (
                                    <>
                                        <NavLink
                                            href={route(
                                                "admin.questions.index"
                                            )}
                                            active={route().current(
                                                "admin.questions.*"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                Soal
                                            </div>
                                        </NavLink>

                                        <NavLink
                                            href={route(
                                                "admin.categories.index"
                                            )}
                                            active={route().current(
                                                "admin.categories.*"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <ListFilter className="w-4 h-4" />
                                                Kategori
                                            </div>
                                        </NavLink>

                                        <NavLink
                                            href={route("admin.modules.index")}
                                            active={route().current(
                                                "admin.modules.*"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Box className="w-4 h-4" />
                                                Modul
                                            </div>
                                        </NavLink>

                                        <NavLink
                                            href={route("admin.results.index")}
                                            active={route().current(
                                                "admin.results.*"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Layers className="w-4 h-4" />
                                                Hasil Tes
                                            </div>
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Desktop User Settings */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="group inline-flex items-center gap-3 rounded-full border border-transparent py-1 ps-1 pe-3 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white shadow-sm">
                                                    {getInitials(user.name)}
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <span className="text-gray-700 font-semibold group-hover:text-gray-900">
                                                        {
                                                            user.name.split(
                                                                " "
                                                            )[0]
                                                        }
                                                    </span>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="48">
                                        <div className="px-4 py-3 border-b border-gray-100 mb-1 bg-gray-50/50">
                                            <p className="text-xs text-gray-500">
                                                Signed in as
                                            </p>
                                            <p className="text-sm font-bold text-gray-800 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Profile
                                            </div>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                        >
                                            <div className="flex items-center gap-2">
                                                <LogOut className="w-4 h-4" />
                                                Log Out
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl z-40 animate-in slide-in-from-top-2 duration-200"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 px-3">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            <div className="flex items-center gap-3">
                                <LayoutDashboard className="w-5 h-5" />
                                Dashboard
                            </div>
                        </ResponsiveNavLink>

                        {user.role === "user" && (
                            <ResponsiveNavLink
                                href={route("history")}
                                active={route().current("history")}
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5" />
                                    History
                                </div>
                            </ResponsiveNavLink>
                        )}

                        {user.role === "admin" && (
                            <>
                                <div className="px-4 py-2 text-xs font-bold uppercase text-gray-400 tracking-wider">
                                    Menu Admin
                                </div>
                                <ResponsiveNavLink
                                    href={route("admin.questions.index")}
                                    active={route().current(
                                        "admin.questions.*"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5" />
                                        Soal
                                    </div>
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.categories.index")}
                                    active={route().current(
                                        "admin.categories.*"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <ListFilter className="w-5 h-5" />
                                        Kategori
                                    </div>
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.modules.index")}
                                    active={route().current("admin.modules.*")}
                                >
                                    <div className="flex items-center gap-3">
                                        <Box className="w-5 h-5" />
                                        Modul
                                    </div>
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("admin.results.index")}
                                    active={route().current("admin.results.*")}
                                >
                                    <div className="flex items-center gap-3">
                                        <Layers className="w-5 h-5" />
                                        Hasil Tes
                                    </div>
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    {/* Mobile User Profile Section */}
                    <div className="border-t border-gray-100 bg-gray-50 pb-4 pt-4">
                        <div className="px-4 flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-full bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-sm">
                                {getInitials(user.name)}
                            </div>
                            <div>
                                <div className="text-base font-bold text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 space-y-1 px-3">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <User className="w-5 h-5" />
                                    Profile Settings
                                </div>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                <div className="flex items-center gap-3">
                                    <LogOut className="w-5 h-5" />
                                    Log Out
                                </div>
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow-sm border-b border-gray-100 relative z-10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
