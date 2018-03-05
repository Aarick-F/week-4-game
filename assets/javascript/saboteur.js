$(document).ready(function() {

	const messages = [
	"Welcome to Saboteur; a game in which you plague\
	the mind of an adventurer and turn them against their party.\
	Select a character to begin...",
	"Look at them, so quick to defend themselves. It's almost as if\
	this were expected of you..."
	];

	const charcterCheck = ["knight", "wizard", "cleric", "rogue"];

	let game = false;
	let player;
	let defender;
	let knight = new Character("knight", 200, 50, 25);
	let wizard = new Character("wizard", 125, 75, 30);
	let cleric = new Character("cleric", 175, 50, 15);
	let rogue = new Character("rogue", 150, 60, 35);

	init();


	function init() {
		printMessage(messages[0]);
	}

	function selectPlayer() {
		game = true;
		$(".sprite").on("click", function(event) {
			if(game == true && player == undefined) {
				let playerSelection = event.target.id;
				switch(playerSelection) {
					case "knight":
					player = knight;
					break;
					case "wizard":
					player = wizard;
					break;
					case "cleric":
					player = cleric;
					break;
					case "rogue":
					player = rogue;
				}

				// Updates the screen after initial player selection
				let playerSprite = $(this);
				$("#playerSelection").append(playerSprite);
				$("#npc").append($("#arena"));
				$("#pit").css("flex", "2");
			}
		});
	}

	function printMessage(message) {
		game = false;
		$(".sprite").css("cursor", "mouse");
		let counter = 0;
		let parsed = "";
		let print = setInterval(function() {
			parsed += message[counter];
			$("#info").text(parsed);
			counter++;
			if(counter == message.length) {
				clearInterval(print);
				game = true;
				$(".sprite").css("cursor", "pointer");
				selectPlayer();
			}
		}, 30);
	}

	function Character(name, health, attack, retaliation) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.retaliation;
	}
});