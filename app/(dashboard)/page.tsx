import addPost from "@/actions/posts/modify/add-post";
import getAllPosts from "@/actions/posts/read/get-all-posts";
import ImagePicker from "@/components/general/image-picker";
import SubmitButton from "@/components/general/submit-button";
import DeletePostButton from "@/components/posts/delete-post-button";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";

const Home = async () => {
    const data = await getAllPosts();

    const posts = data.posts;

    if (data.error) return <h1>Error loading posts: {data.error}</h1>;
    if (!posts) return <h1>Couldn't load posts</h1>;

    return (
        <>
            <h1>house page</h1>

            <form action={addPost}>
                <label htmlFor="text">Text:</label>
                <input type="text" name="text" id="text" />
                <label htmlFor="image">Image (optional)</label>
                <ImagePicker id="image" name="image" />
                <SubmitButton content="Add Post" loading="Adding Post..." />
            </form>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {post.text && <h3>{post.text}</h3>}
                        {post.image_url && <Image src={post.image_url} width="400" height="400" alt="post image" />}
                        <p>
                            Creator: {typeof post.creator === "string" ? post.creator : userDisplayName(post.creator)}
                        </p>
                        <DeletePostButton id={post.id} />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
