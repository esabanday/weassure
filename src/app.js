const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { sendQuoteEmail } = require('./config/email');

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment check:', {
    emailPasswordExists: !!process.env.EMAIL_PASSWORD,
    emailPasswordLength: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'WeAssure - Professional Fingerprinting Services',
    services: [
      {
        name: 'On-Site & Mobile Drug Testing',
        description: `Skilled and streamlined drug screening with innovative quick-result testing options.

Testing Methods:
• Oral swab testing (rapid results)
• Urine testing
• DOT breath alcohol testing

Service Types:
• DOT-compliant testing
• Pre-employment screening
• Random testing programs
• Post-accident testing
• Reasonable suspicion testing

Features:
• Customizable panel options
• On-site service
• Professional collection
• Confidential results`
      },
      {
        name: 'On-Site & Mobile Blood Alcohol Testing',
        description: `State of the art and highly accurate fuel cell breathalizer testing.

Features:
• Reliable patented technology requiring less frequent calibration
• Accurate BAC results in seconds
• Certified and trained technicians
• Confidential results`
      },
      {
        name: 'Mobile Ink Fingerprinting',
        description: `Professional and efficient fingerprinting that delivers greater convenience at a lesser price.

Base Price: $54.75

Our Service Includes:
• Sturdy 9x12 envelope (80lb text paper)
• Two custom printed address labels
• Prepaid postage for fingerprint card and additional sheet
• Direct handoff to postal service
• No added cost for distances under 20 miles

Travel Fees:
• $10 for 20-29.9 miles
• $20 for 30-44.9 miles
• $45 for 45+ miles`
      }
    ]
  });
});

app.get('/quote', (req, res) => {
  res.render('quote');
});

app.get('/services/:service', (req, res) => {
  res.render('service-detail', { service: req.params.service });
});

app.post('/api/quote', async (req, res) => {
    console.log('Received quote request:', req.body);
    
    try {
        if (!req.body.email || !req.body.name) {
            console.error('Missing required fields:', req.body);
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: req.body 
            });
        }

        const emailSent = await sendQuoteEmail(req.body);
        if (emailSent) {
            console.log('Quote request processed successfully');
            res.json({ message: 'Quote request received and email sent successfully' });
        } else {
            console.error('Failed to send email for quote request');
            res.status(500).json({ 
                message: 'Failed to send email',
                details: 'Check server logs for more information'
            });
        }
    } catch (error) {
        console.error('Error processing quote:', {
            error: error.message,
            stack: error.stack,
            body: req.body
        });
        res.status(500).json({ 
            message: 'Error processing your request',
            details: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 