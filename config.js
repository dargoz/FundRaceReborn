
var currMenu = "home";
var names = [];
var items = [];


function init(){
	items = document.getElementsByClassName('nav-link');

	// Leave out Storagef
	//require("firebase/storage");

	for(var i = 0; i<items.length; i++){
		names[i] = items[i].name;
		console.log(names[i]);
	}

	items[0].addEventListener('click', function(event){
		changeMenu(names[0]);
	});
	items[1].addEventListener('click', function(event){
		changeMenu(names[1]);
	});
	items[2].addEventListener('click', function(event){
		changeMenu(names[2]);
	});
	items[3].addEventListener('click', function(event){
		changeMenu(names[3]);
	});
	items[4].addEventListener('click', function(event){
		changeMenu(names[4]);
	});
}

function nextPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex+1;
	NxtIndex %= items.length;	

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[NxtIndex])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[NxtIndex], 'next');
}

function prevPage(){
	var NxtIndex = 0;
	var CurrIndex = 0;
	for (var i = 0; i<names.length; i++){
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}
	NxtIndex = CurrIndex-1;
	if (NxtIndex < 0) NxtIndex += items.length;

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(names[NxtIndex])[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, names[NxtIndex], 'prev');
}


function changeMenu(menuName){
	console.log(menuName);
	if (currMenu == menuName) return;


	var NxtIndex = 0;
	var CurrIndex = 0;

	for (var i = 0; i<names.length; i++){
		if(menuName == names[i]) {
			NxtIndex = i;
		}
		if(currMenu == names[i]) {
			CurrIndex = i;
		}
	}

	var curr = document.getElementsByClassName(currMenu)[0];
	var nxt = document.getElementsByClassName(menuName)[0];

	doChange(curr, nxt, CurrIndex, NxtIndex, menuName, 'next');
}

function doChange(curr, nxt, CurrIndex, NxtIndex, menuName, to){
	nxt.classList.toggle('ready--' + to);
	curr.classList.toggle('menu--off--' + to);
	window.setTimeout(function(){
		nxt.classList.toggle('ready--' + to);
		nxt.classList.toggle('menu--on');	
	}, 100);
	curr.classList.toggle('menu--on');
	items[CurrIndex].classList.remove('active');
	items[NxtIndex].classList.toggle('active');

	window.setTimeout(function(){
		curr.classList.toggle('menu--off--' + to);
	}, 500);

	currMenu = menuName;
}