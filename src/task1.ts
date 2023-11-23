interface IPost {
    userID: number,
    id: number,
    title: string,
    body: string
}

let displayedPosts: number = 10;
let posts: IPost[] = [];

async function getPosts(): Promise<IPost[]> {
    try {
        const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!response.ok) throw new Error(`Error fetching posts. Status: ${response.status}`)
        const allPosts = await response.json() as IPost[];
        return allPosts
    }
    catch (error) {
        console.error(error);
        throw error
    }
}

function createPostNode(post: IPost): HTMLDivElement {
    const postNode = document.createElement('div');
    postNode.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
    return postNode
}

function renderPosts(startIndex: number, endIndex: number, posts: IPost[]): void {
    try {
        const postsToDisplay: IPost[] = posts.slice(startIndex, endIndex);
        const postsContainer = document.querySelector('.posts');
        postsToDisplay.forEach((post: IPost) => {
            const postNode: HTMLDivElement = createPostNode(post)
            postsContainer?.appendChild(postNode);
        });
    }
    catch (error) {
        console.error("Error rendering posts: ", error);
    }
}

function loadMorePosts(): void {
    const nextIndex: number = displayedPosts;
    displayedPosts += 10;
    renderPosts(nextIndex, displayedPosts, posts);
    if (displayedPosts >= posts.length) {
        document.querySelector('.btn-load')?.classList.add('hidden');
    }
}

async function initialize(): Promise<void> {
    try {
        posts = await getPosts();
        renderPosts(0, displayedPosts, posts);
        const loadMoreButton = document.querySelector<HTMLButtonElement>(".btn-load")
        loadMoreButton?.addEventListener("click", () => loadMorePosts());
    } 
    catch (error) {
        console.error('Initialization error:', error);
    }
}

initialize()

