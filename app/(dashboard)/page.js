import addPost from "@/actions/posts/modify/add-post";
import getAllPosts from "@/actions/posts/read/get-all-posts";
import ImagePicker from "@/components/general/image-picker";
import SubmitButton from "@/components/general/submit-button";
import WelcomeText from "@/components/general/welcome-text";
import DeletePostButton from "@/components/posts/delete-post-button";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const { posts } = await getAllPosts();

    return (
        <>
            <WelcomeText />
            <div>
                <Link href="/settings">Settings</Link>
            </div>

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
                        <p>Creator: {userDisplayName(post.creator)}</p>
                        <DeletePostButton id={post.id} />
                    </li>
                ))}
            </ul>
        </>
    );
}
