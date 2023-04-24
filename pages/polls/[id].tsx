import CommentSection from "@/features/CommentSection"
import NewComment from "@/features/CommentSection/NewComment"
import { Vstack } from "@/features/Common"
import Paper from "@/features/Paper"
import Points from "@/features/Score"
import { TitleLarge, Paraphgraph } from "@/features/Typography"
import VoteMeta from "@/features/VoteMeta"
import { polls as pollsCollection, users } from "@/db/setup"
import { useAuth } from "@/hooks/useAuth"
import { Operator, Poll, Score } from "@/types"
import { ObjectId } from "mongodb"
import { useSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next/types"
import PollManager from "@/Managers/poll"
import ScoreManager from "@/Managers/score"
import UserManager from "@/Managers/user"
import { getServerSession } from "next-auth"
import authOption from "../api/auth/[...nextauth]"
import VoteManager from "@/Managers/vote"

function calculateScore(scores: Score[]) {
    let score = 0
    scores.forEach(currentItem => {
        if (currentItem.operator === Operator.Plus)
            score++
        else score--
    })
    return score
}

type Props = {
    pollId: string, 
    pollScore: number,
    userScoreDir?: Operator,
    options: string [],
    votesCount: number,
    results?: any
    userVote?: number 
    data: string 
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    
    const session = await getServerSession(context.req, context.res, authOption)
    if (!session)
        return {
            redirect: {
                destination: '/login',
                permenant: true
            }
        }
    let userId = (await UserManager.getUserData(session.user.email))?._id!
    const id = context.query.id as  string 
    const poll = await pollsCollection.findOne({ _id: new ObjectId(id) }) as Poll
    const { options, scores, _id} = await pollsCollection.findOne({ _id: new ObjectId(id) }) as Poll
    const pollScore = calculateScore(scores)
    const userScoreDir = await ScoreManager.getUserScoreDir(new ObjectId(id), userId) as Operator
        const votesCount = await VoteManager.getVotesCount(_id)
    
    const props: Props = {
        options, 
        votesCount: votesCount, 
        data: JSON.stringify(poll),
        pollId: _id.toString(),
        pollScore
    }

    if(userScoreDir)
        props.userScoreDir = userScoreDir

    const alreadyVoted = (await PollManager.alreadyVoted(poll._id, userId))
    if(typeof alreadyVoted === 'number'){
        props.results = await VoteManager.getPollResult(_id)
        props.userVote = alreadyVoted
    }
    return {
        props 
    }
}



export default function Page(props: Props) {

    useAuth()
    const session = useSession()
    const poll = JSON.parse(props.data) as Poll

    return (
        <div>
            <main className="max-w-3xl mx-auto flex flex-col h-full">
                <div className="overflow-y-auto">
                    <Vstack gap="md">
                        <div>
                            <TitleLarge content={poll.title} />
                            <div className="flex justify-between gap-x-4">
                                <Paraphgraph content={poll.caption} />
                                <Points
                                    pollId={props.id}
                                    score={props.pollScore}
                                    scoreDir={props.scoreDir}
                                />
                            </div>
                        </div>
                        <Paper 
                            pollId={props.pollId} 
                            results={props.results}
                            userVote={props.userVote}
                            options={props.options} 
                            votesCount={props.votesCount}
                            
                        />
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
            </footer>  */}
            </main>
        </div>
    )
}