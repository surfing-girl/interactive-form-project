'use strict';

//1. Set focus on the first field-->autofocus?


/* -----JOB ROLE SECTION----- */

/* Function selects elements */

function OtherJobRole() {
	this.roleSelectElement = document.getElementById('title');
	this.other_title = document.getElementById('other-title');
}

/* "Your job role" text field appears when user selects "Other" from the Job Role menu */

OtherJobRole.prototype.otherJobRoleInputRevealing = function () {
	this.roleSelectElement.addEventListener('change', (e) => {
		if(this.roleSelectElement.value === 'other') {
			$(this.other_title).toggle('slow');
		} else {
			$(this.other_title).hide('slow');
		};
	})
};

/* Making instation of OtherJobRole class and calling its method */
const otherJobSelector = new OtherJobRole();
otherJobSelector.otherJobRoleInputRevealing();

//3. --T-shirt INFO SECTION--
	//a) for the t-shirt color menu, only display the options that match the design selected in the menu
		//--> if 'Theme-js Puns' then color menu should only display it's colors

// function tShirtSelection() {
//
// }

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


function ActivitiesRegistration () {
	var activitiesListElements = document.getElementsByClassName('activities')[0].children;
	this.activitiesList = [];
	this.datePattern = /(\w+)\s[\d+](\w+)-(\d+)(\w+)/;
	this.pricePattern = /\$(\d+)/;
	this.date = '';
	this.price;
	this.totalPrice = 0;

	for (var i = 0; i < activitiesListElements.length; i++) {
		this.activitiesList.push(activitiesListElements[i]);
	}
}

ActivitiesRegistration.prototype.sameDateCheckboxDisabled = function(element) {
	for (let i = 0; i < this.activitiesList.length; i++) {
		if(this.datePattern.test(this.activitiesList[i].innerText)) {
			var otherDate = this.activitiesList[i].innerText.match(this.datePattern)[0];
			if (this.date === otherDate && this.activitiesList.indexOf(element) != this.activitiesList.indexOf(this.activitiesList[i])) {
				this.activitiesList[i].firstChild.disabled = true;
			};
		};

	};
};

ActivitiesRegistration.prototype.checkboxesEnabled = function(element) {
	for (var i = 0; i < this.activitiesList.length; i++) {
		if(this.datePattern.test(this.activitiesList[i].innerText)) {
			var otherDate = this.activitiesList[i].innerText.match(this.datePattern)[0];
			if (this.date === otherDate) {
				this.activitiesList[i].firstChild.disabled = false;
			};
		};

	};
};

ActivitiesRegistration.prototype.showTotalPrice = function(message) {
	var totalPriceContainer = document.getElementById('total');
	totalPriceContainer.innerText = message;
};

var activitiesRegistrationForm = new ActivitiesRegistration();


activitiesRegistrationForm.activitiesList.forEach(function (element) {
	var input = element.firstChild;
	element.onchange = function () {
		if(activitiesRegistrationForm.datePattern.test(element.innerText)){
			activitiesRegistrationForm.date = element.innerText.match(activitiesRegistrationForm.datePattern)[0];
		} else {
			activitiesRegistrationForm.date = '';
		}
		if (activitiesRegistrationForm.pricePattern.test(element.innerText)) {
			activitiesRegistrationForm.price = parseInt(element.innerText.match(activitiesRegistrationForm.pricePattern)[1]);
		} else {
			activitiesRegistrationForm.price='';
		}

		if (input.checked) {
			activitiesRegistrationForm.totalPrice += activitiesRegistrationForm.price;
			activitiesRegistrationForm.showTotalPrice('Total: ' + activitiesRegistrationForm.totalPrice);
			activitiesRegistrationForm.sameDateCheckboxDisabled(element);
		} else {
			activitiesRegistrationForm.checkboxesEnabled();
			activitiesRegistrationForm.totalPrice -= activitiesRegistrationForm.price;
			activitiesRegistrationForm.showTotalPrice('Total: ' + activitiesRegistrationForm.totalPrice);
		};
	};
});

//5. --PAYMENT INFO SECTION--
function PaymentInfo () {
	this.paymentInfoMenu = document.getElementById('payment');
	this.creditCardDiv = document.getElementById('credit-card');
	this.selectOptions = [];
	this.menuChildren = this.paymentInfoMenu.children;
	$('#payment').next().hide();
	$('.info').hide();
	$('#credit-card').hide();
	for (var i = 0; i < this.menuChildren.length; i++) {
		this.selectOptions.push(this.menuChildren[i]);
	};
}

PaymentInfo.prototype.onchangeHandler = function() {
	var infoSib = document.getElementsByClassName('info');
		if(this.paymentInfoMenu.value === 'paypal') {
			$('#credit-card').hide('slow');
			$(infoSib[0]).show('slow');
			$(infoSib[1]).hide('slow');
			$('#payment').next().hide('slow');
		} else if (this.paymentInfoMenu.value === 'credit card') {
			$('#credit-card').show('slow');
			$(infoSib[0]).hide('slow');
			$(infoSib[1]).hide('slow');
			$('#payment').next().hide('slow');
		} else if(this.paymentInfoMenu.value === 'bitcoin') {
			$('#credit-card').hide('slow');
			$(infoSib[0]).hide('slow');
			$(infoSib[1]).show('slow');
			$('#payment').next().hide('slow');
		} else if(this.paymentInfoMenu.value === 'select_method') {
			$('#credit-card, infoSib[0], infoSib[1]').hide('slow');
			$('#payment').next().show('slow');
		}
};

var newPaymentInfo = new PaymentInfo();

document.getElementById('payment').addEventListener('change', function () {
	newPaymentInfo.onchangeHandler();
})

//6. --FORM VALIDATION--
function FormValidator() {
	this.nameField = document.getElementById('name');
	this.emailField = document.getElementById('mail');
	this.ccNumber = document.getElementById('cc-num');
	this.zip = document.getElementById('zip');
	this.cvv = document.getElementById('cvv');
	this.emailPattern = /(\w+)@(\w+)\.(\w+)/;
	$('#mail').next().hide();
}

FormValidator.prototype.textValidator = function () {
			if (this.value === '') {
				$(this).next().show('slow');
				$(this).css('border-color', 'firebrick');
			} else {
				$(this).next().hide('slow');
				$(this).css('border-color', 'green');
			};
		}

FormValidator.prototype.textFieldValidator = function() {
	$('input[type=text]').each(function (i, el) {
		$(this).keyup(newFormValidator.textValidator);
	});
};

FormValidator.prototype.emailFieldValidator = function() {
	if(!this.emailPattern.test(this.emailField.value)) {
		$('#mail').next().show('slow');
		$('#mail').css('border-color', 'firebrick');
	} else {
		$('#mail').next().hide('slow');
		$('#mail').css('border-color', 'green');
	};
};

FormValidator.prototype.activitiesValidator = function() {
	$('#total').next().hide();
	$('.activities label>input').each(function(e, el) {
		el.onchange = function () {
			if (el.checked) {
				$('#total').next().hide();
			} else {
				$('#total').next().show();
			};
		}
	});
}

FormValidator.prototype.submitButtonClickHandler = function() {
	this.textFieldValidator();
};

var newFormValidator = new FormValidator();

newFormValidator.textFieldValidator();

$('#mail').keyup(function(){
	newFormValidator.emailFieldValidator()
});

newFormValidator.activitiesValidator();

$('input').focusout(function () {
	if($(this).val() === '') {
		$(this).next().show('slow');
		$(this).css('border-color', 'firebrick');
	}
});

$('form').submit(function (event) {
	event.preventDefault();
	if ($('#payment').val() === 'select_method') {
		$('#payment').next().show('slow');
	};
	$('input').each(function (i, el) {
		if ($(el).val() === '') {
			$(this).next().show('slow');
			$(this).css('border-color', 'firebrick');
		}

	});
})

	//a) Name field can't be empty
	//b) Email field must be valid--regex
	//c) At least one activity must be checked
	//d) Payment option must be selected
	//e) Fields in the credit card must be filled
//7. --EXTRA CREDIT--
	//a) Hide the Color label and select field until t-shirt design is selected
	//b) style select menus like the rest of input fields
	//c) Validate the credit card number
