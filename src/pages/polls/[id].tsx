import CommentSection from "@/component/CommentSection"
import NewComment from "@/component/CommentSection/NewComment"
import { Vstack } from "@/component/Common"
import Paper from "@/component/Paper"
import Points from "@/component/Points"
import { TitleLarge, Paraphgraph } from "@/component/Typography"
import VoteMeta from "@/component/VoteMeta"
import { polls as pollsCollection } from "@/db/setup"
import { useAuth } from "@/hooks/useAuth"
import { Poll } from "@/types"
import { ObjectId } from "mongodb"
import { useSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next/types"


export async function getServerSideProps (context: GetServerSidePropsContext) {
    const id =  context.query.id 
   
    const poll = await pollsCollection.findOne({_id: new ObjectId(id)}) as Poll 
    poll.options = poll.options.map(currentItem => {
        return { 
            title: currentItem.title
        }
    })
    
    return {
        props: {
            data: JSON.stringify(poll),
            id
        }
    }
}



export default function Page (props) {
    
    useAuth()
    const session = useSession()
    const poll = JSON.parse(props.data) as Poll 
    
    return (
        <div>
            {JSON.stringify(session)}
            <main className="max-w-3xl mx-auto flex flex-col h-full">
            <div className="overflow-y-auto">
                <Vstack gap="md">
                    <div>
                        <TitleLarge content={poll.title} />
                        <div className="flex justify-between gap-x-4">
                            <Paraphgraph content={poll.caption} />
                            <Points pollId={props.id} />
                        </div>
                    </div>
                    <Paper options={poll.options} pollId={props.id} />
                    {/* <VoteMeta 
                        ananymouse={poll.ananymouse} 
                        location={poll.location} 
                        createdDate={poll.createdAt}  
                        creatorID={poll.creatorID}
                    /> */}
                   
                    {/* <CommentSection /> */}
                </Vstack>
            </div>
            {/* <footer className="pt-2">
                <NewComment/>
            </footer> */}
        </main>
        </div>
    )
}