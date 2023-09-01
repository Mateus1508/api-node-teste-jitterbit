const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbConnection = async (pass) => {
    const url = `mongodb+srv://mateusbelmonte:${pass}@cluster0.qlyfolc.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(url, options);
        console.log('Database connected!')
    }
    catch(err) {
        console.log('Erro: ' + err);
    }
}

module.exports = dbConnection;