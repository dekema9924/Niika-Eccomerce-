'use client'

import { useEffect, useState } from 'react'
import UserAvatarClient from './UserAvatarClient'
import { getUserSession } from '@/lib/server/getUserSession'

type UserAvatarProps = {
    setIsAccountModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
};

export default function UserAvatar({ setIsAccountModalOpen }: UserAvatarProps) {
    const [imageUrl, setImageUrl] = useState(
        "https://images.unsplash.com/photo-1613005798967-632017e477c8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1vZGVsfGVufDB8fDB8fHww"
    )

    useEffect(() => {
        getUserSession().then((session) => {
            if (session?.user?.image) {
                setImageUrl(session.user.image)
            }
        })
    }, [])

    return <UserAvatarClient imageUrl={imageUrl} setIsAccountModalOpen={setIsAccountModalOpen} />
}