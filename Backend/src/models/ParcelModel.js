const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
    parcelweight: Number,
    parceltype: string,
    pareceDescription: string,
    sendername:string,
    senderadd:string,
    sendnum:string,

    // city schema from to to
}

)