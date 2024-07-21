import {NextApiRequest,NextApiResponse} from "next";
import {prisma} from "@/utils/_db_orm.js"
import {User} from "@prisma/client";
import decodeToken from "@/utils/decodeToken";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    let user:User|undefined = await decodeToken(req,res);
    if(req.method === "GET"){
        try {
            let finance = await prisma.finance.groupBy({
                by: "category",
                _sum: {
                    amount: true
                },
                where: {
                    userId: user?.id
                }
            })

            return res.status(200).json({finance:finance});
        }
        catch(err) {
            return res.status(500).json({finance:[]});
        }

    }
}