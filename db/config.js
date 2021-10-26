const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('conectado..');
    } catch (error) {
        console.log(error);
        throw new Error('Error....')
        
    }

}
module.exports ={
    dbConnection
}



