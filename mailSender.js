const nodemailer = require('nodemailer');
const fs = require('fs');
const { getAllhrMails, Save_Mails_In_Database, AppliedMailsCount } = require('./CheckMails')
const { MailsHr } = require('./mailConvertString')

    
const mailSender = async()=>{

    const AllHrMails = await getAllhrMails()
    const mailsArray = []
    AllHrMails.forEach((document)=>{
        document.HrEmails.forEach((mail)=>{
            mailsArray.push(mail)
        })
    })

    if(!MailsHr == ''){

        let FilterMails = MailsHr.filter((value,index)=> MailsHr.indexOf(value) === index)
    
        let mailCount = 0;
        var AppliedMails = []
        var AppliedMails2 = []
    
        for(let mail of FilterMails){
            try {
    
                if(!mailsArray.includes(mail)){
    
                    let transPorter = nodemailer.createTransport({
                            host:"smtp.gmail.com",
                            port:465,
                            secure:true,
                            pool:true,
                            auth: {
                                user: 'bhumesh21@navgurukul.org',
                                pass: 'bhumesh@123'
                            }
                        })
                    let body = `<p>Hello Ma'am/sir,</p>
                                <p>I hope this email finds you well. My name is bhumesh kewat, and I have completed web development course from navgurukul org at dharamshala(H.P). 
                                I'm writing to express my interest in the Backend(Node.js) position at your company.</p>
                                
                                <p>I have developed strong skills in Python, JavaScript, Node.JS, Express.Js, MySQL. I can work on Node Js, Python, JavaScript. 
                                I believe these skills will be valuable in contributing to your company mission and goals.</p>
                                
                                <p>I've attached my resume and my githhub link to this email for your review. Please let me know if there are any further steps 
                                I can take to apply for the Backend(Node.js) position or if you require additional information.</p>
                                
                                <p>Thank you for considering my application. I look forward to hearing back from you.</p>

                                <p>https://github.com/bhumesh789?tab=repositories</p>
                                <p>Thank you<br>Ma'am/Sir,</p>
                                <p>Regard's,<br>Bhumesh Kewat,<br>Mobile no: 8080368624</p>`;
        
        
                    let info = await transPorter.sendMail({
                        
                        from: '"bhumesh kewat" <bhumesh21@navgurukul.org>',
                        to: mail,
                        subject: "Application for the job of Backend(Node Js) developer position.",
                        text:"This is mail by me",
                        html: body,
                        attachments:[
                            {
                                filename:"BsKewat.pdf",
                                content:fs.createReadStream("./NodeMailer/BsKewat.pdf")
                            }
                        ],
                        priority:'high'            
                    });
    
                    AppliedMails.push(mail)
                    console.log(info);
                    mailCount ++
    
                }else{
                    AppliedMails2.push(mail)
                }
    
            } catch (error) {
                console.log(error);
            }
    
        }
        
        if(!AppliedMails.length == 0){
            Save_Mails_In_Database(AppliedMails)
            console.log('Applied mails saved successfully in the database');
        }
        if(!AppliedMails2.length == 0){
            console.log('You have allready applied for the job on this mails => ',{Count:AppliedMails2.length,AllreadyAppliedMails:AppliedMails2});
        }
        console.log(mailCount," mail has been sent\n");

        console.log('I have applied for the job in company',await AppliedMailsCount(),'mails till now');

    }else{
        console.log('Please Enter the mail in array or in String');
    }
    
}
mailSender()