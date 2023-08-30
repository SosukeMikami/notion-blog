import React from "react";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="container mx-auto lg:px-2 px-5 lg:w-2/5 flex justify-between items-center h-16">
            <div>
                <Link href="#" className="text-xl font-bold">Slincode</Link>
            </div>
            <ul className="flex gap-2">
                <li><Link href="#">Twitter</Link></li>
                <li><Link href="#">HP</Link></li>
                <li><Link href="#">Github</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
