import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ToggleTheme() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <div
        onClick={() => setDark(!dark)}
        className="relative w-16 h-8 bg-gray-300 dark:bg-[gradient-to-r from-gray-200 via-white to-gray-100] rounded-full cursor-pointer transition-all duration-300 flex items-center"
    >
        {/* Toggle Circle */}
        <div
            className={`absolute flex items-center justify-center bg-white dark:bg-black w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ${
                dark ? "translate-x-8" : "translate-x-1"
            }`}
        >
            {/* Single Dynamic Icon */}
            <FontAwesomeIcon
                icon={dark ? faMoon : faSun}
                className={`transition-all duration-300 ${
                    dark ? "text-gray-200 rotate-0" : "text-yellow-500 rotate-180"
                }`}
                size="lg"
            />
        </div>
    </div>
    );
}
