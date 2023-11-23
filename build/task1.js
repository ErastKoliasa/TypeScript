"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let displayedPosts = 10;
let posts = [];
function getPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok)
                throw new Error(`Error fetching posts. Status: ${response.status}`);
            const allPosts = yield response.json();
            return allPosts;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
function createPostNode(post) {
    const postNode = document.createElement('div');
    postNode.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
    return postNode;
}
function renderPosts(startIndex, endIndex, posts) {
    try {
        const postsToDisplay = posts.slice(startIndex, endIndex);
        const postsContainer = document.querySelector('.posts');
        postsToDisplay.forEach((post) => {
            const postNode = createPostNode(post);
            postsContainer === null || postsContainer === void 0 ? void 0 : postsContainer.appendChild(postNode);
        });
    }
    catch (error) {
        console.error("Error rendering posts: ", error);
    }
}
function loadMorePosts() {
    var _a;
    const nextIndex = displayedPosts;
    displayedPosts += 10;
    renderPosts(nextIndex, displayedPosts, posts);
    if (displayedPosts >= posts.length) {
        (_a = document.querySelector('.btn-load')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
    }
}
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            posts = yield getPosts();
            renderPosts(0, displayedPosts, posts);
            const loadMoreButton = document.querySelector(".btn-load");
            loadMoreButton === null || loadMoreButton === void 0 ? void 0 : loadMoreButton.addEventListener("click", () => loadMorePosts());
        }
        catch (error) {
            console.error('Initialization error:', error);
        }
    });
}
initialize();
