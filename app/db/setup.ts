
import { Client } from 'pg'

const client = new Client({
    connectionString: 'postgresql://root:0NU6wLvU6kcLNyukh7KGrWwY@alfie.iran.liara.ir:30930/postgres',
    database: 'survary'
})

client.connect()
.then(() => {
    console.log('DB CONNECTED')
})
.catch((error) => {
    console.log('ERROR IN CONNECTING')
    console.log(error)
})

export default client 

