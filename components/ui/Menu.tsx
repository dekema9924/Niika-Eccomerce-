

import { Dispatch, SetStateAction } from "react"

type MenuProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
    return (
        <div className='cursor-pointer'>
            <span
                className={`border-b block w-6 h-1 transition-transform duration-500 
                 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}
            />
            <span
                className={`border-b block w-6 h-2 transition-transform duration-500 
                 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}
            />

        </div>
    )
}
