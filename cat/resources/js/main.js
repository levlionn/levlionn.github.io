let main = document.querySelector("main");
let audio = document.querySelector("audio");

let currentClip = 1;

function randomClip(){
	let n = Math.floor(Math.random() * 6) + 1;
	while(n === currentClip){
		n = Math.floor(Math.random() * 6) + 1;
	}
	currentClip = n;
	return `resources/audio/${n}.mp3`;	
}
//////////////////////////////////////////////

let cc = 10; //catcount

for(let i=0; i<cc;i++){
	let row = document.createElement("div");
	row.classList.add("row");
	for(let j=0;j<5;j++){
		let img = document.createElement("img");
		img.src = "resources/images/cat.png";
		row.appendChild(img);
		img.addEventListener("click", function(){
			img.classList.add("bigger");
			audio.src = randomClip();
			audio.play();
			setTimeout(function(){
				img.classList.remove("bigger");
			},500)
		});
	}
	main.appendChild(row);
}


