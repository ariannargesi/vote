// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri, options)
clientPromise = client.connect()

// collections 
const db = client.db('my-app')

export const users = db.collection('users')

clientPromise.then(() => console.log('connected'))
.catch(err => console.log('err')
)

export default clientPromise