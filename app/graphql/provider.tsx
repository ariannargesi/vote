'use client'

import React, { ReactNode } from 'react'



import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({

  uri: 'https://flyby-router-demo.herokuapp.com/',

  cache: new InMemoryCache(),

});


export default function App (props) {
    return (
        <>
            <ApolloProvider client={client}>
                {props.children}
            </ApolloProvider>
        </>
    )
}