const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// Оголошення схеми для колекції authors
const authorSchema = new mongoose.Schema({
  author: String
});

// Оголошення схеми для колекції genres
const genreSchema = new mongoose.Schema({
  title: String
});

// Оголошення схеми для колекції articles
const articleSchema = new mongoose.Schema({
  id_author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  id_genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  title: String,
  text: String
});

// Оголошення моделей на основі схем
const Author = mongoose.model('Author', authorSchema);
const Article = mongoose.model('Article', articleSchema);
const Genre = mongoose.model('Genre', genreSchema);

//------------------------------------------------------------
// стартова сторінка (перегляд статей)
router.get('/', (req, res) => {
    res.render('view');
});

// відправка масиву статей на запит get
router.get('/article', (req, res) => {
  

// Асинхронна функція для отримання об'єднаних даних
    const getCombinedData = async () => {
     
      let data = await Article.find()
      .populate('id_author', 'author')
      .populate('id_genre', 'genre')
      .exec();

    console.log(data);
    res.json(data);

};

getCombinedData();

});

//---------------------------------------------------------
// сторінка перегляду та додавання авторів
router.get('/add_author/', (req, res) => {
    res.render('add_author');
});

// відправка масиву авторів на запит get
router.get('/author', (req, res) => {
    const getAuthors = async () => {
          console.log('Відправка масиву авторів'); 
          let authors = await Author.find({});  
          res.json(authors);
        };
    getAuthors();

});

// отримання нового автора від браузера
router.post('/add_author', (req, res) => {
    let author = req.body;
    console.log('Новий автор: ' + author.author);
    Author.create(author);
  });

// отримання id та зміненого автора для заміни від браузера
router.post('/update_author', (req, res) => {
    let authorUpdate = req.body;
    console.log('Заміна автора: ' + authorUpdate.id);
    const updateAuthor = async () => {
          const result = await Author.updateOne({ _id: `${authorUpdate.id}` }, { author: `${authorUpdate.newAuthor}` });
      };
    updateAuthor();  
  });


// ------------------------------------------------------------
// сторінка додавання статей
router.get('/add_article/', (req, res) => {
    res.render('add_article');
}); 

// відправка масиву жанрів на запит get
router.get('/genre', (req, res) => {
  const getGenres = async () => {
        console.log('Відправка масиву авторів'); 
        let genres = await Genre.find({});  
        res.json(genres);
      };
  getGenres();

});
// додавання нової статті
router.post('/send_article', (req, res) => {
    article = req.body;
    Article.create(article);
    console.log('Додана нова стаття');
  });


//--------------------------------------------------------------------------------------
// сторінка перегляду авторів зі списком творів
router.get('/view1', (req, res) => {
  res.render('view1');
});

// відправка даних на запит get
router.get('/aview', (req, res) => {

// Асинхронна функція для отримання об'єднаних даних
const getCombinedData1 = async () => {

    let data = await Author.aggregate([
      {
        $lookup: {
          from: 'articles',
          let: { authorId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$id_author', '$$authorId'] }
              }
            },
            {
              $lookup: {
                from: 'genres',
                localField: 'id_genre',
                foreignField: '_id',
                as: 'genre'
              }
            },
            {
              $project: { genre: 1, title: 1 }
            }
          ],
          as: 'articles'
        }
      }
    ]);

    console.log(data);
    res.json(data);

};

// Виклик функції для отримання об'єднаних даних
getCombinedData1();

});

module.exports = router;