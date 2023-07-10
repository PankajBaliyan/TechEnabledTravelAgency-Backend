const mongoose = require("mongoose")

const PackageSchema = new mongoose.Schema({
    name                   : { type: String, required: true },
    creator                : { type: mongoose.Schema.Types.ObjectId,ref: 'user'},
    amount                 : { type:Number,required:true,min:[1000,'package needs to be atleast 1000 rs']},
    email                  : { type: String, required: true, unique: true },
    mobile_number          : { type: String, required: true },
    created_at             : { type: Date, default: Date.now },
    overAllRating          : { type: Number,default: 0},
    reviews                : [{type: mongoose.Schema.Types.ObjectId,ref: 'review'}],
    images                 : [{url: String,filename: String}],
    source                 : {type:String ,required:true },
    destination                 : {type:String ,required:true },
    // geometry       : {type: {type: String,enum: ['Point'],required: true},coordinates: {type: [Number],required: true}}, for route on map ;
    duration_of_packages   : [{type: Number,required:true}],
});

module.exports =mongoose.model('Package',PackageSchema);