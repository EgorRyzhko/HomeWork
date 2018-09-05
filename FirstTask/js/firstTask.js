function changePage(){
	window.location = "https://learn.javascript.ru/";
};

function changePageStyle() {
	var buttons = document.querySelectorAll('.buttons_item');
	var li = document.getElementsByTagName('li');
	document.body.style.background = "url('img/Olgerd.png')";
	document.body.style.backgroundSize = "cover";

	for (var i = 0; i < buttons.length; i ++) {
		buttons[i].style.backgroundColor = "#0000FF";
		buttons[i].style.color = "#fff";
		buttons[i].style.fontFamily = 'Arial';
	}

	for (var i = 0; i < li.length; i ++) {
		li[i].style.marginLeft = "60px";

	}

	document.getElementById('afterChange').style.cssText = "\
		display: flex; \
		flex-direction: row; \
		margin-top: 270px; \
	";
};

function createNewPage() {
	document.body.innerHTML = "";

	var container = document.createElement("div");
	container.id = "container";

	var header = document.createElement("div");
	header.id = "header";
	var logo = document.createElement("div");
	logo.id = "logo";
	logo.innerHTML = '<img src="img/logo.png" alt="logo">'
	var menuContainer = document.createElement("div");
	menuContainer.id = "menuContainer";

	var menu = document.createElement("ul");
	menu.id = "menu";
	var firstLi = document.createElement("li");
	firstLi.innerHTML = '<a href="#" class="menu-item">HOME</a>'
	var secondLi = document.createElement("li");
	secondLi.innerHTML = '<a href="#" class="menu-item">SERVICES</a>'
	var thirdLi = document.createElement("li");
	thirdLi.innerHTML = '<a href="#" class="menu-item">PORTFOLIO</a>'
	var forthLi = document.createElement("li");
	forthLi.innerHTML = '<a href="#" class="menu-item">ABOUT</a>'
	var fifthLi = document.createElement("li");
	fifthLi.innerHTML = '<a href="#" class="menu-item">CONTACT</a>'

	var titles = document.createElement('div');
	titles.id = 'titles';
	titles.innerHTML = "<h2 style='font-size:40px'>WELCOME TO OUR STUDIO!</h2>"
	titles.innerHTML += "<h1 style='font-size:60px'>IT'S NICE TO MEET YOU :)</h1>"

	header.appendChild(logo);
	menu.appendChild(firstLi);
	menu.appendChild(secondLi);
	menu.appendChild(thirdLi);	
	menu.appendChild(forthLi);
	menu.appendChild(fifthLi);	
	menuContainer.appendChild(menu);
	header.appendChild(menuContainer);	
	container.appendChild(header);
	container.appendChild(titles);	
	document.body.appendChild(container);

	document.body.style.cssText = "\
	font-family: Arial; \
	background: url(img/first-bg.jpg) no-repeat top / cover; \
	";

	document.getElementById('container').style.cssText = "color: #fff; \
	 	display: flex; \
	 	flex-direction: column; \
	 	justify-content: space-around; \
	 	align-items: center; \
	";

	document.getElementById('header').style.cssText = "display: flex; \
		flex-direction: row; \
		justify-content: space-between; \
		width: 70%; \
		margin-top: 40px; \
	";

	document.getElementById('menu').style.cssText = "\
		display: flex; \
		justify-content: space-around; \
		list-style: none; \
	";

	var menuItems = document.getElementsByClassName("menu-item");
	for (var i = 0; i < menuItems.length; i++) {	
	menuItems[i].style.cssText = "\
		text-decoration: none; \
		color: #fff; \
		margin-right: 20px; \
	";
	}

	document.getElementById('titles').style.cssText = "\
		display: flex; \
		flex-direction: column; \
		justify-content: center; \
		margin-top: 220px; \
		align-items: center; \
	";
}	