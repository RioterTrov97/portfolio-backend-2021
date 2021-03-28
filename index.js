const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

let port = process.env.PORT || 3002;

const transport = {
	host: 'smtp.gmail.com',
	port: 465,
	auth: {
		user: process.env.USER,
		pass: process.env.PASS,
	},
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take messages');
	}
});

router.post('/send', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;
	const content = `name: ${name} \nemail: ${email} \nsubject: ${subject} \nmessage: ${message} `;
	const mail = {
		from: name,
		to: 'basnet.trovtle@gmail.com', // Change to email address that you want to receive messages on
		subject: 'New Portfolio Message',
		text: content,
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				status: 'fail',
			});
		} else {
			res.json({
				status: 'success',
			});

			transporter.sendMail(
				{
					from: 'basnet.trovtle@gmail.com',
					to: email,
					subject: 'Your email has been sent to Suman successfully!',
					text: `Thank you for contacting me! I'll be in touch with you as soon as possible.\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
					html: `<!doctype html>
					<html>
					  <head>
						<meta name="viewport" content="width=device-width">
						<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
						<title>Thank you for contacting me</title>
						<style>
						@media only screen and (max-width: 620px) {
						  table[class=body] h1 {
							font-size: 28px !important;
							margin-bottom: 10px !important;
						  }
						  table[class=body] p,
								table[class=body] ul,
								table[class=body] ol,
								table[class=body] td,
								table[class=body] span,
								table[class=body] a {
							font-size: 16px !important;
						  }
						  table[class=body] .wrapper,
								table[class=body] .article {
							padding: 10px !important;
						  }
						  table[class=body] .content {
							padding: 0 !important;
						  }
						  table[class=body] .container {
							padding: 0 !important;
							width: 100% !important;
						  }
						  table[class=body] .main {
							border-left-width: 0 !important;
							border-radius: 0 !important;
							border-right-width: 0 !important;
						  }
						  table[class=body] .btn table {
							width: 100% !important;
						  }
						  table[class=body] .btn a {
							width: 100% !important;
						  }
						  table[class=body] .img-responsive {
							height: auto !important;
							max-width: 100% !important;
							width: auto !important;
						  }
						}
					
						/* -------------------------------------
							PRESERVE THESE STYLES IN THE HEAD
						------------------------------------- */
						@media all {
						  .ExternalClass {
							width: 100%;
						  }
						  .ExternalClass,
								.ExternalClass p,
								.ExternalClass span,
								.ExternalClass font,
								.ExternalClass td,
								.ExternalClass div {
							line-height: 100%;
						  }
						  .apple-link a {
							color: inherit !important;
							font-family: inherit !important;
							font-size: inherit !important;
							font-weight: inherit !important;
							line-height: inherit !important;
							text-decoration: none !important;
						  }
						  #MessageViewBody a {
							color: inherit;
							text-decoration: none;
							font-size: inherit;
							font-family: inherit;
							font-weight: inherit;
							line-height: inherit;
						  }
						  .btn-primary table td:hover {
							background-color: #34495e !important;
						  }
						  .btn-primary a:hover {
							background-color: #34495e !important;
							border-color: #34495e !important;
						  }
						}
						</style>
					  </head>
					  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
						<span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Thank you for contacting me. I'll get back with you as soon as possible.</span>
						<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
						  <tr>
							<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
							<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
							  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
					
								<!-- START CENTERED WHITE CONTAINER -->
								<table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
					
								  <!-- START MAIN CONTENT AREA -->
								  <tr>
									<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
									  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
										<tr>
										  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi ${name},</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for reaching out to me regarding this opportunity. I'll get back to you as soon as possible. In the mean time, you can check my works in github public repo using the button below:</p>
											<table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
											  <tbody>
												<tr>
												  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
													<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
													  <tbody>
														<tr>
														  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="https://github.com/RioterTrov97" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">My Github Public Repo</a> </td>
														</tr>
													  </tbody>
													</table>
												  </td>
												</tr>
											  </tbody>
											</table>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 5px;">The email that you sent me through contact form had the following details:</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 3px;">Name: ${name}</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 3px;">Email: ${email}</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 10px;">Message: ${message}</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for giving me your precious time to view my portfolio. I hope you liked it. Looking forward to get in touch with you soon</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Have a good day!</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 3px;">Regards,</p>
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Suman Basnet</p>
										  </td>
										</tr>
									  </table>
									</td>
								  </tr>
					
								<!-- END MAIN CONTENT AREA -->
								</table>
					
								<!-- START FOOTER -->
								<div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
								  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
									<tr>
									  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
										<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Suman Basnet, Sydney, NSW, Australia</span>
									  </td>
									</tr>
									<tr>
									  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
										Powered by <a href="https://portfolio-site-2021.web.app/" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">SumanDesign2021</a>.
									  </td>
									</tr>
								  </table>
								</div>
								<!-- END FOOTER -->
					
							  <!-- END CENTERED WHITE CONTAINER -->
							  </div>
							</td>
							<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
						  </tr>
						</table>
					  </body>
					</html>`,
				},
				function (error, info) {
					if (error) {
						console.log(error);
					} else {
						console.log('Message sent: ' + info.response);
					}
				}
			);
		}
	});
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(port, () => console.log(`App is listening to ${port}`));
