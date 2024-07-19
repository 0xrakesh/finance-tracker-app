import { handleAuth, handleCallback, getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { storeCreds } from "@/utils/storeCreds";
import cookie from 'cookie';

export default handleAuth({
    callback: async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            // Handle the Auth0 callback
            await handleCallback(req, res);

            // Get the session after successful authentication
            const session = await getSession(req, res);
            if (session) {
                // Store user credentials and get an ID
                const id = await storeCreds(session.user);
            }

        } catch (error) {
            console.error(error);
            res.status(500).end('Authentication callback error');
        }
    },
});
