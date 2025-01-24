import app from './app.js';
import connect from './database/index.js';
import colors from 'colors';
const PORT = process.env.PORT || 3000;


function main() {
    app.listen(PORT, () => {
        console.log(colors.bgYellow(`Servidor corriendo en el puerto ${PORT}`));
    });
    connect();
}

main();