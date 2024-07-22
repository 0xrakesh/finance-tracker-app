import {prisma} from "@/utils/_db_orm.js"
import {User} from "@prisma/client"
import {Claims} from "@auth0/nextjs-auth0";

type StoreCredsProps = {
    nickname: string | null,
    name: string | null,
    picture: string | null,
    email: string | null
}

async function storeCreds(creds: Claims | undefined) {
    if(!creds) return ;
    try {
        let user:User|null = await prisma.user.findFirst({
            where: {email: creds.email}
        })
        console.log("User ",user)
        if(user) return user.id;
        await prisma.user.create({
            data: {
                name: creds.name,
                email: creds.email,
                image: creds.picture
            }
        })
        user = await prisma.user.findFirst({
            where: {email: creds.email}
        })
        console.log(user)
        if(!user) return
        return user.id;
    }
    catch(err) {
        return;
    }
}

export {storeCreds}