import * as Mailgen from 'mailgen';

interface MailBody{
    productName:string;
    productUrl:string;
    receiveName:string;
    confirmLink:string
} 




function genEmailString(MailBody:MailBody){
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: MailBody.productName,
            link: MailBody.productUrl,
            // receive: MailBody.receiveName,
        }
    });
    
    var email = {
        body: {
            name: MailBody.receiveName,
            intro: `Welcome to ${MailBody.productName} We\'re very excited to have you on board.`,
            action: {
                instructions: `To get started with ${MailBody.productName}, please click here:`,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: MailBody.confirmLink
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    var emailBody = mailGenerator.generate(email);
    return emailBody
}
export default genEmailString;