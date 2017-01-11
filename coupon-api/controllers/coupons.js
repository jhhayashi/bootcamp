const Coupon = require('../models/schemas/coupon');

exports.getAllCoupons = (req, res, next) => {
    Coupon.find({}, (err, coupons) => {
        if (err) return next(err);
        res.json(coupons);
    });
};

exports.getActiveCoupons = (req, res,next) => {
    var now = new Date();
    Coupon.find({
        $and: [
            { approvedDate: {$exists: true} },
            { startDate: {$lt: now} },
            { $or: [
                { endDate: {$gt: now} },
                { endDate: {$exists: false} },
            ]}
        ]
    }, (err, coupons) => {
        if (err) return next(err);
        res.json(coupons);
    });
};

exports.getUnapprovedCoupons = (req, res, next) => {
    Coupon.find({approvedDate: {$exists: false}}, (err, coupons) => {
        if (err) return next(err);
        res.json(coupons);
    });
};

exports.getCouponById = (req, res, next) => {
    Coupon.findById(req.params.id, (err, coupon) => {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');
        res.json(coupon);
    });
};

exports.createCoupon = (req, res, next) => {
    var newCoupon = new Coupon(req.body);
    newCoupon.save((err, coupon) => {
        if (err) return next(err);
        res.sendStatus(200);
    });
};

exports.approveCoupon = (req, res, next) => {
    Coupon.findById(req.params.id)
    .then((coupon) => {
        if (!coupon) return res.status(404).send('No coupon with that ID');
        if (coupon.approvedDate) return;
        coupon.approvedDate = new Date();
        return coupon.save();
    }).then(() => res.sendStatus(200))
    .catch((err) => next(err));
};

exports.updateCoupon = (req, res, next) => {
    Coupon.findOneAndUpdate({id: req.params.id}, req.body, (err, coupon) => {
        if (err) return next(err);
        return res.sendStatus(200);
    });
};

exports.deleteCouponById = (req, res, next) => {
    Coupon.findByIdAndRemove(req.params.id, (err, coupon) => {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');
        return res.sendStatus(200);
    });
};
