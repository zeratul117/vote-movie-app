import Link from 'next/link'
import { FilmIcon } from 'lucide-react';

export default function Header() {
    return (
        <header className="textColor mx-auto flex items-center justify-between p-6 lg:px-8 bg-[#030f46] rounded-md" aria-label="Global"> 
            <Link href="/" className="text-xl font-bold">
                <FilmIcon />
            </Link>
            <Link href="/" className="text-xl font-bold ">
            <div className="flex items-center">
                <h2 className="text-sm md:text-lg font-bold">
                    Add and Vote for movies!
                </h2>
            </div>
            </Link>
            <Link href="/add" className="text-xl font-light">
                <div className="flex items-center">
                    <span className="hidden md:inline font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        Add a Movie
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="inline md:hidden size-6 "
                    >
                        <path
                        stroke="url(#gradient)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: '#38bdf8' }} /> {/* from-sky-400 */}
                                <stop offset="100%" style={{ stopColor: '#059669' }} /> {/* to-emerald-600 */}
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </Link>
        </header>
    )
}