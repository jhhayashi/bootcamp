const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var couponSchema = new Schema({
    // define schema here
    
    },
    {
        toObject: { getters: true },
        // change name of mongoose default timestamps
        timeStamps: {
            createdAt: 'createdDate',
            updatedAt: 'updatedDate'
        }
    }
);

couponSchema.pre('save', function(callback) {
    // run hook code
    
    callback();
});

var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
