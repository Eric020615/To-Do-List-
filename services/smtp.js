const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const Task = require('../models/Task');

async function generateEmailData(data) {
  const { priority_level, title, description } = data;
  const date = data.date ? new Date(data.date) : null;
  const to = data.email;
  const extractedDate = date.toISOString().split('T')[0];

  let emailDate;
  if (priority_level === '20') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 3);
  } else if (priority_level === '10') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 1);
  } else if (priority_level === '30') {
    emailDate = new Date(extractedDate);
    emailDate.setDate(emailDate.getDate() - 7);
  }

  const formattedEmailDate = emailDate?.toISOString().split('T')[0];
  const message = `Hello,
    This is a reminder for the task with title "${title}" and description "${description}".
    The task is scheduled for ${extractedDate} with priority level ${priority_level}.
    Please take necessary actions accordingly.`;
  const subject = `Task Reminder - ${title}`;

  return {
    message,
    to,
    subject,
    emailDate: formattedEmailDate,
  };
}

async function sendEmail(to, subject, message, item) {
  // Set up the SMTP transport configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server host
    port: 587, // Replace with the SMTP server port
    secure: false, // Set to true if using SSL/TLS
    auth: {
      user: 'worldpopi57@gmail.com', // Replace with your email address
      pass: 'nvomcteiswhrbveo', // Replace with your email password
    },
  });
  // Set up the email options
  const mailOptions = {
    from: 'worldpopi57@example.com', // Sender address
    to, // Recipient address
    subject,
    text: message,
    html: `<!DOCTYPE html>
              <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <meta name="x-apple-disable-message-reformatting">
                <title></title>
                <style>
                  table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
                  div, td {padding:0;}
                  div {margin:0 !important;}
                </style>
                <noscript>
                  <xml>
                    <o:OfficeDocumentSettings>
                      <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                  </xml>
                </noscript>
                <style>
                  table, td, div, h1, p {
                    font-family: Arial, sans-serif;
                  }
                  @media screen and (max-width: 530px) {
                    .unsub {
                      display: block;
                      padding: 8px;
                      margin-top: 14px;
                      border-radius: 6px;
                      background-color: #FFFFFF;
                      text-decoration: none !important;
                      font-weight: bold;
                    }
                    .col-lge {
                      max-width: 100% !important;
                    }
                  }
                  @media screen and (min-width: 531px) {
                    .col-sml {
                      max-width: 27% !important;
                    }
                    .col-lge {
                      max-width: 73% !important;
                    }
                  }
                </style>
              </head>
              <body style="margin:0;padding:0;word-spacing:normal;background-color: #ffffff;color: #000000">
                <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
                  <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                      <td align="center" style="padding:0;">
                        <table role="presentation" align="center" style="width:600px;">
                        <tr>
                        <td>
                        <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                          <tr>
                            <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                              <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/logo.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:30px;background-color:#ffffff;">
                              <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Reminder!</h1>
                              <p style="margin:0;">It's OK to feel down sometimes but don't forget to complete your task. <br/>Task: ${item.title}</br>Description: ${item.description}</br>Date: ${item.date.split('T')[0]}</p>
                            </td>    
                          </tr>
                          <tr>
                            <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                              <a href="http://www.example.com/" style="text-decoration:none;"><img src="https://plus.unsplash.com/premium_photo-1684331411879-9c5189065fe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=845&q=80" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"</a>
                            </td>                                                                    
                          </tr>
                          <tr>
                            <td style="padding:30px;text-align:center;font-size:12px;background-color:#439a97;color:#FFFFFF;">
                              <p style="margin:0 0 8px 0;"><a href="http://www.facebook.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/facebook_1.png" width="40" height="40" alt="f" style="display:inline-block;color:#cccccc;"></a> <a href="http://www.twitter.com/" style="text-decoration:none;"><img src="https://assets.codepen.io/210284/twitter_1.png" width="40" height="40" alt="t" style="display:inline-block;color:#cccccc;"></a></p>
                              <p style="margin:0;font-size:14px;line-height:20px;">&reg; To Do List 2023, Universiti Malaya<br><a class="unsub" href="http://www.example.com/" style="color:#cccccc;text-decoration:underline;">Unsubscribe instantly</a></p>
                            </td>
                          </tr>
                        </table>
                        </td>
                        </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </body>
          </html>`
  };

  // Send the email
  await transporter.sendMail(mailOptions)
}
async function scheduleEmail() {
  try {
    const data = await Task.find();

    for (const item of data) {
      const { message, to, subject, emailDate } = await generateEmailData(item);
      const currentDate = new Date().toISOString().split('T')[0];
      if (currentDate === emailDate) {
        if(item.email_frequence==0){
          await sendEmail(to, subject, message, item);
          await Task.findOneAndUpdate({_id:item._id},{email_frequence:item.email_frequence+1})
        }
      }
    }
  } catch (error) {
    console.error('Error occurred while scheduling email:', error);
  }
}
  
module.exports = { 
  Task,
  scheduleEmail,
};
