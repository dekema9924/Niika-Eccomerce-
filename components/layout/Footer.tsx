import Logo from '../ui/Logo'
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Youtube } from 'lucide-react';




export default function Footer() {
    return (
        <footer className='bg-black text-white flex flex-col items-center justify-center gap-4 pt-10'>
            <Logo />
            <ul className='flex gap-3'>
                <li><Instagram /></li>
                <li><Twitter /></li>
                <li><Facebook /></li>
                <li><Linkedin /></li>
                <li><Youtube /></li>
            </ul>
            <p className="text-center p-4 text-gray-400">© {new Date().getFullYear()} YourCompany. All rights reserved.</p>

        </footer>
    )
}
