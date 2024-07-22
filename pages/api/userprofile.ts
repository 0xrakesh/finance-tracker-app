import {NextApiRequest, NextApiResponse} from "next";
import {getSession} from "@auth0/nextjs-auth0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        const session = await getSession(req,res);
        if(!session) return res.status(401).json({status:false});
        else return res.status(200).json({status:true,user:session.user});
    }
}