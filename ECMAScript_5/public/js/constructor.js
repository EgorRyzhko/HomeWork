function Book(title, publishingHouse, author, releasingYear, genre, price) {
    this.title = title;
    this.publishingHouse = publishingHouse;
    this.author =author;
    this.releasingYear = releasingYear;
    this.genre = genre;
    this.price = price;

    this.setTitle = function(value) {
        this.title = value;
    }
    this.getTitle = function() {
        return this.title;
    }
    this.setPublishingHouse = function(value) {
        this.publishingHouse = value;
    }
    this.getPublishingHouse = function() {
        return this.publishingHouse;
    }
    this.setAuthor = function(value) {
        this.author = value;
    }
    this.getAuthor = function() {
        return this.author;
    }
    this.setReleasingYear = function(value) {
        this.releasingYear = value;
    }
    this.getReleasingYear = function() {
        return this.releasingYear;
    }
    this.setGenre = function(value) {
        this.genre = value;
    }
    this.getGenre = function() {
        return this.genre;
    }
    this.setPrice = function(value) {
        this.price = value;
    }
    this.getPrice = function() {
        return this.price;
    }
}

function Audiobook(discType, fileFormat) {
    Book.call(this);
    this.discType = discType;
    this.fileFormat = fileFormat;

    this.setDiscType = function(value) {
        this.discType = value;
    }
    this.getDiscType = function() {
        return this.discType;
    }
    this.setFileFormat = function(value) {
        this.fileFormat = value;
    }
    this.getFileFormat = function() {
        return this.fileFormat;
    }
}

function Textbook(branchOfScience, bindingType) {
    Book.call(this);
    this.branchOfScience = branchOfScience;
    this.bindingType = bindingType;

    this.setBranchOfScience = function(value) {
        this.branchOfScience = value;
    }
    this.getBranchOfScience = function() {
        return this.branchOfScience;
    }
    this.setBindingType = function(value) {
        this.bindingType = value;
    }
    this.getBindingType = function() {
        return this.bindingType;
    }
}