'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let htmlTop = `
   <!doctype html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Form Submission Result</title>
       <link rel="stylesheet" href="main.css">
   </head>
   <body>
       <header>
           <h1>Akshat Patel</h1>
       </header>
       <nav>
           <ul>
               <li><a href="contacts.html">Contacts</a></li>
               <li><a href="interests.html">Interests</a></li>
               <li><a href="index.html">Index</a></li>
               <li><a href="style.html">Style</a></li>
           </ul>
       </nav>
       <main>
`;

let htmlBottom = `
       </main>
       <footer>
           <p>All rights reserved. 04/09/2024, CS290 Web Development, Oregon State University.</p>
       </footer>
   </body>
   </html>
`;

app.post('/submit', (req, res) => {
    let { name, email, message, referrer, recs } = req.body;

    res.send(`
       ${htmlTop}
       <section>
           <h2>Thank You for Your Submission!</h2>
           <p>Here is the information you provided:</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong> ${message}</p>
           <p><strong>How did you hear about me?:</strong> ${referrer}</p>
           <p><strong>Would you recommend this webiste to a friend?:</strong> ${recs}</p>
       </section>
       ${htmlBottom}
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
