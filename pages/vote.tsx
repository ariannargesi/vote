import { Paraphgraph, TitleLarge } from "@/features/Typography";
import mock from "../mock";
import Points from "@/component/Point/Points";
import { Hstack, Vstack } from "@/features/Common";
import VoteMeta from "@/features/VoteMeta";
import Paper from "@/features/Paper";
import Avatar from "@/features/Avatar";
import CommentSection from "@/features/CommentSection";
import { Textarea } from "@/features/form";
import NewComment from "@/features/CommentSection/NewComment";

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