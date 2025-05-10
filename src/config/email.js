const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'phillip@weassureservices.com',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('SMTP Configuration Error:', error);
    } else {
        console.log('SMTP Server is ready to take our messages');
    }
});

const sendQuoteEmail = async (formData) => {
    console.log('Attempting to send email with data:', {
        ...formData,
        pass: formData.pass ? '[REDACTED]' : 'undefined'
    });

    if (!process.env.EMAIL_PASSWORD) {
        console.error('EMAIL_PASSWORD is not set in environment variables');
        return false;
    }

    const mailOptions = {
        from: 'phillip@weassureservices.com',
        to: 'phillip@weassureservices.com',
        subject: `New Service Request - ${formData.service}`,
        html: `
            <h2>New Service Request</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Service:</strong> ${formData.service}</p>
            <p><strong>Location:</strong> ${formData.location}</p>
            <p><strong>Preferred Date:</strong> ${formData.preferred_date}</p>
            <p><strong>Preferred Time:</strong> ${formData.preferred_time}</p>
            <p><strong>Number of Participants:</strong> ${formData.participants}</p>
            <p><strong>Service Urgency:</strong> ${formData.service_urgency}</p>
            <p><strong>Additional Information:</strong> ${formData.details || 'None'}</p>
        `
    };

    try {
        console.log('Sending email with options:', {
            ...mailOptions,
            auth: { user: mailOptions.from, pass: '[REDACTED]' }
        });
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        return true;
    } catch (error) {
        console.error('Detailed email error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code,
            command: error.command
        });
        return false;
    }
};

module.exports = { sendQuoteEmail }; 