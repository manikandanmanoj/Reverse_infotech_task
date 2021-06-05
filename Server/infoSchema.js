const mongoose = require("mongoose")


const infoSchema = ({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Age: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    },
     
    createdTime: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model("info", infoSchema)