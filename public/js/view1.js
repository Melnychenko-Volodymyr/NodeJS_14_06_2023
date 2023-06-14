let author = document.querySelector('.author');
let cont = document.querySelector('.cont');
let button_prev = document.querySelector('.button_prev');
let button_next = document.querySelector('.button_next');

let arr = [];
let n = 0;
let html = '';

// відображення  автора зі списком творів
const render = () => {
  author.innerHTML = 'Автор: ' + arr[n].author;
  let m = arr[n].articles.length;
  html = '';
  for (let i=0; i<m; i++) {
    console.log(arr[n].articles[i]);
     html += '<p>  ' + arr[n].articles[i].title + ' (' + arr[n].articles[i].genre[0].genre.toLowerCase() + ')' + '</p>'
  }
  cont.innerHTML = html; 
};



// запит даних сервері і відображення першого автора
const getArticles = async () => {
	const result = await axios.get('/aview');
    arr = result.data.slice();
//    console.log(arr);
	render();
  };

  getArticles();


// обробка натискання кнопки для перегляду попереднього автора
  button_prev.addEventListener('click', (ev) => {
    n = n - 1;
	if (n < 0) n = arr.length - 1;
    render();
  }
  );

 // обробка натискання кнопки для перегляду наступного автора
 button_next.addEventListener('click', (ev) => {
    n = n + 1;
	if (n > arr.length-1) n = 0;
    render();
  }
  ); 

  