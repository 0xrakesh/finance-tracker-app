import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/utils/_db_orm.js"
import {User} from "@prisma/client";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method=="POST") {
        let {email, password} = req.body;
        console.log(email,password);
        let user:User|null = await prisma.user.findFirst({
            where: {email:email}
        });
        if(!user) return res.status(401).json({token:""});
        if(user.password===password) {
            let token = jwt.sign({
                userId: user.id,
                name: user.name,
            },"SuperK3yOfFinance", {expiresIn: "1d"});
            return res.status(200).json({token:token});
        }
        return res.status(404).json({token:""});
    }
}