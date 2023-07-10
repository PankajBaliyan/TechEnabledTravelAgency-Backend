const mongoose = require("mongoose")


const OrderSchema = new mongoose.Schema({
    package     : { type: mongoose.Schema.Types.ObjectId, ref: 'package' },
    fromdate    : { type:Date, required:true},
    status      : {type: String ,enum:['completed','booked','cancelled','waiting']}
                  // completed means tour completed , booked means tour not yet completed,cancelled by either      customer or agent ,waiting means waiting for approval from agent               
                  
}); 

module.exports = mongoose.model('Order', OrderSchema);