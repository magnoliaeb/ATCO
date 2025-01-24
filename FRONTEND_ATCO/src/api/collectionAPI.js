import { collections } from '../data/collections';

export default {
    getCollections() {   
        const collectionsMap = collections.map(collection => ({
            id: collection.id,
            title: collection.title,
            slug: collection.slug,
            image: collection.image
        }));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(collectionsMap);
            }, 1000);
        });
    },
    getCollectionBySlug(slug) {   
        const collection = collections.find(collection => collection.slug === slug);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(collection);
            }, 1000);
        });
    },
    
   
}