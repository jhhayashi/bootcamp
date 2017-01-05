const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
        // define schema here
        firstName: String,
        lastName: String,
        address: String,
        classYear: Number,
        email: String,
        phone: String,
        phoneProvider: String,
        isAdmin: Boolean,
        isSuperAdmin: Boolean,
        hash: String,
        companyName: String,
        interests: [String],
        timeSpent: Number
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
    if (this.isAdmin) {
        if (!this.hash && !this.password) {
            throw new Error('Missing password');
        }
        this.hash = this.hash || this.password;
        
        // TODO hash the pw
        

    } 
    // non-admins
    else {
        if (!this.phone) {
            throw new Error('Missing phone');
        }

        // TODO ensure phone number is actually legit
        

        if (!this.phoneProvider) {
            throw new Error('Missing provider');
        }
        

    }
    callback();
});


// create any methods
userSchema.methods.greet = function() {
    console.log('hi!' + this.firstName);
};

// TODO method to check hashed password
userSchema.methods.checkPassword = function(pw) {
    return (this.hash === pw);
}

var User = mongoose.model('User', userSchema);

module.exports = Coupon;
