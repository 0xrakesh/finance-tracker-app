import type{NextApiRequest, NextApiResponse} from "next";

type Data = {
    message:string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(req.method=="GET") {
        res.status(200).json({ message: 'Thank you for the click!'});
    }
}