const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
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

userSchema.pre('save', function(callback) {
    // run hook code
    
    callback();
});


// create any methods
userSchema.methods.greet = function() {
    console.log('hi!');
};

var User = mongoose.model('User', userSchema);

module.exports = Coupon;
