module.exports = {
    port: 3000,
    dbUrl: 'localhost:5000',
    
    // secret for creating tokens
    secret: 'ThisIsDefinitelyNotTheSecret',

    // mail options, also uses for init script to create first superAdmin
    // Gmail has a limit of 500 recipients a day
    emailFromName: 'HSA Coupons',
    emailFromAddress: 'hsacoupons@gmail.com',
    emailPassword: 'couponswoo',


    providers: [
        {
            name: 'altel',
            sms: '@sms.alltelwireless.com',
            mms: '@mms.alltelwireless.com',
            longName: 'Altel'
        },
        {
            name: 'att',
            sms: '@txt.att.net',
            mms: '@mms.att.net',
            longName: 'AT&T'
        },
        {
            name: 'boost',
            sms: '@sms.myboostmobile.com',
            mms: '@myboostmobile.com',
            longName: 'Boost Mobile'
        },
        {
            name: 'sprint',
            sms: '@messaging.sprintpcs.com',
            mms: '@pm.sprint.com',
            longName: 'Sprint'
        },
        {
            name: 'tmobile',
            sms: '@tmomail.net',
            mms: '@tmomail.net',
            longName: 'T-Mobile'
        },
        {
            name: 'uscellular',
            sms: '@email.uscc.net',
            mms: '@mms.uscc.net',
            longName: 'U.S. Cellular'
        },
        {
            name: 'verizon',
            sms: '@vtext.com',
            mms: '@vzwpix.com',
            longName: 'Verizon'
        },
        {
            name: 'virgin',
            sms: '@vmobl.com',
            mms: '@vmpix.com',
            longName: 'Virgin Mobile'
        }
    ]
};
