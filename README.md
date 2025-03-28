# Banday Glam - Custom Printing Services

A modern Node.js web application for custom printing services, built with Express and EJS.

## Features

- Clean, minimalist design
- Responsive layout
- Quote request system
- Service showcase
- Multi-language support (English/Arabic)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_uri
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## Project Structure

```
.
├── public/
│   ├── css/
│   ├── images/
│   └── js/
├── src/
│   ├── views/
│   │   ├── partials/
│   │   └── *.ejs
│   ├── routes/
│   └── app.js
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express
- EJS Templates
- MongoDB (planned)
- TailwindCSS 