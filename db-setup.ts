
import { Client } from 'pg'

const client = new Client({
    connectionString: 'postgresql://root:L6qAtVeMuW75AmQfNLvhzelE@alfie.iran.liara.ir:32796/postgres'
})

export default client 

