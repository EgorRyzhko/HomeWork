//Поиск
function search(books, searchValue = 'наука') {
    if (books.length == 0) { return }

    let div = document.createElement('div');
    div.id = 'searching_container';
    div.innerHTML = '<h1>Результаты поиска:</h1>';
    let table = document.createElement('table');
    table.id = 'serching_result';
    let tr = document.createElement('tr');
    tr.innerHTML = '<th>Название книги</th><th>Издательство</th><th>Автор</th><th>Год изданиия</th> \
            <th>Жанр</th>'
    table.appendChild(tr);       

    for (let i = 0; i < books.length; i++) {
        let trNext = document.createElement('tr');
        let {title, author, genre} = books[i];
            if (title.toLowerCase() == searchValue || author.toLowerCase() == searchValue || genre.toLowerCase() == searchValue) {
                for (key in books[i]) {
                    if (key == 'title' || key == 'publishingHouse' || key == 'author' ||
                        key == 'releasingYear' || key == 'genre') {                
                        trNext.innerHTML += '<td>' + books[i][key] +'</td>';
                    }
                }
            }        
        if (trNext.innerHTML != "") {
            table.appendChild(trNext);
        }
    }
    if (table.rows[1] == null) { 
        return
    }
    div.appendChild(table);
    document.body.appendChild(div);
}

function searchReq() {
    fetch('http://localhost:2403/books')
    .then((response) => response.json())
    .then((books) => {
        if (document.getElementById('searching_container') != null) {
            document.getElementById('searching_container').remove();
        }
        if (document.getElementById('searching').value == '') {             // Параметр по умолчанию при пустом поле поиска
            search(books);
        }
        search(books, document.getElementById('searching').value.toLowerCase());
    }).catch((error) => console.error('Error:', error));
}

export {searchReq, search};