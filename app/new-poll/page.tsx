import PollBuilder from "../cmp/poll-builder"
import FullScreen from "@/components/full-screen"
import { Header, Footer, Content, Page } from '@/pages/cmp'

export default function NewPoll() {
    
    return (
        <Page extraClasses="max-w-3xl mx-auto">
             <Header extraClasses="flex items-center justify-between" >
                <h1 className="text-xl font-bold">ایجاد رای‌گیری</h1>
                <FullScreen />
            </Header>
            <Content>
                <PollBuilder />
            </Content>
            <Footer>

            </Footer> 
        </Page>
    )
}