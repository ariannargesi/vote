// 'use client'
import client from '../../db-setup'

import { useQuery, gql } from '@apollo/client';


const GET_LOCATIONS = gql`

  query GetLocations {

    books {

      title

    }

  }

`;
  export default  function App () {
    // const result = await client.query('SELECT $1::text as message')
    return (
        'adfds'
        // <div>Hello</div>
    )
    
  }