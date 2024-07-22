import {NextRequest,NextResponse} from "next/server";
import { getSession } from '@auth0/nextjs-auth0';
import {prisma} from "@/utils/_db_orm.js"

export default async function handler(request: NextRequest, response: NextResponse) {
    let user = await getSession();
    console.log(user);
}