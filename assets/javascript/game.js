$(document).ready(() => {

	const messages = ["Welcome to Saboteur, a game in which you\
										plague the mind of a party member and turn\
										them against their friends! Select a character\
										to continue",
										"Look at how quick they are to defend themselves...\
										it's almost as if this were expected of you. Select\
										your first target.",
										"Target slain. Select another!",
										"You are victorious...and now lonely. Click here to start again."];

	let game = true;
	let pickedChars = [];
	let attacker;
	let defender;
	let playerSprite;
	let defenderSprite;
	let wins = 0;

	$("#info").html("<div class='message'>" + messages[0] + "</div>");


	$(".sprite").on("click", function(event) {
    if(attacker == undefined) {
      playerSprite = $(this);
      let picked = event.target.id;
      pickedChars.push(picked);
      getPlayer(picked, "attacker");
      $("#fighters").append(playerSprite);
      $("#party").append($("#arena"));
      $("#pit").css("flex", "2");
      $("#info").html("<div class='message'>" + messages[1] + "</div>");
      console.log("attacker is " + attacker.name);
    } else if(attacker != undefined && defender == undefined) {
      let picked = event.target.id;
      defenderSprite = $(this);
      if (pickedChars.indexOf(picked) == -1) {
        pickedChars.push(picked);
        getPlayer(picked, "defender");
        $("#fighters").append(defenderSprite);
        console.log("defender is " + defender.name);
      }
    }
  });

  $("body").on("click", "#attackButton", () => {
    if(game) {
  		 combat();
    }
  });

  $("#info").on("click", function() {
  	if(!game) {
  		window.location.reload();
  	}
  });

	function getPlayer(name, player) {
		if(player == "attacker") {
			switch (name) {
        case "knight":
          attacker = new Character("knight", 200, 40, 15);
          break;
        case "wizard":
          attacker = new Character("wizard", 125, 60, 5);
          break;
        case "cleric":
          attacker = new Character("cleric", 175, 40, 5);
          break;
        case "rogue":
          attacker = new Character("rogue", 150, 50, 10);
          break;
      }
    } else if(player == "defender") {
      	switch (name) {
        case "knight":
          defender = new Character("knight", 200, 40, 15);
          break;
        case "wizard":
          defender = new Character("wizard", 125, 60, 5);
          break;
        case "cleric":
          defender = new Character("cleric", 175, 30, 5);
          break;
        case "rogue":
          defender = new Character("rogue", 150, 50, 10);
          break;
      }
      if (wins < 3) {
        updateBoard();
      }
		}
	}

	function updateBoard() {
		$("#info").html("");
    $("#info").append("<div><h1>PLAYER HP:</h1> <h1>" + attacker.health + "</h1></div>");
    $("#info").append("<div><h1>" + defender.name.toUpperCase() + " HP:</h1> <h1>" + defender.health + "</h1></div>");
    $("#info").append("<div id='attackButton'>ATTACK</div>");
	}

	function combat() {
    if (attacker.health > 0 && defender.health > 0) {
      attacker.health = attacker.health - defender.retaliation;
      defender.health = defender.health - attacker.attack;
      updateBoard();
      if (attacker.health <= 0 && defender.health > 0) {
        // lose condition
        game = false;
        console.log("You have died, Saboteur.");
      } else if (defender.health <= 0 && attacker.health > 0) {
        if (wins < 3) {
        	wins++;
          $("#info").html("<div class='message'>" + messages[2] + "</div>");
          defenderSprite.remove();
          defender = undefined;
        }
        if(wins == 3) {
          // win condition
          game = false;
          $("#info").html("<div class='message'>" + messages[3] + "</div>");
        }
      }
    }
  }

	function Character(name, health, attack, retaliation) {
		this.name = name;
		this.health = health;
		this.attack = attack;
		this.retaliation = retaliation;
	}

});