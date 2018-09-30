document.getElementById('save_btn').addEventListener('click', createNewBook);
document.getElementById('delete_btn').addEventListener('click', deleteInfo);
document.getElementById('book_type').addEventListener('change', addNewInputsInCreatePage);

//Очистка полей создания записи
function deleteInfo() {
    document.getElementById('title').value = "";
    document.getElementById('publishing_house').value = "";
    document.getElementById('author').value = "";
    document.getElementById('releasing_year').value = "";
    document.getElementById('price').value = "";
}

//Добавление новых полей
function addNewInputsInCreatePage() {
    if (document.getElementById('book_type').value == 'Аудиокнига') {
        document.getElementById('hide-show_textbook').style.display= "none";
        document.getElementById('hide-show_audiobook').style.display = "";
    }

    if (document.getElementById('book_type').value == 'Учебник') {
        document.getElementById('hide-show_audiobook').style.display= "none";
        document.getElementById('hide-show_textbook').style.display = "";
    }
}

//Создание записи
function createNewBook (){
    var title = document.getElementById('title').value;
    var pubHouse = document.getElementById('publishing_house').value;
    var author = document.getElementById('author').value;
    var relYear = document.getElementById('releasing_year').value;
    var price = document.getElementById('price').value;

    if (title == "" || pubHouse == "" || author == "" || relYear == "" || price == "") {
        return;
    }

    if (document.getElementById('book_type').value == 'Аудиокнига') {
        var element = new Audiobook(
            document.getElementById('disc_type').value,
            document.getElementById('file_format').value
        );
        element.setTitle(title);
        element.setPublishingHouse(pubHouse);
        element.setAuthor(author);
        element.setReleasingYear(relYear);
        element.setGenre(document.getElementById('genre').value);
        element.setPrice(price);
    }
    if (document.getElementById('book_type').value == 'Учебник') {
        var element = new Textbook(
            document.getElementById('branch_of_science').value,
            document.getElementById('binding_type').value
        );
        element.setTitle(title);
        element.setPublishingHouse(pubHouse);
        element.setAuthor(author);
        element.setReleasingYear(relYear);
        element.setGenre(document.getElementById('genre').value);
        element.setPrice(price);
    }

    $.ajax({
        url: 'http://localhost:2403/books',
        type: "POST",
        cahce: false,
        xhrFields: {
            withCredentials: true
        },
        contentType: "application/json",
        data: JSON.stringify(element),
        success: function(todo) {
            console.log(todo);
        },
        error: function(xhr) {
            console.log(xhr.responseText);
        }
    });
}