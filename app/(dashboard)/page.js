import { addPost, getPosts } from "@/actions/posts";

export default async function Home() {
    const data = await getPosts();

    if (!data.success) return <h1>error</h1>;

    const posts = data.posts;

    return (
        <>
            <h1>house page</h1>
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
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
}
