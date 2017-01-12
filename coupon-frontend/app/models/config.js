module.exports = {
    port: 3001,

    // location of backend, do not include trailing /
    apiUrl: 'http://localhost:3000',

    // secret for creating tokens
    secret: 'reughdjfbxmdgvhbgakbhjsadf',

    // list of providers
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
