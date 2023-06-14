let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let select = document.querySelector('.select');
let select2 = document.querySelector('.select2');
let button = document.querySelector('.button');

let contHTML = "";
let contHTML2 = "";
let authors = [];
let genres = [];
let article = {};

// запит масиву авторів та формування списку select
const getAuthors = async () => {
	const result = await axios.get('/author');
    authors = result.data.slice();
    for (let i=0; i<authors.length; i++) {
        contHTML += `<option value='${authors[i]._id}'>${authors[i]._id}   ${authors[i].author}</option>`
    }  
    select.innerHTML = contHTML;
  };

  getAuthors();

// запит масиву жанрів та формування списку select
const getGenres = async () => {
	const result = await axios.get('/genre');
    genres = result.data.slice();
    for (let i=0; i<genres.length; i++) {
        contHTML2 += `<option value='${genres[i]._id}'>${genres[i]._id}   ${genres[i].genre}</option>`
    }  
    select2.innerHTML = contHTML2;
  };

  getGenres();



// відправка статті на сервер
const sendArticle = async () =>  {
	try {
	  const result = await axios.post('/send_article', article);
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
    article = {};
    article.id_author = select.value;
    article.id_genre = select2.value;
    article.title = input.value;
	  article.text = textarea.value; 
	if (input.value && textarea.value) {
		input.value = '';
		textarea.value = '';
		sendArticle();		
	}
  }
  );

  
