import { NextRequest, NextResponse } from "next/server";

export default function (req: NextRequest, res: NextResponse) {
    if(req.method === 'POST'){
        // check the schema and put the data into the database 
    }
    else if(req.method === 'GET'){
        // return poll information
    }
    else if(req.method === 'DELETE'){
        // delete poll 
    }
}