const HrMails = `
`;


const HrGmails = [
    'neeraj22@navgurukul.org'
]

const mails = HrMails.trim().split('\n');


var MailsHr;

if((mails.length > 1) && (!HrGmails.length == 0)){
    MailsHr = mails.concat(HrGmails)
}else if(mails.length > 1){
    MailsHr = mails
}else if(!HrGmails.length == 0){
    MailsHr = HrGmails
}

module.exports = { MailsHr }
