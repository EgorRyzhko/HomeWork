//import {searchReq, search} from 'searchingFeature';

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

document.addEventListener('click', checkEvent);
//document.getElementById('search_btn').addEventListener('click', searchReq);

//Редактирование записи
function editData(book) {
    const editWin = window.open("editData.html", "editData", "width=430,height=600"); 

//Обновление свойств записи
    function setData(book) {
        book.title = editWin.document.getElementById('edit_title').value;
        book.publishingHouse = editWin.document.getElementById('edit_publishing_house').value;
        book.author = editWin.document.getElementById('edit_author').value;
        book.releasingYear = editWin.document.getElementById('edit_releasing_year').value;
        book.genre = editWin.document.getElementById('edit_genre').value;
        book.price = editWin.document.getElementById('edit_price').value;
        if ('discType' in book) {
            book.discType = editWin.document.getElementById('edit_disc_type').value;
            book.fileFormat = editWin.document.getElementById('edit_file_format').value;
        }
        if ('bindingType' in book) {
            book.bindingType = editWin.document.getElementById('edit_binding_type').value;
            book.branchOfScience = editWin.document.getElementById('edit_branch_of_science').value;
        }
        return book;
    }

    editWin.onload = function() {
//Запись свойств элемента до редактирования
        editWin.document.getElementById('edit_title').value = book.title;
        editWin.document.getElementById('edit_publishing_house').value = book.publishingHouse;
        editWin.document.getElementById('edit_author').value = book.author;
        editWin.document.getElementById('edit_releasing_year').value = book.releasingYear;
        editWin.document.getElementById('edit_genre').value = book.genre;
        editWin.document.getElementById('edit_price').value = book.price;
        if ('discType' in book) {
            editWin.document.getElementById('edit_book_type').value = "Аудиокнига";
            editWin.document.getElementById('edit_disc_type').value = book.discType;
            editWin.document.getElementById('edit_file_format').value = book.fileFormat;
        }
        if ('bindingType' in book) {
            editWin.document.getElementById('hide-show_edit_textbook').style.display = "";
            editWin.document.getElementById('hide-show_edit_audiobook').style.display = "none";
            editWin.document.getElementById('edit_book_type').value = "Учебник";
            editWin.document.getElementById('edit_binding_type').value = book.bindingType;
            editWin.document.getElementById('edit_branch_of_science').value = book.branchOfScience;
        }

//Проверка на пустые поля и запрос на изменение данных в бд
        editWin.document.getElementById('save_changes_btn').addEventListener('click', () => {
            const title = editWin.document.getElementById('edit_title').value;
            const pubHouse = editWin.document.getElementById('edit_publishing_house').value;
            const author = editWin.document.getElementById('edit_author').value;
            const relYear = editWin.document.getElementById('edit_releasing_year').value;
            const price = editWin.document.getElementById('edit_price').value;

            if (title == "" || pubHouse == "" || author == "" || relYear == "" || price == "") {
                return;
            }

            fetch('http://localhost:2403/books', {
                method: 'PUT',
                body: JSON.stringify(setData(book)),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json())
            .then((book) => {
                console.log('Success:', JSON.stringify(book));
                document.getElementById('books_data').remove();
                document.getElementById('create_btn').remove();
                getBooksData();
            }).catch((error) => console.error('Error:', error));
            editWin.close();            
        }); 
    }    
}

//Получение данных для редактирования
function editDataReq(id) {
    fetch('http://localhost:2403/books')
    .then((response) => response.json())
    .then((books) => {
        editData(books.filter( (book) =>  book.id == id )[0])
    }).catch((error) => console.error('Error:', error));
} 

//Обработчик событий
function checkEvent(e) {
    const currentTarget = $(e.currentTarget);
    let target = $(e.target);

    while (!target.is(currentTarget)) {
        if (target.attr('data-option') === 'delete') {
            child = target.parent().parent();
            deleteData(child[0].book_id);
            return;
        }
        if (target.attr('data-option') === 'edit') {
            child = target.parent().parent();
            editDataReq(child[0].book_id);
            return
        }
       
        if (target.attr('data-option') === 'get_data') {
            child = target.parent().parent();
            getFullDataReq(child[0].book_id);

            return;
        }

        target = target.parent();
    }
}

//Удаление записи
function deleteData(id) {
    const isDelete = confirm("Вы действительно желаете удалить данную запись?");
    if (isDelete){
        fetch('http://localhost:2403/books/' + id, {
            method: 'DELETE',
        }).then((response) => response.json())
        .then(() => {
            document.getElementById('books_data').remove();
            document.getElementById('create_btn').remove();
            getBooksData();
        }).catch((error) => console.error('Error:', error));
    }
}

//Вывод подробной информации записи
function getFullData(book) {
    const dataWin = window.open("getFullData.html", "getFullData", "width=430,height=600");
    
    dataWin.onload = function() {
        let header = dataWin.document.createElement('h1');
        header.innerHTML = "Подробная информация:";
        let table = document.createElement('table');
        let body = dataWin.document.body;
        let {title, publishingHouse, author, releasingYear, genre, price} = book;   //Деструктуризация объекта

        table.innerHTML = '<tr><td>Название книги</td><td></td></tr>';
        table.innerHTML += '<tr><td>Тип книги</td><td></td></tr>'
        table.innerHTML += '<tr><td>Издательство</td><td></td></tr>';
        table.innerHTML += '<tr><td>Автор</td><td></td></tr>';
        table.innerHTML += '<tr><td>Год издания</td><td></td></tr>';
        table.innerHTML += '<tr><td>Жанр</td><td></td></tr>';
        table.innerHTML += '<tr><td>Стоимость</td><td></td></tr>';

        if('discType' in book) {
            table.rows[1].cells[1].innerHTML = 'Аудиокнига';
            table.innerHTML += '<tr><td>Тип диска</td><td></td></tr>';
            table.innerHTML += '<tr><td>Формат файла</td><td></td></tr>';
        }
        if('branchOfScience' in book) {
            table.rows[1].cells[1].innerHTML = 'Учебник';
            table.innerHTML += '<tr><td>Область науки</td><td></td></tr>';
            table.innerHTML += '<tr><td>Тип переплета</td><td></td></tr>';
        }

        table.rows[0].cells[1].innerHTML = title;
        table.rows[2].cells[1].innerHTML = publishingHouse;
        table.rows[3].cells[1].innerHTML = author;
        table.rows[4].cells[1].innerHTML = releasingYear;
        table.rows[5].cells[1].innerHTML = genre;
        table.rows[6].cells[1].innerHTML = price;

        if ('discType' in book) {
            table.rows[7].cells[1].innerHTML = book.discType;
            table.rows[8].cells[1].innerHTML = book.fileFormat;
        }
        if ('branchOfScience' in book) {
            table.rows[7].cells[1].innerHTML = book.branchOfScience;
            table.rows[8].cells[1].innerHTML = book.bindingType;
        }

        body.appendChild(header);
        body.appendChild(table);
    }
 }

//Получение данных для вывода
function getFullDataReq(id) {
    fetch('http://localhost:2403/books')
    .then((response) => response.json())
    .then((books) => getFullData( books.filter((book) => book.id == id)[0] ))
    .catch((error) => console.error('Error', error));
} 

//Вывод данных о всех записях
function showBooksData(booksData) {
    document.body.innerHTML += '<a href="createElem.html" id="create_btn">Создать</a>';
    if (booksData.length == 0) { return };    
    let [...books] = booksData;                     //Деструктуризация массива и применение оператора spread
    let table = document.createElement('table');
    table.id = 'books_data';
    let tr = document.createElement('tr');
    tr.innerHTML = '<th>Название книги</th><th>Издательство</th><th>Автор</th><th>Год изданиия</th> \
            <th>Жанр</th><th></th><th></th>'
    table.appendChild(tr);    

    for (let i = 0; i < books.length; i++) {
        let trNext = document.createElement('tr');
        trNext.book_id = books[i].id;

        for (let key in books[i]) {
            if (key == 'title' || key == 'publishingHouse' || key == 'author' ||
                key == 'releasingYear' || key == 'genre') {                
                trNext.innerHTML += '<td>' + books[i][key] +'</td>';
            }
        }

        trNext.innerHTML += '<td><a href="#" class="option_link" data-option="edit">Редактировать</a> \
            <a href="#" class="option_link" data-option="delete">Удалить</a></td>';
        trNext.innerHTML += '<td><a href="#" class="option_link" data-option="get_data">Подробнее</a></td>';
        table.appendChild(trNext);
    }
    document.body.appendChild(table);
}

//Получение данных для вывода
function getBooksData() {
    fetch('http://localhost:2403/books')
    .then((response) => response.json())
    .then((booksData) => showBooksData(booksData))
    .catch((error) => console.error('Error:', error));
}