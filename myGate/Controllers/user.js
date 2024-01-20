const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');   

exports.userByUserName = async (req, res) => {
    try {
        const data = await prisma.users.findFirst({
            where: {
                name: req.body.username
            }
        })
        return res.send({
            data
        })
    } catch (error) {
        console.log(error)
    }
}

exports.contactUs = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abhishek0409shinde@gmail.com', // Your Gmail address
                pass: 'pmgm hgvf tszk hzmz',  // Your Gmail password (or App Password for better security)
            },
        });
        const templatePath = path.join(__dirname, '../views/contactUsEmail.ejs');
        const recipientEmail = 'abhishek0409shinde@gmail.com';
        const templateVariables = {
            user: req.body
        };


        ejs.renderFile(templatePath, templateVariables, (err, htmlContent) => {
            if (err) {
                console.error('Error rendering EJS template:', err);
                return;
            }

            // Define email options
            const mailOptions = {
                from: 'abhishek0409shinde@gmail.com',
                to: recipientEmail,
                subject: 'Contact Us Form Submission',
                html: htmlContent,
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.render('contact', {
                        isError: true,
                        message: "Something went wrong !!!"
                    })
                } else {
                    console.log('Email sent:', info.response);
                    return res.render('contact', {
                        isError: true,
                        message: "Your message has been submitted successfully."
                    })

                }
            });
        });

    } catch (error) {
        console.log(error)
    }
}