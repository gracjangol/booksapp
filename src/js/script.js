class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];
      this.bookList = null;
      this.filtersForm = null;
      this.data = [];
    }
  
    initData() {
      this.data = dataSource.books;
    }
  

    getElements() {
      this.bookList = document.querySelector('.books-list');
      this.filtersForm = document.querySelector('section.filters');
    }
  
    bookRender() {
      for (let book of this.data) {
        const ratingBgc = this.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
  
        const generatedHTML = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  
        const bookData = {
          ...book,
          ratingBgc,
          ratingWidth
        };
  
        const renderedBookHTML = utils.createDOMFromHTML(generatedHTML(bookData));
  
        this.bookList.appendChild(renderedBookHTML);
      }
    }
  
    filterBooks() {
      for (let book of this.data) {
        let shouldBeHidden = false;
  
        for (let filter of this.filters) {
          if (book.details[filter]) {
            shouldBeHidden = true;
          }
        }
  
        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  
    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
    }
  
    initActions() {
      this.bookList.addEventListener('dblclick', (event) => {
        const clickedElement = event.target;
        const clickedElementParent = clickedElement.offsetParent;
  
        if (clickedElementParent.classList.contains('book__image')) {
          event.preventDefault();
  
          if (!clickedElementParent.classList.contains('favorite')) {
            clickedElementParent.classList.add('favorite');
            const bookId = clickedElementParent.getAttribute('data-id');
            this.favoriteBooks.push(bookId);
          } else {
            clickedElementParent.classList.remove('favorite');
            const bookId = clickedElement.getAttribute('data-id');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });
  
      this.filtersForm.addEventListener('click', (event) => {
        const clickedElement = event.target;
  
        if (clickedElement.tagName === 'INPUT' &&
            clickedElement.type === 'checkbox' &&
            clickedElement.name === 'filter') {
        }
  
        if (clickedElement.checked) {
          this.filters.push(clickedElement.value);
        } else {
          this.filters.splice(this.filters.indexOf(clickedElement.value), 1);
        }
        this.filterBooks();
      });
    }
  
    init() {
      this.initData();
      this.getElements();
      this.bookRender();
      this.initActions();
    }
    
  }
  
  const app = new BooksList();
  app.init();
  