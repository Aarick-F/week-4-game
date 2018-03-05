$(document).ready(function() {

	const messages = [
	"Welcome to Saboteur; a game in which you plague\
	the mind of an adventurer and turn them against their party.\
	Select a character to begin...",
	"Look at them, so quick to defend themselves. It's almost as if\
	this were expected of you..."
	];

	let game = false;
	let knight = new Character("knight", 200, 50, 25);
	let wizard = new Character("wizard", 125, 75, 30);
	let cleric = new Character("cleric", 175, 50, 15);
	let rogue = new Character("rogue", 150, 60, 35);


	function printMessage(message) {
		let counter = 0;
		let parsed = "";
		let print = setInterval(function() {
			parsed += message[counter];
			$("#info").text(parsed);
			counter++;
			if(counter == message.length) {
				clearInterval(print);
			}
		}, 30);
	}

	function Character(name, health, attack, retaliation) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.retaliation;
		this.special = function() {
			primeSpecial(this.name);
		}
	}

	function primeSpecial(name) {
		switch(name) {
			case "knight":
			// Knight special effect here
			break;
			case "wizard":
			// Wizard special effect here
			break;
			case "clearic":
			// Cleric special effect here
			break;
			case "rogue":
			// Rogue special here
			break;
		}
	}

	printMessage(messages[0]);
	$("#menu").on("click", function() {
		printMessage(messages[1]);
	});

	$(".sprite").on("click", function() {
		console.log(this);
	});

});