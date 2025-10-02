// Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Pokemon TCG</h1>
                        </div>

                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                            <Link to={"/sets"} className="text-gray-700 hover:text-blue-600">Sets</Link>
                            <Link to={"/series"} className="text-gray-700 hover:text-blue-600">Series</Link>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
                            </button>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
                        <Link to={"/sets"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sets</Link> |
                        <Link to={"/series"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Series</Link>
                    </div>
                )}
            </nav>
            <div className="h-16"></div>
            <Outlet />
        </>
    );
}


export default Navbar;