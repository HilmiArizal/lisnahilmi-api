const mongoose = require('mongoose');



const DB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log(`MongoDB connected : ${connection.connection.host}`);
    } catch (err) {
        console.log(`Error ${err}`);
        process.exit(1);
    }
}
// }

module.exports = DB;