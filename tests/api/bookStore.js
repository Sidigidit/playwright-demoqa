const fs = require('fs');
const { chromium } = require('playwright');
const Buffer = require('buffer').Buffer;  // to handle Base64 encoding

async function fetchBooksAndSaveISBN(endpoint, filename) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    const response = await page.request.get(endpoint, {
      headers: {
        'accept': 'application/json'
      }
    });
    
    if (response.ok()) {
      const jsonResponse = await response.json();

      const books = jsonResponse.books || [];
      const isbns = books.map(book => book.isbn);

      fs.writeFileSync(filename, JSON.stringify(isbns, null, 2), 'utf-8');
      
      console.log(`ISBNs saved to ${filename}`);
    } else {
      console.error(`Failed to fetch books. Status: ${response.status()}`);
    }
  } catch (error) {
    console.error('Error fetching books:', error);
  } finally {
    await browser.close();
  }
}

async function addBookToCollection(endpoint, username, password, userId, isbn) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    const credentials = `${username}:${password}`;
    const base64Auth = Buffer.from(credentials).toString('base64');

    const body = {
      userId: userId,
      collectionOfIsbns: [{ isbn: isbn }]
    };


    const response = await page.request.post(endpoint, {
      headers: {
        'accept': 'application/json',
        'authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/json'
      },
      data: body
    });
    
    if (response.ok()) {
      const jsonResponse = await response.json();
      console.log('Book added successfully:', jsonResponse);
    }
  } catch (error) {
    console.error('Error adding book:', error);
  } finally {
    await browser.close();
  }
}

module.exports = { addBookToCollection, fetchBooksAndSaveISBN };
