import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        let token = req.headers.authorization;
        let secret = "SuperK3yOfFinance";
        if(!token) return res.status(401).json({user:false});
        try {
            let decode = jwt.verify(token, secret);
            return res.status(200).json({user:true});
        }
        catch(err) {
            res.status(401).json({user:false});
        }
    }
}