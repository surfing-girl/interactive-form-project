'use strict';

//1. Set focus on the first field-->autofocus?
//2. --JOB ROLE SECTION--
	//a) reveal a text field when the "other" option is selected from a job role menu
		//--> add an text input field
		//--> id 'other-title' for the field
		//--> placeholder 'your title' for the field

var roleSelectElement = document.getElementById('title');
roleSelectElement.onchange = function () {
	if(roleSelectElement.value == 'other') {
		$('#other-title').toggle('slow');
	} else {
		$('#other-title').hide('slow');
	};
}
//3. --T-shirt INFO SECTION--
	//a) for the t-shirt color menu, only display the options that match the design selected in the menu
		//--> if 'Theme-js Puns' then color menu should only display it's colors
var tshirtDesignSelect = document.getElementById('design');
var tshirtColorMenu = document.getElementById('color');
var tshirtOptionsList = tshirtColorMenu.children;
var designsList = tshirtDesignSelect.children;

for (var i = 0; i < tshirtOptionsList.length; i++) {
	tshirtOptionsList[i].style.display = 'none';
};

tshirtDesignSelect.onchange = function () {
	tshirtColorMenu.disabled = false;
	for (var i = 0; i < tshirtOptionsList.length; i++) {
		if(tshirtOptionsList[i].value == 'choose-design') {
			tshirtColorMenu.removeChild(tshirtOptionsList[i]);
		}
	};
	for (var i = 0; i < designsList.length; i++) {
		if(designsList[i].value == 'select theme') {
			tshirtDesignSelect.removeChild(designsList[i]);
		}
	};

	var pattern = /JS Puns/;
	var pattern2 = /I ♥/;

	for (var i = 0; i < tshirtOptionsList.length; i++) {
		var colorInner = tshirtOptionsList[i].innerText;
		if(tshirtDesignSelect.value === 'js puns') {
			tshirtOptionsList[1].selected = true;
			if (pattern.test(colorInner)) {
				tshirtOptionsList[i].style.display = 'block';
			} else {
				tshirtOptionsList[i].style.display = 'none';
			};
		} else if(tshirtDesignSelect.value === 'heart js') {
			tshirtOptionsList[3].selected = true;
			if (pattern2.test(colorInner)) {
				tshirtOptionsList[i].style.display = 'block';

			} else {
				tshirtOptionsList[i].style.display = 'none';
			};
		};
	};
};

//4. --REGISTER FOR ACTIVITIES SECTION--
	//a) don't allow to select an event which is at the same time as selected before
	$('input[name=all]').change(function () {
		if (this.checked) {
			$('.activities input:not(input[name=all])').attr('disabled', true);
			console.log('checked');
		} else {
			$('.activities input').attr('disabled', false);
		};
	})
	//b) when user unchecks the competing event he shuld be able to select the event
	//c) as user selects activities total to pay is displayed below checkboxes
//5. --PAYMENT INFO SECTION--
	//a) user selects the default 'Credit card' payment option, display the #credit-card div and hide the rest
	//b) etc...
//6. --FORM VALIDATION--
	//a) Name field can't be empty
	//b) Email field must be valid--regex
	//c) At least one activity must be checked
	//d) Payment option must be selected
	//e) Fields in the credit card must be filled
//7. --EXTRA CREDIT--
	//a) Hide the Color label and select field until t-shirt design is selected
	//b) style select menus like the rest of input fields
	//c) Validate the credit card number
		