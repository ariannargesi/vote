import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server';

const typeDefs = `#graphql
    type Book {
        title: String,
        author: String
    }

    type Query { 
        books: [Book]
    }

`
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const resolvers = {
    Query: {
        books: () => books 
    }
  }

  const server = new ApolloServer({
      typeDefs,
      resolvers
  })    
  
  const handler = startServerAndCreateNextHandler<NextRequest>(server);

  export async function GET(request) {
    console.log('afadsf')
    return handler(request);
  }
  
  export async function POST(request) {
    return handler(request);
  }