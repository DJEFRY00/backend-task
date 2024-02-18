const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://localhost/book_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publicationYear: Number
});
const Book = mongoose.model('Book', bookSchema);

const NUM_BOOKS = 10; // Number of books to generate

async function generateBooks() {
  try {
    await Book.deleteMany(); // Clear existing data
    for (let i = 0; i < NUM_BOOKS; i++) {
      const book = new Book({
        title: faker.lorem.words(),
        author: faker.name.findName(),
        genre: faker.random.word(),
        publicationYear: faker.random.number({ min: 1800, max: 2022 })
      });
      await book.save();
    }
    console.log(`Generated ${NUM_BOOKS} random books`);
  } catch (err) {
    console.error('Error generating books:', err);
  } finally {
    mongoose.disconnect();
  }
}

generateBooks();
