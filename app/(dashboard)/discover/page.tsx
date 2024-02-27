import getDiscoveryPosts from "@/actions/posts/read/get-discovery-posts";
import PostContainer from "@/components/posts/post-container";
import Link from "next/link";

const DiscoverPage = async () => {
    const data = await getDiscoveryPosts();

    const posts = data.posts;

    if (data.error) return <h1>Error loading posts: {data.error}</h1>;
    if (!posts) return <h1>Couldn't load posts</h1>;

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold">Discover</h1>
                <div className="text-gray-500 flex flex-col gap-1">
                    <p>Welcome to the discovery page! Here you can see posts of users you aren't friends with.</p>

                    {posts.length <= 0 && (
                        <p>
                            It looks like there are no posts to show here... Click{" "}
                            <Link
                                className="
                            text-blue-500 hover:underline
                            "
                                href="/"
                            >
                                here
                            </Link>{" "}
                            to visit your feed instead.
                        </p>
                    )}
                </div>
            </div>

            {posts.length > 0 && posts.map((post) => <PostContainer key={post.id} post={post} />)}
        </div>
    );
};

export default DiscoverPage;
