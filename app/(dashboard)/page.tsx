import getFeedPosts from "@/actions/posts/read/get-feed-posts";
import ErrorContainer from "@/components/general/error-container";
import PostContainer from "@/components/posts/post-container";
import PostForm from "@/components/posts/post-form";

const Home = async () => {
    const data = await getFeedPosts();

    const posts = data.posts;

    if (data.error) return <ErrorContainer error={data.error} />;
    if (!posts) return <ErrorContainer error="An error has occurred while fetching your feed" />;

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold">Home</h1>
                <div className="text-gray-500 flex flex-col gap-1">
                    <p>
                        Welcome to your feed! Here you can see posts of your friends and create your own posts to share
                        with others.
                    </p>
                    <p>
                        To create a post, simply type out your thoughts in the input below and click the "Post" button.
                        Feel free to add images to your posts as well!
                    </p>
                    {posts.length <= 0 && <p>It looks like your feed is empty... How about adding a post?</p>}
                </div>
                <PostForm />
            </div>

            {posts.length > 0 && posts.map((post) => <PostContainer key={post.id} post={post} />)}
        </div>
    );
};

export default Home;
