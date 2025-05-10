require('dotenv').config();
const { google } = require('googleapis');
const readline = require('readline');

if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
    console.error('Error: GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set in .env file');
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'  // Using OAuth Playground
);

console.log('\nFollow these steps:\n');
console.log('1. Go to https://developers.google.com/oauthplayground');
console.log('2. Click the gear icon in the top right');
console.log('3. Check "Use your own OAuth credentials"');
console.log('4. Enter these credentials:');
console.log(`   Client ID: ${process.env.GMAIL_CLIENT_ID}`);
console.log(`   Client Secret: ${process.env.GMAIL_CLIENT_SECRET}`);
console.log('5. Close the settings');
console.log('6. In the left panel, find "Gmail API v1" and select https://mail.google.com/');
console.log('7. Click "Authorize APIs"');
console.log('8. Log in with phillip@weassureservices.com');
console.log('9. After authorization, click "Exchange authorization code for tokens"');
console.log('10. Copy the "Refresh token" value\n');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the refresh token here: ', (refreshToken) => {
    console.log('\nAdd this to your .env file:\n');
    console.log(`GMAIL_REFRESH_TOKEN=${refreshToken}`);
    rl.close();
}); 