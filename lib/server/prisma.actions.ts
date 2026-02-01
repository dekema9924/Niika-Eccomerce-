

'use server'
import { prisma } from '@/lib/server/prisma'
import { getUserSession } from './getUserSession'









//update avatar
export const updateUserAvatar = async (userId: string, imageUrl: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { image: imageUrl },
    })

}



//update name
export const updateUserName = async (name?: string) => {
    const session = await getUserSession()

    const updateName = await prisma.user.update({
        where: { id: session?.user.id },
        data: { name: name },
    })

    return updateName
}