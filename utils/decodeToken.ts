import {getSession} from "@auth0/nextjs-auth0";
import {prisma} from "@/utils/_db_orm.js"
import {NextApiRequest,NextApiResponse} from "next";

export default async function decodeToken(req:NextApiRequest, res:NextApiResponse) {
    let session = await getSession(req,res);

    if(!session || !session?.user) return;
    try {
        let token = session?.user;
        let user = await prisma.user.findFirst({
            where: {email:token?.email}
        })
        if(!user) return;
        return user;
    }
    catch(err) {
        return
    }
}