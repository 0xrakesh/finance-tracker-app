import {NextApiRequest,NextApiResponse} from "next";
import {prisma} from "@/utils/_db_orm.js"
import decodeToken from "@/utils/decodeToken";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    let user:any = await decodeToken(req.headers.authorization);
    if(req.method === "GET"){
        try {
            let finance = await prisma.finance.groupBy({
                by: "category",
                _sum: {
                    amount: true
                },
                where: {
                    userId: user?.user.id
                }
            })

            return res.status(200).json({finance:finance});
        }
        catch(err) {
            return res.status(500).json({finance:[]});
        }

    }
}