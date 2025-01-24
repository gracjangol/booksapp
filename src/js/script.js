function bookRender() {
    const bookList = document.querySelector('.books-list');

    for (let book of dataSource.books) {
        const ratingBgc = determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        
        const generatedHTML = Handlebars.compile(document.querySelector('#template-book').innerHTML);
        
        const bookData = {
            ...book, 
            ratingBgc, 
            ratingWidth
        };
        
        const renderedBookHTML = utils.createDOMFromHTML(generatedHTML(bookData));
        
        bookList.appendChild(renderedBookHTML);
    }
}

const favoriteBooks = [];
const filters = [];
const filtersForm = document.querySelector('section.filters');

function filterBooks() {
    for (let book of dataSource.books) {
        let shouldBeHidden = false;

        for (let filter of filters) {
            if (book.details[filter]) {
                shouldBeHidden = true;
            }
        }

        if (shouldBeHidden) {
            document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
        } else {
            document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
        }
    }
}

function determineRatingBgc(rating) {
    if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
}    


function initActions() {

    const bookList = document.querySelector('.books-list');
    bookList.addEventListener('dblclick', function(event) {
        const clickedElement = event.target;
        const clickedElementParent = clickedElement.offsetParent

        if (clickedElementParent.classList.contains('book__image')) {
            event.preventDefault();

            if (!clickedElementParent.classList.contains('favorite')) {
                clickedElementParent.classList.add('favorite');
                const bookId = clickedElementParent.getAttribute('data-id');
                favoriteBooks.push(bookId);
            } else {
                clickedElementParent.classList.remove('favorite');
                const bookId = clickedElement.getAttribute('data-id');
                favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
            }

        }


    })
    filtersForm.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (clickedElement.tagName === 'INPUT' &&
            clickedElement.type === 'checkbox' &&
            clickedElement.name === 'filter') {
            }
        
        if (clickedElement.checked) {
            filters.push(clickedElement.value);
        } else {
            filters.splice(filters.indexOf(clickedElement.value), 1);
        }
        filterBooks();
    })

}

bookRender();
initActions();

