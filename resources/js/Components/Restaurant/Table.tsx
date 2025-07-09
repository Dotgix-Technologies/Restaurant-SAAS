import { Link, router } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
interface NestedColumn {
    key: string;
    label: string;
    type: "text" | "image" | "link" | "file" | "status" | "date" | "action" | "putaction";
    actions?: { label: string; route: string; class: string }[];
    putactions?: { options: { label: string; value: string }[]; route: string; class?: string };
    conditions?: Record<string, string>;
}
export interface Column {
    key: string;
    label: string;
    type: "text" | "image" | "link" | "status" | "file" | "date" | "action" | "putaction" | "nestedColumns";
    actions?: { label: string; route: string; class: string }[];
    putactions?: { options: { label: string; value: string }[]; route: string; class?: string };
    conditions?: Record<string, string>;
    nestedColumns?: NestedColumn[];
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    title?: string;
    className?: string;
    headcustomaction?: any
}

const Table: React.FC<TableProps> = ({ title = "Table", headcustomaction = "", columns, data, className = "" }) => {
    return (
        <div className={`relative flex flex-col bg-clip-border rounded-xl bg-transparent 
            bg-gradient-to-r from-gray-300 via-white to-gray-200 
            dark:from-slate-950 dark:via-blue-900 dark:to-slate-900 
            dark:text-gray-400 text-gray-700 shadow-md ${className}`}>

            {/* Header */}
            <div className="flex justify-between relative bg-clip-border mx-4 rounded-xl overflow-hidden 
                bg-gradient-to-r dark:from-gray-300 dark:via-white dark:to-gray-400 
                from-slate-950 via-blue-900 to-slate-900 text-gray-200 -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    {title}
                </h6>
                <div className="flex flex-end">
                    {headcustomaction && <div>{headcustomaction}</div>}
                </div>
            </div>

            {/* Table */}
            <div className="p-6 scrollbar-thin overflow-x-auto px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto ">
                    {/* Table Header */}
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={`${col.key}-${index}`} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <p className="block antialiased font-sans text-[11px] font-bold uppercase text-blue-gray-400">
                                        {col.label}
                                    </p>
                                </th>
                            ))}
                        </tr>
                    </thead>



                    {/* Table Body */}
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-blue-gray-50 ">
                                {columns.map((col, colIndex) => (
                                    <td key={`${col.key}-${colIndex}-${rowIndex}`} className="py-3 px-5 scrollbar-thin">
                                        {renderCellContent(col, row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

/**
 * Function to render different types of column values
 */
const renderCellContent = (col: Column, row: Record<string, any>) => {
    const value = row[col.key];

    switch (col.type) {
        case "text":
            return <p className="text-gray-800 dark:text-gray-200">{value}</p>;

        case "image":
            return value ? (
                <img src={value} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
                <span className="text-gray-400">No Image</span>
            );

        case "link":
            return value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Open Link
                </a>
            ) : (
                <span className="text-gray-400">No Link</span>
            );
        case "file":
            return value ? (
                <a href={`/${value}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <span className="text-sm">Open File</span>
                </a>
            ) : (
                <span className="text-gray-400">No File</span>
            );
        case "status":
            const statusClass = col.conditions?.[value] || "bg-gray-500";
            return (
                <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${statusClass} text-white`}>
                    {value}
                </span>
            );

        case "date":
            return <p className="text-gray-800 dark:text-gray-200">{value ? new Date(value).toLocaleDateString() : <><small className="bg-red-500 px-2 py-1 text-xs font-semibold rounded-lg text-white">No data</small></>}</p>;
        case "action":
            return (
                <div className="flex space-x-2">
                    {col.actions?.map((action, index) => (
                        <Link key={index} href={`${action.route}/${row.id}`} className={`${action.class} text-white px-2 py-1 cursor-pointer rounded text-xs`}>
                            {action.label}
                        </Link>
                    ))}
                </div>
            );
        case "nestedColumns":
            const nestedData = row[col.key]; // Retrieve nested data from row
            if (!nestedData) {
                return <span className="text-gray-400">No Nested Data</span>;
            } else if (Array.isArray(nestedData)) {
                return (
                    <div className="ml-4 scrollbar-thin border-gray-300 pl-2 max-h-20 overflow-y-auto">
                        {nestedData.map((nestedRow, index) => (
                            <div key={index} className="mb-1 border-t-2 border-b-2">
                                {col.nestedColumns?.map((nestedCol) => (
                                    <div key={nestedCol.key}>
                                        <strong>{nestedCol.label}:</strong> {nestedCellContent(nestedCol, nestedRow)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );
            } else if (typeof nestedData === "object") {
                return (
                    <div className="ml-4 scrollbar-thin border-gray-300 pl-2 max-h-20 overflow-y-auto">
                        {col.nestedColumns?.map((nestedCol) => (
                            <div key={nestedCol.key}>
                                <strong>{nestedCol.label}:</strong> {nestedCellContent(nestedCol, nestedData)}
                            </div>
                        ))}
                    </div>
                );
            } else {
                return <span className="text-gray-400">Invalid Data</span>;
            }


        case "putaction":
            return col.putactions ? (
                <select
                    className={`border px-2 py-1 rounded text-sm ${col.putactions.class || ""}`}
                    defaultValue={value}
                    onChange={(e) => handlePutAction(e, col.putactions?.route, row.id)}
                >
                    {col.putactions.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="text-gray-400 dark:text-gray-800">No Actions</span>
            );

        default:
            return <p>{value}</p>;
    }
};
const nestedCellContent = (col: NestedColumn, row: Record<string, any>) => {
    const value = row[col.key];

    switch (col.type) {
        case "text":
            return <p className="text-gray-800 dark:text-gray-200">{value}</p>;

        case "image":
            return value ? (
                <img src={value} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
                <span className="text-gray-400">No Image</span>
            );
        case "file":
            return value ? (
                <a href={`/${value}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <span className="text-sm">Open File</span>
                </a>
            ) : (
                <span className="text-gray-400">No File</span>
            );
        case "link":
            return value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Open Link
                </a>
            ) : (
                <span className="text-gray-400">No Link</span>
            );

        case "status":
            const statusClass = col.conditions?.[value] || "bg-gray-500";
            return (
                <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${statusClass} text-white`}>
                    {value}
                </span>
            );

        case "date":
            return <p className="text-gray-800 dark:text-gray-200">{value ? new Date(value).toLocaleDateString() : <><small className="bg-red-500 px-2 py-1 text-xs font-semibold rounded-lg text-white">No data</small></>}</p>;

        case "action":
            return (
                <div className="flex space-x-2">
                    {col.actions?.map((action, index) => (
                        <Link key={index} href={`${action.route}/${row.id}`} className={`${action.class} text-white px-2 py-1 cursor-pointer rounded text-xs`}>
                            {action.label}
                        </Link>
                    ))}
                </div>
            );

        case "putaction":
            return col.putactions ? (
                <select
                    className={`border px-2 py-1 rounded text-sm ${col.putactions.class || ""}`}
                    defaultValue={value}
                    onChange={(e) => handlePutAction(e, col.putactions?.route, row.id)}
                >
                    {col.putactions.options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <span className="text-gray-400 dark:text-gray-800">No Actions</span>
            );

        default:
            return <p>{value}</p>;
    }
};
const handlePutAction = async (event: React.ChangeEvent<HTMLSelectElement>, route: string, id: number) => {
    const selectedValue = event.target.value;
    event.preventDefault();
    try {
        // const result = await axios.put(`${route}/${id}`, { value: selectedValue });

        router.put(`${route}/${id}`, { value: selectedValue }, {
            onSuccess: () => {
                Swal.fire({
                    toast: true,
                    title: "Success!",
                    text: "Status updated successfully!",
                    icon: "success",
                    position: "top-end",
                    timer: 3000,
                    showConfirmButton: false
                });
            },
            onError: (error) => {
                let errorMessage = "An error occurred!";
                if (typeof error === "object" && error !== null) {
                    errorMessage = Object.values(error).flat().join("\n");
                } else if (typeof error === "string") {
                    errorMessage = error;
                }
                Swal.fire({
                    toast: true,
                    title: "Error!",
                    text: errorMessage,
                    icon: "error",
                    position: "top-end",
                    showConfirmButton: false
                });
            }
        });
    } catch (error) {
        let errorMessage = "An error occurred!";
        if (typeof error === "object" && error !== null) {
            errorMessage = Object.values(error).flat().join("\n");
        } else if (typeof error === "string") {
            errorMessage = error;
        }
        Swal.fire({
            toast: true,
            title: "Error!",
            text: `Failed to update status! ${errorMessage}`,
            icon: "error",
            position: "top-end",
            showConfirmButton: false
        });
    }

};

export default Table;
