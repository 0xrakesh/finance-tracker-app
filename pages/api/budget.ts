import {NextApiRequest,NextApiResponse} from "next";
import {Budget} from "@prisma/client";
import {prisma} from "@/utils/_db_orm.js"

type ResponsePost = {
    status: string
}

type ResponseGet = {
    budget:Budget|null
}

let now:Date = new Date()
now = new Date(`${now.getFullYear()}-${now.getMonth()+1}-2`)

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponsePost|ResponseGet>) {
    if(req.method === "POST") {
        try {
            let budget:Budget = req.body;
            await prisma.budget.create({
                data: {
                    userId:6,
                    target: budget.target,
                    spent: budget.spent,
                    budgetDate: budget.budgetDate,
                }
            });
            res.status(200).json({status:"success"});
        }
        catch (err) {
            return res.status(500).json({status:"error"});
        }
    }
    else if(req.method=="GET") {
        try {
            let budget:Budget|null = await prisma.budget.findFirst({
                where: {
                    userId:6,
                    budgetDate: {
                        gte: now,
                    }
                }
            });
            return res.status(200).json({budget:budget});
        }
        catch(err) {
            return res.status(500).json({status:"error"})
        }
    }
}