import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-auto shadow-sm dark:bg-gray-800 bg-[#010c40]">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="py-4 text-sm text-gray-500 sm:text-center textColor">© Luis Belis</span>
        <div className="flex space-x-4">
          <Link href="https://github.com/zeratul117" target="_blank">
            <FaGithub className="textColor" />
          </Link>
          <Link href="https://www.linkedin.com/in/luis-belis-755426186/" target="_blank">
            <FaLinkedin className="textColor" />
          </Link>
        </div>
      </div>
    </footer>
  );
}