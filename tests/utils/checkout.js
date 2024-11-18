const fs = require('fs');

function getRandomISBN(filename) {
    const isbnData = fs.readFileSync(filename, 'utf-8');
    const isbns = JSON.parse(isbnData);
    const randomIndex = Math.floor(Math.random() * isbns.length);
    return isbns[randomIndex];
  }

module.exports = { getRandomISBN };