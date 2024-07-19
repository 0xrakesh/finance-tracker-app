import {User} from '@prisma/client'
import {NextApiRequest,NextApiResponse} from "next";
import {prisma} from "@/utils/_db_orm.js"

type UserInterface = {
    id: number,
    name: string,
    email: string,
    password: string,
    phone:string|undefined,
    image:string
}

type ResponseGetType = {
    users: UserInterface[]
}

type ResponsePostType = {
    status: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseGetType|ResponsePostType>) {
    let token = req.cookies
    console.log(token);
    if(req.method=="GET") {
        let users: User[] = await prisma.user.findMany();
        let modified: { phone: string|undefined }[] =  users.map((user:User) => ({
            ...user,
            phone: user.phone?.toString()
        }))
        // @ts-ignore
        return res.status(200).json({users:modified});
    }
    else if(req.method=="POST") {
        let user:User = req.body;
        await prisma.user.create({
            data: {
                name:user?.name,
                email:user?.email,
                phone:user?.phone,
                password:user?.password,
                image: ""
            }
        })
        return res.status(200).json({status:"success"});
    }
}
