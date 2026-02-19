

import AdminHeader from '@/components/layout/admin/AdminHeader'
import React from 'react'
import { getUserSession } from '@/lib/server/getUserSession'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/server/prisma'


export default async function layout({ children }: { children: React.ReactNode }) {

    const session = await getUserSession()
    // Check if user is logged in
    if (!session?.user?.id) {
        redirect('/auth/signin?redirect=/admin')
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { role: true }
    })

    if (user?.role !== 'admin') {
        redirect('/unauthorized')
    }


    return (
        <>
            {children}
        </>
    )
}
