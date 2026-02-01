'use client'

import { authClient } from '@/lib/client/auth.client'
import UserAvatar from '@/components/ui/user/UserAvatar'

type UserAvatarProps = {
    setIsAccountModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserAvatarClient({ setIsAccountModalOpen }: UserAvatarProps) {
    const { data: session } = authClient.useSession()

    if (!session) return null

    return <UserAvatar key={session.user?.image} imageUrl={session.user?.image ??
        "https://images.unsplash.com/photo-1613005798967-632017e477c8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1vZGVsfGVufDB8fDB8fHww"} setIsAccountModalOpen={setIsAccountModalOpen} />
}
