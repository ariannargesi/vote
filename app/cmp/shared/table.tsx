import React, { ReactNode } from 'react'

type Column = { head: ReactNode, rows: ReactNode[] }

type TableProps = {
    data: Column[]
    rowCount?: boolean
}

export default function Table (props: TableProps) {

    const { data, rowCount } = props
    

    const heads = []

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>    
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>        
        </table>
    )
}           