const Coupon = require('../models/schemas/coupon');

module.exports.createCoupon = function(req, res, next) {
    // validate input
    
    var newCoupon = new Coupon(req.body);

    newCoupon.save(function(err, coupon) {
        if (err) return next(err);
        return res.sendStatus(200);
    });
}

module.exports.getAllCoupons = function(req, res, next) {
    Coupon.find({}, function(err, coupons) {
        if (err) return next(err);
        return res.json(coupons);
    });
}

module.exports.getActiveCoupons = function(req, res, next) {
    var now = new Date();
    Coupon.find({
        $and: [
            { startDate: { $lt: now } },
            { approvedDate: { $exists: true } },
            { $or: [
                { endDate: { $gt: now } },
                { endDate: { $exists: false } }
            ]}
        ]
    }, function(err, coupons) {
        if (err) return next(err);
        return res.json(coupons);
    });
}

module.exports.getUnapprovedCoupons = function(req, res, next) {
    Coupon.find({approvedDate: { $exists: false }}, function(err, coupons) {
        if (err) return next(err);
        return res.json(coupons);
    });
}

module.exports.approveCoupon = function(req, res, next) {
    Coupon.findOneAndUpdate(req.params.id, { approvedDate: new Date() }, 
            { new: true }, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');
        return res.json(coupon);
    });
}

module.exports.getCouponById = function(req, res, next) {
    Coupon.findById(req.params.id, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');

        return res.json(coupon);
    });
}

module.exports.updateCoupon = function(req, res, next) {
    Coupon.findOneAndUpdate(req.params.id, req.body,
            { new: true }, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');
        return res.json(coupon);
    });
}

module.exports.deleteCouponById = function(req, res, next) {
    Coupon.findOneAndRemove(req.params.id, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');
        return res.sendStatus(200);
    });
}
