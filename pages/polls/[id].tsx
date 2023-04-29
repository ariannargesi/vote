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
import { GetServerSidePropsContext } from "next/types"
import PollManager from "@/Managers/poll"
import ScoreManager from "@/Managers/score"
import UserManager from "@/Managers/user"
import { getServerSession } from "next-auth"
import authOption from "../api/auth/[...nextauth]"
import VoteManager from "@/Managers/vote"
import CommentSection from "@/features/CommentSection"

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
    options: string[],
    votesCount: number,
    results?: any
    userVote?: number
    data: string,
    anonymous?: boolean,
    location?: string,
    state?: string,
    userState: string | null 
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOption)
    if (!session)
        return {
            redirect: {
                destination: '/api/auth/signin',
                permenant: true
            }
        }
    let userId = (await UserManager.getUserData(session.user.email))?._id!
    const id = context.query.id as string
    const poll = await pollsCollection.findOne({ _id: new ObjectId(id) }) as Poll
    const { options, scores, _id, state } = await pollsCollection.findOne({ _id: new ObjectId(id) }) as Poll
    const pollScore = calculateScore(scores)
    const userScoreDir = await ScoreManager.getUserScoreDir(new ObjectId(id), userId) as Operator
    const votesCount = await VoteManager.getVotesCount(_id)
    const userState = await UserManager.getState(userId) 
    console.log('serverProps: ')
    console.log(userState
        )
    const props: Props = {
        options,
        votesCount: votesCount,
        data: JSON.stringify(poll),
        pollId: _id.toString(),
        pollScore,
        state,
        userState: userState || null 
    }

    if (userScoreDir)
        props.userScoreDir = userScoreDir

    const alreadyVoted = (await PollManager.alreadyVoted(poll._id, userId))
    if (typeof alreadyVoted === 'number') {
        props.results = await VoteManager.getPollResult(_id)
        props.userVote = alreadyVoted
    }
    return {
        props
    }
}

export function Description(props: { content: string }) {

    if (!props.content)
        return null

    return (
        <div>
            {props.content.split('\n').map(currentItem => (
                <p>
                    {currentItem}
                </p>
            ))
            }
        </div>
    )


}

export default function Page(props: Props) {
    
    useAuth()
    const poll = JSON.parse(props.data) as Poll
    
    return (
        <div>
            <main className="max-w-3xl mx-auto flex flex-col h-full">
                <div className="overflow-y-auto">
                    <Vstack gap="md">
                        <div>
                            <TitleLarge content={poll.title} />
                            <div className="flex justify-between gap-x-4 mt-1">
                                <Description content={poll.caption} />
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
                            userState={props.userState}
                            options={props.options}
                            pollState={props.state ? props.state : null}
                            votesCount={props.votesCount}

                        />
                        <VoteMeta
                            ananymous={true}
                            state={props.state}
                            createdAt={new Date()}
                            creatorId={'adsfadsfs'}

                        />
                        <CommentSection pollId={props.pollId} />
                    </Vstack>
                </div>
                <footer className="pt-2">
                    <NewComment
                        pollId={props.pollId}
                    />
                </footer>
            </main>
        </div>
    )
}