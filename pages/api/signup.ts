import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/utils/_db_orm.js";

export default async function handler(request: NextApiRequest, res: NextApiResponse) {
    if(request.method === "POST") {
        const {name, email, password} = request.body;
        if(!email || !name || !password || !password.length) { return res.status(401).json({status:"invalid"})}

        let user = await prisma.user.findFirst({
            where: {
                email:email
            }
        });
        if(user) return res.status(401).json({status:"invalid"});
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                image: ""
            }
        }).then(() => {return res.status(200).json({status:"success"})})
            .catch(err => res.status(500).json({status:"error"}));
    }
}