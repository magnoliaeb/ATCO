import { articles} from '../data/blog';
const comments = [];
export default {
    getPosts() {   
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(articles);
            }, 1000);
        });
    },
    getPost(slug) {   
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(articles.find(post => post.slug === slug));
            }, 1000);
        });
    },
    getLastPosts(slug) {
        // obtener los ultimos y que sean distintos al post del slug
        const lastArticles = articles.filter(post => post.slug !== slug).slice(0, 3);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(lastArticles);
            }, 1000);
        });
    },
    sendComment(data) {
        const comment = {
            id: comments.length + 1,
            name: data.name,
            email: data.email,
            message: data.message,
            post_id: data.post_id
        }
        comments.push(comment);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(comment);
            }, 1000);
        });
    },
   
}