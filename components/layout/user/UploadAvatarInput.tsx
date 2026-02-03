'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRef } from "react"
import { generateCloudinarySignatureAction } from "@/lib/server/cloudinaryUpload"
import EditProfileModal from "./EditProfileModal"
import { getUserSession } from "@/lib/server/getUserSession"
import { updateUserAvatar, updateUserName } from "@/lib/server/prisma.actions"
import { useAccountModal, useEditProfileModal } from '@/context/ModalContext'
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/client/auth.client"


export default function UploadAvatarInput() {
    const [file, setFile] = useState<File | null>(null)
    const [fileSizeInMB, setFileSizeInMB] = useState<number | null>(null)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { setIsOpen: EditModal } = useEditProfileModal()
    const { setIsOpen: AccountModal } = useAccountModal()
    const router = useRouter()
    const { refetch } = authClient.useSession()
    const [newName, setNewName] = useState<string>("")

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const HandleBrowserClick = () => {
        fileInputRef.current?.click()
    }


    //chnage name input
    const HandleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value
        setNewName(value)
    }

    //upload file
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setFile(file)

        const fileSizeInMB = file.size / (1024 * 1024)
        setFileSizeInMB(fileSizeInMB)
    }


    //submit chnageProfile form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUploading(true)

        // update if only name changed
        if (newName) {
            await updateUserName(newName)
            await refetch()
            toast.success("Profile updated successfully")
            EditModal(false)
            AccountModal(false)
            router.refresh()
        }

        if (file) {
            try {
                const session = await getUserSession()
                if (!session?.user?.id) throw new Error("User not authenticated")

                const signatureResult = await generateCloudinarySignatureAction()

                const formData = new FormData()
                formData.append("file", file as File)
                if (signatureResult.tags) formData.append("tags", signatureResult.tags)
                formData.append("api_key", signatureResult.apiKey)
                formData.append("timestamp", `${signatureResult.timestamp}`)
                formData.append("signature", signatureResult.signature)
                if (signatureResult.folder) formData.append("folder", signatureResult.folder)

                const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureResult.cloudName}/image/upload`

                const uploadResponse = await fetch(uploadUrl, { method: "POST", body: formData })
                const uploadResult = await uploadResponse.json()

                if (!uploadResponse.ok) {
                    console.error("Cloudinary error payload:", uploadResult)
                    throw new Error(uploadResult?.error?.message ?? "Upload failed")
                }

                let uploadedImageUrl = uploadResult.secure_url
                setAvatarUrl(uploadResult.secure_url)



                // update if only avatar uploaded
                if (uploadedImageUrl) {
                    await updateUserAvatar(session.user.id, uploadedImageUrl)
                }

                await refetch()
                toast.success("Profile updated successfully")
                EditModal(false)
                AccountModal(false)
                router.refresh()



            } catch (error: any) {
                console.error("Upload error:", error.message)
                toast.error(error.message)
            } finally {
                setIsUploading(false)
            }
        }
    }

    if (!isMounted) {
        return null
    }

    const defaultAvatar = 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1vZGVsfGVufDB8fDB8fHww'

    return (
        <>
            <form onSubmit={handleSubmit} className='w-80 md:w-96 p-6 left-1/2 -translate-x-1/2 top-80 -translate-y-1/2 absolute bg-white z-50 rounded-md shadow-lg'>
                <EditProfileModal HandleName={HandleName} />

                <div className='flex flex-col mt-10 my-6'>
                    <div className="flex items-center gap-6 mb-4">
                        <Image
                            src={avatarUrl || defaultAvatar}
                            width={80}
                            height={80}
                            alt="avatar_preview"
                            className="md:w-20 md:h-20 w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 mb-1">Profile Picture</h2>
                            <p className="text-xs text-gray-500 mb-3">JPG, PNG or AVIF. Max size 2MB.</p>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={HandleBrowserClick}
                                    className={`px-4 py-2 text-sm font-medium rounded-md cursor-pointer ${file ? "bg-gray-800 border cursor-default" : "bg-black text-white"} transition-colors`}
                                >
                                    Choose file
                                </button>
                                <input
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    name="avatar"
                                    type="file"
                                    accept="image/jpeg,image/png,image/avif"
                                />
                            </div>
                            {fileSizeInMB && (
                                <span className="text-sm text-gray-600">
                                    {file?.name}: {fileSizeInMB.toFixed(2)}MB
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end gap-3 pt-2'>
                    <button
                        onClick={() => EditModal(false)}
                        type='button'
                        className='px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        disabled={isUploading}
                        className='px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50'
                    >
                        {isUploading ? 'Uploading...' : 'Save changes'}
                    </button>
                </div>
            </form>
        </>
    )
}