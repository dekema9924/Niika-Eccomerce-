

import { Bebas_Neue } from 'next/font/google'
import Link from 'next/link'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' })

export default function Logo() {
    return (
        <Link href={'/'} className={`md:text-4xl text-3xl font-bold tracking-wide ${bebasNeue.className}`}>
            NIKKA
        </Link>
    )
}
