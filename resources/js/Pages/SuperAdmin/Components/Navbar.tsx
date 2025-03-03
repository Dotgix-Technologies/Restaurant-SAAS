import NavLink from "@/Components/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ToggleTheme from "./ToggleTheme";
import Dropdown from "@/Components/SuperAdmin/Dropdown";
import { usePage } from '@inertiajs/react';

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
    const user = usePage().props.auth.user;
    const currentLocation = window.location.pathname;

    return (
        <nav className={`fixed top-0  left-0 right-0 z-50 transition-all ${isSidebarOpen ? "md:ml-80" : "md:ml-28"} sm:ml-0 py-2`}>

            <div className="container mx-auto flex items-center justify-end md:justify-between px-4 md:px-8 ">


                {/* Mobile Sidebar Toggle Button */}
                <button
                    className="md:hidden absolute left-4 top-3 p-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} className="text-lg" />
                </button>

                {/* Left Section - Title & Theme Toggle */}
                <div className="flex flex- items-center gap-4 rounded-full py-2 px-3 bg-gradient-to-r from-gray-300 via-white to-gray-200 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900">
                    <ToggleTheme />
                    <h4 className="uppercase text-gray-700 dark:text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-wider mt-0.5 sm:mt-1">
                        {currentLocation === '/'
                            ? 'DASHBOARD'
                            : currentLocation.split('/').filter(Boolean).slice(1,-1).join('/')?.replace('-', ' ')?.toUpperCase()}
                    </h4>

                </div>

                {/* Right Section - Search & Profile */}
                <div className="flex items-center gap-4">

                    {/* Search Bar (Hidden on Small Screens) */}
                    <div className="hidden sm:flex relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 w-40 sm:w-52 rounded-full bg-transparent text-gray-700 dark:text-white border border-gray-400 dark:border-blue-800 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
                        />
                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="inline-flex items-center bg-transparent rounded-full border border-gray-400 dark:border-blue-800 px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-300"
                                >
                                    {user.name}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}
