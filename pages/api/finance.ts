import {NextApiRequest,NextApiResponse} from "next";
import {Finance} from "@prisma/client";
import {prisma} from "@/utils/_db_orm.js";
import decodeToken from "@/utils/decodeToken";
import {User} from "@prisma/client"

type ResponsePost = {
    status: string;
}

type Error = {
    error:any
}

type ResponseGet = {
    finance: Finance[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponsePost|ResponseGet|Error>) {
    let user:User|undefined = await decodeToken(req,res);
    if(!user) return res.status(404).json({status:"User not found"});
    if(req.method === "POST") {
        let finance:Finance = JSON.parse(req.body);
        try {
            await prisma.finance.create({
                data: {
                    userId: user?.id,
                    purpose: finance.purpose,
                    category: finance.category,
                    amount: finance.amount,
                    transactionDate: new Date(finance.transactionDate)
                }
            })
            res.status(200).json({status:"success"});
        }
        catch(err) {
            return res.status(500).json({status:"error",error:err});
        }
    }
    else if(req.method=="GET") {
        try {
            let finance:Finance[] = await prisma.finance.findMany({
                where:{
                    userId:user?.id
                }
            })
            res.status(200).json({finance:finance});
        }
        catch(err) {
            console.log(err)
            return res.status(500).json({status:"error",error:err});
        }
    }
}