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
        name: 'Ink Fingerprinting',
        description: `• Professional & Certified Staff
        • Government approved FBI FD-258 cards
• Fast & Stress-Free Process
• Mobile Service at Your Location
• Convenience with You in Mind, Service includes:
• 9X12 Security Envolope
• Custom Shipping Labels`
      },
      {
        name: 'Drug Screening',
        description: `• DOT & Non-DOT Testing
• Quick Results
• Mobile Testing Available
• Confidential Service`
      },
      {
        name: 'Background Checks',
        description: `• Comprehensive Screening
• Fast Turnaround Time
• Secure & Compliant
• Digital Delivery`
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