// src/pages/api/contact.js
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function post(req, res) {
  const body = await req.json();
  
  // Define the path to the JSON file
  const filePath = join(process.cwd(), 'data', 'contacts.json');

  // Read existing data
  let contacts = [];
  try {
    const data = fs.readFileSync(filePath);
    contacts = JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }

  // Add the new contact
  contacts.push(body);

  // Write updated data back to the file
  try {
    writeFileSync(filePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error writing to JSON file:", error);
    return res.status(500).send('Internal Server Error');
  }

  res.status(200).send('Success');
}
