

import Image from 'next/image'

type UserAvatarClientProps = {
    imageUrl: string;
    setIsAccountModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
};

export default function UserAvatarClient({ imageUrl, setIsAccountModalOpen }: UserAvatarClientProps) {
    return (
        <div
            onClick={() => setIsAccountModalOpen && setIsAccountModalOpen(true)}
            className=""
        >
            <Image
                src={imageUrl}
                width={100}
                height={100}
                alt="userAvatar"
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
            />
        </div>
    )
}