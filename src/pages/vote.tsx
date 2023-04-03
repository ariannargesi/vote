import { Paraphgraph, TitleLarge } from "@/component/Typography";
import mock from "../mock";
import Points from "@/component/Points";
import { Hstack, Vstack } from "@/component/Common";
import VoteMeta from "@/component/VoteMeta";
import Paper from "@/component/Paper";
import Avatar from "@/component/Avatar";

export default function Vote(props) {
    return (
        <main className="max-w-3xl mx-auto">
            <Vstack gap="md">
            <div>
                <TitleLarge content={mock.vote.title} />    
                <div className="flex justify-between gap-x-4">
                    <Paraphgraph content={mock.vote.caption} />
                    <Points />
                </div>
            </div>
            <VoteMeta data={mock.vote.meta} />
            <Paper options={mock.vote.options} />
            <Hstack>
                <Avatar src={mock.vote.meta.avatar} />
                <Vstack>
                    <span>{mock.vote.meta.from}</span>
                    <span className="text-sm text-gray-500">ایجاد شده در:{mock.vote.meta.createdAt.toLocaleDateString()}</span>
                </Vstack>
            </Hstack>
            </Vstack>
        </main>
    )
}