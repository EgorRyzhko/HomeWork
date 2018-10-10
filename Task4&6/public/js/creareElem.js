//Очистка полей создания записи
const deleteInfo = () => {
    document.getElementById('title').value = "";
    document.getElementById('publishing_house').value = "";
    document.getElementById('author').value = "";
    document.getElementById('releasing_year').value = "";
    document.getElementById('price').value = "";
}

//Добавление новых полей
const addNewInputsInCreatePage = () => {
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
const createNewBook = () => {
    const title = document.getElementById('title').value;
    const pubHouse = document.getElementById('publishing_house').value;
    const author = document.getElementById('author').value;
    const relYear = document.getElementById('releasing_year').value;
    const price = document.getElementById('price').value;

    if (title == "" || pubHouse == "" || author == "" || relYear == "" || price == "") {
        return;
    }

    if (document.getElementById('book_type').value == 'Аудиокнига') {
        let element = new Audiobook(
            document.getElementById('disc_type').value,
            document.getElementById('file_format').value
        );
        element.setTitle(title);
        element.setPublishingHouse(pubHouse);
        element.setAuthor(author);
        element.setReleasingYear(relYear);
        element.setGenre(document.getElementById('genre').value);
        element.setPrice(price);

        fetch('http://localhost:2403/books', {
            method: 'POST',
            body: JSON.stringify(element),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((book) => console.log('Success:', JSON.stringify(book)))
        .catch((error) => console.error('Error:', error));
    }
    
    if (document.getElementById('book_type').value == 'Учебник') {
        let element = new Textbook(
            document.getElementById('branch_of_science').value,
            document.getElementById('binding_type').value
        );
        element.setTitle(title);
        element.setPublishingHouse(pubHouse);
        element.setAuthor(author);
        element.setReleasingYear(relYear);
        element.setGenre(document.getElementById('genre').value);
        element.setPrice(price);

        fetch('http://localhost:2403/books', {
            method: 'POST',
            body: JSON.stringify(element),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((book) => console.log('Success:', JSON.stringify(book)))
        .catch((error) => console.error('Error:', error));
    }
}

document.getElementById('save_btn').addEventListener('click', createNewBook);
document.getElementById('delete_btn').addEventListener('click', deleteInfo);
document.getElementById('book_type').addEventListener('change', addNewInputsInCreatePage);