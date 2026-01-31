import { signOut } from "@/lib/server/auth.actions"
import toast from "react-hot-toast"
import { LogOut } from "lucide-react"

export default function LogoutButton() {

    const HandleSignOut = async () => {
        const res = await signOut()
        if (res.success) {
            window.location.href = '/'
            toast.success("signed out successfully")
        } else {
            toast.error("failed to sign out")
        }
    }

    return (
        <>
            <button onClick={() => HandleSignOut()} className='font-bold flex items-center text-red-200 cursor-pointer bg-red-600 rounded-md border-t border-white justify-between w-full p-2'>Logout<LogOut /></button>

        </>
    )
}
