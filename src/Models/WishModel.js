const mongooseSchema = require("mongoose");


const wishSchema = new mongooseSchema.Schema({
    name: {
        type: String,
    },
    wish: {
        type: String,
    },
    friend: {
        type: String,
    },
    reservation: {
        type: String,
    },
    session: {
        type: String,
    },
}, { timestamps: true });


module.exports = mongooseSchema.model("Wish", wishSchema);