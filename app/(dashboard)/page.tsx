import getAllPosts from "@/actions/posts/read/get-all-posts";
import PostForm from "@/components/posts/post-form";
import PostsList from "@/components/posts/posts-list";

const Home = async () => {
    const data = await getAllPosts();

    const posts = data.posts;

    if (data.error) return <h1>Error loading posts: {data.error}</h1>;
    if (!posts) return <h1>Couldn't load posts</h1>;

    return (
        <>
            <h1>house page</h1>

            <PostForm />
            <PostsList posts={posts} />
        </>
    );
};

export default Home;
