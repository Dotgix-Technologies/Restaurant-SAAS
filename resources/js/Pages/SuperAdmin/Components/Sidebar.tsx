import NavLink from "@/Components/SuperAdmin/NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt, faBars, faTimes, faUsers
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dropdown from "@/Components/SuperAdmin/Dropdown";

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
    const menuItems = [
        { icon: faTachometerAlt, text: "Dashboard", link: route("SuperAdmin.dashboard") },
    ];

    return (
        <>
            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-100 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900 shadow-lg z-50 my-4 rounded-xl  h-[calc(100vh-32px)] transition-transform transform ${isSidebarOpen ? "translate-x-0 ml-4" : "-translate-x-full ml-0"} md:hidden w-64  overflow-y-auto p-6`}
            >
                <button
                    className="mb-4 p-2 bg-gradient-to-r from-gray-200 via-white to-gray-100 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900  rounded-lg"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} className="text-lg" />
                </button>

                <ul className="flex flex-col space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink href={item.link} active={route().current("dashboard")} className="flex items-center gap-4 text-sm text-gray-700 font-light px-2 py-3 rounded-lg">
                                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                                {item.text}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-white font-light px-2 py-3 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faUsers} onClick={(e) => isSidebarOpen ? e.preventDefault : setIsSidebarOpen(!isSidebarOpen)} className="text-lg" />
                                    {isSidebarOpen && "Users"}
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                <Dropdown.Link href={route("SuperAdmin.users.create")}>Register New</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'SuperAdmin')}>Super Admins</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'SuperConsultant')}>Super Consultants</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'Restaurant')}>Restaurants</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'Client')}>Clients</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-white font-light px-2 py-3 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faUsers} onClick={(e) => isSidebarOpen ? e.preventDefault : setIsSidebarOpen(!isSidebarOpen)} className="text-lg" />
                                    {isSidebarOpen && "Tenants"}
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                <Dropdown.Link href={route("SuperAdmin.tenants.create")}>Add</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.tenants.index")}>View</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.tenants.requests")}>Manage Requests</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                </ul>
            </div>

            {/* Desktop Sidebar */}
            <div
                className={`hidden md:flex bg-gradient-to-r from-gray-300 via-white to-gray-200 dark:from-slate-950 dark:via-blue-900 dark:to-slate-900 shadow-sm inset-0 z-50 my-4 md:ml-4 h-[calc(100vh-32px)] ${isSidebarOpen ? 'w-72' : 'w-20'} rounded-xl  transition-all duration-300 fixed   overflow-y-auto flex flex-col py-4 px-6`}
            >
                <button
                    className="mb-4 p-2 bg-gradient-to-r dark:from-gray-700 dark:via-white dark:to-gray-600 from-slate-900 via-blue-800 to-slate-700 rounded-lg"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FontAwesomeIcon icon={isSidebarOpen ? faBars : faTimes} className="text-lg dark:text-gray-700 text-gray-200" />
                </button>
                <ul className="flex flex-col space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink href={item.link} active={route().current("SuperAdmin.dashboard")} className={`flex items-center gap-4 text-sm ${isSidebarOpen ? 'justify-start ' : 'justify-center'}  font-light rounded-lg`}>
                                <FontAwesomeIcon icon={item.icon} className={`text-lg ${isSidebarOpen ? 'mx-2' : 'min-w-6'}`} />
                                {isSidebarOpen && item.text}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-white font-light px-2 py-3 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faUsers} onClick={(e) => isSidebarOpen ? e.preventDefault : setIsSidebarOpen(!isSidebarOpen)} className="text-lg" />
                                    {isSidebarOpen && "Users"}
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                <Dropdown.Link href={route("SuperAdmin.users.create")}>Register New</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'SuperAdmin')}>Super Admins</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'SuperConsultant')}>Super Consultants</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'Restaurant')}>Restaurants</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.users.index", 'Client')}>Clients</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                    <li>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-white font-light px-2 py-3 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faUsers} onClick={(e) => isSidebarOpen ? e.preventDefault : setIsSidebarOpen(!isSidebarOpen)} className="text-lg" />
                                    {isSidebarOpen && "Tenants"}
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="left">
                                <Dropdown.Link href={route("SuperAdmin.tenants.create")}>Add</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.tenants.index")}>View</Dropdown.Link>
                                <Dropdown.Link href={route("SuperAdmin.tenants.requests")}>Manage Requests</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                </ul>


            </div>
        </>
    );
}
