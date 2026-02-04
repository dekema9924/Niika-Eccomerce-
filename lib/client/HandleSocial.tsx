import { SocialSignin } from "../server/auth.actions"


export const HandleSignInWithSocial = async (provider: string) => {
    let res = await SocialSignin(provider)
    if (res.data?.url) {
        window.location.href = res.data.url
    }
}