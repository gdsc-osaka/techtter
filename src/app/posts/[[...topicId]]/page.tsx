import {PostQueryService} from "@/infrastructure/post/postQueryService";
import {Timestamp} from "firebase/firestore";
import PostItem from "@/components/postItem";

const postQueryService = new PostQueryService();

interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage(props: Props) {
    const posts = await postQueryService.findManyByTopic({
        id: 'react',
        name: 'React',
        left: 0,
        right: 50,
        icon_path: undefined,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now()
    });

    return (
        <>
            {posts.map((post) => (
                <PostItem post={post} key={post.id}/>
            ))}
        </>
    );
}
