import React from 'react'
import { Page, Header, Content } from '../cmp/shared/layouts'
import VerifyMessage from "./verify-message"

export default function Verify () {

    return (
        <Page>
            <Header title={'لینک تایید'}/>
            <Content extendClass="mt-64 p-2">
                <VerifyMessage />
            </Content>
        </Page>
    )
}