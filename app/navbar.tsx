'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
    const currentPath = usePathname();

    const links = [
        {
            label: "Dashboard",
            href: "/",
        },
        {
            label: "Issues",
            href: "/issues",
        },
    ]

    return (
        <nav className="flex space-x-6 border-b border-gray-300 mb-5 px-5 h-14 items-center">
            <Link href="/"><AiFillBug/></Link>
            <ul className="flex space-x-6">
                {links.map((link, index)  => 
                    <li key={index}>
                        <Link href={link.href} 
                            className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                        >
                            {link.label}
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
