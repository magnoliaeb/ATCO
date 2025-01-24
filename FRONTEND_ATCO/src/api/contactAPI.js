const messages = [];

export default {
    sendMessage(data) {
        const message = {
            id: messages.length + 1,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        };
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                messages.push(message);
                resolve(message);
            }, 1000);
        });
    },
  
    
   
}