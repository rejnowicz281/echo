import { signOut } from "@/actions/auth";
import { addPost, getPosts } from "@/actions/posts";
import DeletePostButton from "@/components/posts/DeletePostButton";
import { auth } from "@/firebase";
import Link from "next/link";

export default async function Home() {
    const data = await getPosts();

    if (!data.success) return <h1>error</h1>;

    const posts = data.posts;
    const currentUser = auth.currentUser;

    return (
        <>
            <form action={signOut}>
                <button>Logout</button>
            </form>
            <Link href="/register">Auth</Link>
            <h1>house page</h1>
            <h2>Welcome, {currentUser ? currentUser.email : "guest"}</h2>
            <form action={addPost}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" />
                <label htmlFor="content">Content:</label>
                <textarea name="content" id="content"></textarea>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <DeletePostButton id={post.id} />
                    </li>
                ))}
            </ul>
        </>
    );
}
