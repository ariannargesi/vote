import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import { IncomingForm } from 'formidable';
import fs, { read } from 'fs'
import { log } from 'console';

type ReponseType = {
    
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default function handler( req: NextApiRequest, res: NextApiResponse<ReponseType>) {
      
    const form = new IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({ error: 'There was an error processing the request.' });
            return;
          } 
        

        const basePath = '../../uploads/'
        fs.writeFileSync(basePath+'hello.txt', 'fdafdsfadsf' )
    })  
}