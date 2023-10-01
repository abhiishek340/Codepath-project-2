import { pool } from '../config/database.js'
import '../config/dotenv.js'
import giftData from '../data/gifts.js'

const createGiftsTable = async () => {
  const createTableQuery = `
  DROP TABLE IF EXISTS gifts;

  CREATE TABLE IF NOT EXISTS gifts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    contact VARCHAR(255) NOT NULL
  )
`;




  try {
    await pool.query(createTableQuery)
    console.log('🎉 gifts table created successfully')
  } catch (err) {
    console.error('⚠️ error creating gifts table', err)
  }
}

const seedGiftsTable = async () => {
  await createGiftsTable()

  giftData.forEach((gift) => {
    const insertQuery = {
      text: 'INSERT INTO gifts (name, image, location, description, contact) VALUES ($1, $2, $3, $4, $5)'
    }
    

    const values = [
      gift.name,
      gift.image,
      gift.location,
      gift.description,
      gift.contact
    ]

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error('⚠️ error inserting gift', err)
        return
      }
      console.log(`✅ ${gift.name} added successfully`)
    })
  })
}

seedGiftsTable()
