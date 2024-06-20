import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-gray-900 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent text-blue-500"
                                        : "block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
                                }
                            >
                                Deltagere
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Discipliner"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent text-blue-500"
                                        : "block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
                                }
                            >
                                Discipliner
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/addDeltager"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent text-blue-500"
                                        : "block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
                                }
                            >
                                Tilføj deltager
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/addDisciplin"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 md:p-0 bg-blue-700 rounded md:bg-transparent text-blue-500"
                                        : "block py-2 px-3 md:p-0 rounded md:hover:bg-transparent md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white border-gray-700"
                                }
                            >
                                Tilføj Disciplin
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
