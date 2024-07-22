import {prisma} from "@/utils/_db_orm.js"
import jwt from "jsonwebtoken";

export default async function decodeToken(token:string|undefined) {
    let secret = process.env.SECRET || '';
    if(!token) return {status:false};
    try {
        let decode:any = jwt.verify(token, secret);
        let user = prisma.user.findFirst({
            where: {
                id: decode?.userId
            }
        })
        return{status:true,user:decode};
    }
    catch(err) {
        return {status:false};
    }
}