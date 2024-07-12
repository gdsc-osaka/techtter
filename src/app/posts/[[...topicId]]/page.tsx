import {Topic} from "@/domain/topic";
import {Timestamp} from "firebase/firestore";
import TopicItem from "@/components/topicItem";
import TopicSideMenu from "@/components/topicSideMenu";

interface Props {
    params: {
        topicId: string[];
    }
}

function topicFactory(topic: Pick<Topic, "id" | "name" | "left" | "right">): Topic {
    return {
        ...topic,
        icon_path: undefined,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    }
}

export default function PostListPage(props: Props) {
    const topics: Topic[] = [
        topicFactory({
            id: "front-end",
            name: "Front End",
            left: 0,
            right: 100,
        }),
        topicFactory({
            id: "react",
            name: "React",
            left: 0,
            right: 50,
        }),
        topicFactory({
            id: "remix",
            name: "Remix",
            left: 0,
            right: 10,
        }),
        topicFactory({
            id: "next",
            name: "Next.js",
            left: 50,
            right: 100,
        }),
        topicFactory({
            id: "back-end",
            name: "Back End",
            left: 100,
            right: 200,
        }),
    ]

    return (
        <div className={"flex flex-row"}>
            <TopicSideMenu topics={topics}/>
            <main className={"w-full"}>
                PostListPage
            </main>
        </div>
    )
}
