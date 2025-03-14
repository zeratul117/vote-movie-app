import Link from 'next/link'
import { FilmIcon } from 'lucide-react';

export default function Header() {
    return (
        <header className="textColor mx-auto flex items-center justify-between p-6 lg:px-8 bg-[#030f46] rounded-md" aria-label="Global"> 
            <Link href="/" className="text-xl font-bold">
                <FilmIcon />
            </Link>
            <Link href="/" className="text-xl font-bold">
                <h2>Add and Vote for movies!</h2>
            </Link>
            <Link href="/add" className="text-xl font-light">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add a Movie</span>
            </Link>
        </header>
    )
}