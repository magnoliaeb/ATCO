import { brands } from '../data/brands';

export default {
    getBrands() {   
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(brands);
            }, 1000);
        });
    },
  
    
   
}