exports.sendCouponById = function(req, res, next) {
    Coupon.findById(req.params.id, function(err, coupon) {
        if (err) return next(err);
        if (!coupon) return res.status(404).send('No coupon with that ID');

        Users.find({ phone: { $exists: true } }, function(err, users) {
            if (err) return next(err);
            if (!users.length) return res.sendStatus(200);

            var text = coupon.companyName + ': ' + coupon.name + '\n' + coupon.url;

            var mailOptions = {
                from: '"' + config.emailFromName + '" <' + config.emailFromAddress + '>',
                to: buildEmailArray(users).join(', '),
                subject: 'New Coupon',
                text: text
            };

            return transporter.sendMail(mailOptions, function(err, info) {
                if (err) return next(err);
                return res.json(info);
            });
        });
    });
}
