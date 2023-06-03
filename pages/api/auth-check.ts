import { NextApiRequest, NextApiResponse } from "next";

/**
 * Authore: ariannargesi
 */
export default async function (req: NextApiRequest, res: NextApiResponse) {
    res.json({status: 'success'})
}