const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/book_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    publicationYear: Number
  });
  const Book = mongoose.model('Book', bookSchema);

  app.get('/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/books', async (req, res) => {
    const book = new Book(req.body);
    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
