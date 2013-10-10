function generateMadlib() {
	validate();
	return false;
}

function validate() {
	if ($("#text-name").val() != "") {
		// Correct!
	} else {
		alert("You must enter your name!");
		return false;
	}

	if ($("input[name=rb-gender]:checked").length > 0) {
		// Correct!
	} else {
		alert("You must specify your gender!");
		return false;
	}
	
	if ($("#sel-animal").val() != "") {
		// Correct!
	} else {
		alert("You must specify your favorite animal!");
		return false;
	}
	
	if ($("input[id=cb-foods]:checked").length > 0) {
		// Correct!
	} else {
		alert("You must specify foods you like!");
		return false;
	}
	
	if ($("#text-number").val() != "") {
		// Correct!
		if ($.isNumeric($("#text-number").val())) {
			// Correct!
		} else {
			alert("Your lucky number must be numeric!");
			return false;
		}
	} else {
		alert("You must enter your lucky number!");
		return false;
	}
	
	printMadlib();
}

function printMadlib() {
	$("#madlib-output").text(madLib());
}

function madLib() {
	var genderStrDict = [["guy","girl"],["he","she"],["He","She"],["him","her"],["his","her"]];
	var isFemale = ($("input[id=rb-gender]:checked").val() == "female")?1:0;
	var foodsStr = "";
	var numFoods = $("#cb-foods:checked").length;
	var count = 0;
	$("#cb-foods:checked").each(function() {
		count += 1;
		if (count < numFoods) {
			foodsStr += $(this).val() + ", ";
		} else {
			foodsStr += "and " + $(this).val();
		} 
	});
	var str = "I once met this " + genderStrDict[0][isFemale] + " called ";
	str += $("#text-name").val() + ". " + genderStrDict[2][isFemale] + " was ";
	str += "a huge weirdo. I once saw " + genderStrDict[3][isFemale] + " run ";
	str += "down the street yelling \"I am a " + $("#sel-animal").val() + "!\"";
	str += " in front of everybody. I also saw " + genderStrDict[3][isFemale];
	str += " drink " + $("#text-number").val() + " beers, start a bar fight, ";
	str += "then proceed to rub " + foodsStr + " all over ";
	str += genderStrDict[4][isFemale] + " body.  Wait, come to think of it, ";
	str += "that was me!";
	return str; 
}

$(document).ready(function() {
	$("#madlib-input").submit(generateMadlib);
	console.log("ready!");
});

