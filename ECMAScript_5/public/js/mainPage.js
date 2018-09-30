document.addEventListener('click', checkEvent);

//Редактирование записи
function editData(book) {
    var editWin = window.open("editData.html", "editData", "width=430,height=600"); 

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
        editWin.document.getElementById('save_changes_btn').onclick = function() {
            var title = editWin.document.getElementById('edit_title').value;
            var pubHouse = editWin.document.getElementById('edit_publishing_house').value;
            var author = editWin.document.getElementById('edit_author').value;
            var relYear = editWin.document.getElementById('edit_releasing_year').value;
            var price = editWin.document.getElementById('edit_price').value;

            if (title == "" || pubHouse == "" || author == "" || relYear == "" || price == "") {
                return;
            }

            dpd.books.put(book.id, setData(book), function(success, error) {
                if (error) { return showError(error); }
                document.getElementById('books_data').remove();
                getBooksData();
            });
            editWin.close();            
        } 
    }    
}

//Получение данных для редактирования
function editDataReq(id) {
    $.ajax({
            type: 'GET',
            url: 'http://localhost:2403/books',
            data: {
              'id': id
            },
            success: function (book) {
                editData(book);
            },
            error: function (err) {
              console.log(err.responseText);
            }
        });
} 

//Обработчик событий
function checkEvent(e) {
    var currentTarget = $(e.currentTarget);
    var target = $(e.target);

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
    var isDelete = confirm("Вы действительно желаете удалить данную запись?");
    if (isDelete){
        $.ajax({
            type: 'GET',
            url: 'http://localhost:2403/books',
            data: {
              'id': id
            },
            success: function (book) {
                dpd.books.del(book, function(success, error) {
                    if (error) { return showError(error); }
                    document.getElementById('books_data').remove();
                    getBooksData();
                });
              console.log("Запись удалена!");
            },
            error: function () {
              alert("Не удалось передать данные для удаления записи");
            }
        });  
    }
 }

//Вывод подробной информации записи
function getFullData(book) {
    var dataWin = window.open("getFullData.html", "getFullData", "width=430,height=600");
    
    dataWin.onload = function() {
        var header = dataWin.document.createElement('h1');
        header.innerHTML = "Подробная информация:";
        var table = document.createElement('table');
        var body = dataWin.document.body;

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

        table.rows[0].cells[1].innerHTML = book.title;
        table.rows[2].cells[1].innerHTML = book.publishingHouse;
        table.rows[3].cells[1].innerHTML = book.author;
        table.rows[4].cells[1].innerHTML = book.releasingYear;
        table.rows[5].cells[1].innerHTML = book.genre;
        table.rows[6].cells[1].innerHTML = book.price;

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
    $.ajax({
        type: 'GET',
        url: 'http://localhost:2403/books',
        data: {
          'id': id
        },
        success: function (book) {
            getFullData(book);
        },
        error: function (arr) {
          console.log(arr.responseText);
        }
    });
} 

//Вывод данных о всех записях
function showBooksData(booksData) {
    if (booksData.length == 0) { return };
    var table = document.createElement('table');
    table.id = 'books_data';
    var tr = document.createElement('tr');
    tr.innerHTML = '<th>Название книги</th><th>Издательство</th><th>Автор</th><th>Год изданиия</th> \
            <th>Жанр</th><th></th><th></th>'
    table.appendChild(tr);    

    for (var i = 0; i < booksData.length; i++) {
        var trNext = document.createElement('tr');
        trNext.book_id = booksData[i].id;

        for (var key in booksData[i]) {
            if (key == 'title' || key == 'publishingHouse' || key == 'author' ||
                key == 'releasingYear' || key == 'genre') {                
                trNext.innerHTML += '<td>' + booksData[i][key] +'</td>';
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
    $.ajax({
        url: 'http://localhost:2403/books',
        type: "GET",
        cahce: false,
        xhrFields: {
            withCredentials: true
        },
        success: function (books) {
           showBooksData(books);
        },
        error: function(xhr) {
            console.log(xhr.responseText);
        }
    });
}