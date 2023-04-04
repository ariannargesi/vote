import { Paraphgraph, TitleLarge } from "@/component/Typography";
import mock from "../mock";
import Points from "@/component/Points";
import { Hstack, Vstack } from "@/component/Common";
import VoteMeta from "@/component/VoteMeta";
import Paper from "@/component/Paper";
import Avatar from "@/component/Avatar";
import CommentSection from "@/component/CommentSection";
import { Textarea } from "@/component/form";
import NewComment from "@/component/CommentSection/NewComment";

export default function Vote() {
    return (
        <main className="max-w-3xl mx-auto flex flex-col h-full">
            <div className="overflow-y-auto">
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
                    <CommentSection />
                </Vstack>
            </div>
            <footer className="pt-2">
                <NewComment/>
            </footer>
        </main>
    )
}