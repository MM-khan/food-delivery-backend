const mongoose = require("mongoose");
const {Schema} = mongoose


const orderSchema = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    order_data:{
        type:Array,
        require:true
    },
    // order_date:{
    //     type:Date,
    //     default:Date.now
    // }
});
module.exports = mongoose.model("order", orderSchema)
