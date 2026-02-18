


import Header from '@/components/layout/Header'
import React from 'react'
import { prisma } from '@/lib/server/prisma'
import { getUserSession } from '@/lib/server/getUserSession'

export default async function layout({ children }: { children: React.ReactNode }) {

    const session = await getUserSession()
    const isAdmin = session?.user?.id
        ? await prisma.user.findUnique({
            where: { id: session.user.id },
        })
        : null



    return (
        <>
            <Header isUserAdmin={isAdmin?.role === 'admin'} />
            {children}
        </>
    )
}
