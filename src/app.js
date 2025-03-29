const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

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
      },
      {
        name: 'Mobile Drug Testing',
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

app.post('/api/quote', (req, res) => {
  // Handle quote requests
  res.json({ message: 'Quote request received' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 