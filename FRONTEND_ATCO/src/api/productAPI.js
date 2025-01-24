import { products } from '../data/products';

export default {
    getProductBySlug(slug) {
        const product = products.find(product => product.slug === slug);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(product);
            }, 1000);
        });
    },
    getProductsByCollection(slug) {   
        const productsByCollection = products.filter(product => 
            product.collections.some(collection => collection.slug === slug)
          );
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(productsByCollection);
            }, 1000);
        });
    },
  
    
   
}