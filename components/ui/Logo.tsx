

import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: '400' })

export default function Logo() {
    return (
        <h1 className={`md:text-4xl text-3xl font-bold tracking-wide ${bebasNeue.className}`}>
            NIKKA
        </h1>
    )
}
