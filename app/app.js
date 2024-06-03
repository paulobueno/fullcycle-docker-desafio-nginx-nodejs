const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'db',
  user: 'user',
  password: 'password',
  database: 'mydatabase'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display the HTML form and persons data
app.get('/', (req, res) => {
  // Fetch persons data from the database
  db.query('SELECT * FROM persons', (err, results) => {
    if (err) {
      res.status(500).send('Error querying database');
      return;
    }

    // Render HTML with fetched data
    res.send(renderHTML(results));
  });
});

// Route to handle form submission and add a new person to the database
app.post('/add', (req, res) => {
  const { name, age } = req.body;

  db.query('INSERT INTO persons (name, age) VALUES (?, ?)', [name, age], (err, results) => {
    if (err) {
      res.status(500).send('Error inserting into database');
      return;
    }

    // Redirect to the home page to display the updated list
    res.redirect('/');
  });
});

// Function to render HTML with persons data
function renderHTML(persons) {
  let html = '<h1>Full Cycle Rocks!</h1>';
  html += `
    <form action="/add" method="POST">
      <input type="text" name="name" placeholder="Name" required>
      <input type="number" name="age" placeholder="Age" required>
      <button type="submit">Add Person</button>
    </form>
  `;
  html += '<h2>Persons List</h2>';
  html += '<ul>';
  persons.forEach(person => {
    html += `<li>${person.name} (Age: ${person.age})</li>`;
  });
  html += '</ul>';
  return html;
}

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});

