import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex space-x-6 border-b border-gray-300 mb-5 px-5 h-14 items-center">
            <Link href="/">Logo</Link>
            <ul className="flex space-x-6">
                <li>
                    <Link href="/">Dahsboard</Link>
                </li>
                <li>
                    <Link href="/issues">Issues</Link>
                </li>
            </ul>
        </nav>
    )
}
