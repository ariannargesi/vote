import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server';

const typeDefs = `#graphql
    type Message {
        content: String,
        author: String
    }

    type Mutation { 
        createMessage(content: String, author: String)
    }


`
const messages = [
    {
      content: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      content: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const resolvers = {
    // write query to database here 
    Query: {
        messages: () => messages
    },
    Mutations: {
      createMessage: (_, __, ___) => {
        console.log('_ ', _)
        console.log('__ ', __)
        console.log('___ ', ___)
      }
    }
  }

  const server = new ApolloServer({
      typeDefs,
      resolvers
  })    
  
  const handler = startServerAndCreateNextHandler<NextRequest>(server);

  export async function GET(request: NextRequest) {
   
    return handler(request);
  }
  
  export async function POST(request: NextRequest) {
    return handler(request);
  }