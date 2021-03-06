/* jshint browser: true */
/*globals $:false */
/* jshint -W097 */
/*jshint esversion: 6 */
/* jshint expr: true */
'use strict';

/* Set focus on the first field */

window.onload = function() {
  document.getElementById("name").focus();
};

/* -----JOB ROLE SECTION----- */

/* Function selects elements */

function OtherJobRoleInit() {
	this.roleSelectElement = document.getElementById('title');
	$('#other-title').hide();
	$('#other-title').prev().hide();
}

/* "Your job role" text field appears when user selects "Other" from the Job Role menu */

OtherJobRoleInit.prototype.otherJobRoleInputRevealing = function () {
	this.roleSelectElement.addEventListener('change', (e) => {
		if(this.roleSelectElement.value === 'other') {
			$('#other-title').show('slow');
			$('#other-title').prev().prev().show('slow');
		} else {
			$('#other-title').hide('slow');
			$('#other-title').prev().prev().hide('slow');
		}
	});
};

/* Making instation of OtherJobRole class and calling its method */
const otherJobSelector = new OtherJobRoleInit();
otherJobSelector.otherJobRoleInputRevealing();


/* -----T-shirt INFO SECTION----- */

function TShirtInfoInit() {
	this.tshirtDesignSelect = document.getElementById('design');
	this.tshirtColorMenuDiv = document.getElementById('colors-js-puns');
	this.tshirtColorMenu = document.getElementById('color');
	this.tshirtColorOptionsList = this.tshirtColorMenu.children;
	this.designsList = this.tshirtDesignSelect.children;
	this.pattern = /JS Puns/;
	this.pattern2 = /I ♥/;
	this.tshirtColorMenuDiv.style.display = 'none';
}

/* Function shows T-shirt color options based on the design selected. */

TShirtInfoInit.prototype.showingSelectedThemeColors = function () {
	this.tshirtColorMenuDiv.style.display = 'block';
	for (let i = 0; i < this.tshirtColorOptionsList.length; i++) {
		const colorInner = this.tshirtColorOptionsList[i].innerText;
		if(this.tshirtDesignSelect.value === 'js puns') {
			this.tshirtColorOptionsList[1].selected = true;
			if (this.pattern.test(colorInner)) {
				this.tshirtColorOptionsList[i].style.display = 'block';
			} else {
				this.tshirtColorOptionsList[i].style.display = 'none';
			}
		} else if(this.tshirtDesignSelect.value === 'heart js') {
			this.tshirtColorOptionsList[3].selected = true;
			if (this.pattern2.test(colorInner)) {
				this.tshirtColorOptionsList[i].style.display = 'block';
			} else {
				this.tshirtColorOptionsList[i].style.display = 'none';
			}
		}
	}
};

TShirtInfoInit.prototype.addOnChangeTShirtFormHandler = function () {
	this.tshirtDesignSelect.addEventListener('change', (e) => {
		tShirtInfoInit.showingSelectedThemeColors();
	});
};

const tShirtInfoInit = new TShirtInfoInit();
tShirtInfoInit.addOnChangeTShirtFormHandler();


/* -----REGISTER FOR ACTIVITIES SECTION----- */

function ActivitiesRegistrationInit() {
	this.totalElement = document.createElement('p');
	this.totalElement.setAttribute("id", "total");
	document.getElementsByClassName('activities')[0].appendChild(this.totalElement);
	const activitiesListElements = document.getElementsByClassName('activities')[0].children;
	this.activitiesList = [];
	this.datePattern = /(\w+)\s[\d+](\w+)-(\d+)(\w+)/;
	this.pricePattern = /\$(\d+)/;
	this.date = '';
	this.price;
	this.totalPrice = 0;

	for (let i = 0; i < activitiesListElements.length; i++) {
		this.activitiesList.push(activitiesListElements[i]);
	}
}

/* Function disables checkboxes which has conflicting dates */

ActivitiesRegistrationInit.prototype.sameDateCheckboxDisabled = function(element) {
	for (let i = 0; i < this.activitiesList.length; i++) {
		if(this.datePattern.test(this.activitiesList[i].innerText)) {
			const otherDate = this.activitiesList[i].innerText.match(this.datePattern)[0];
			if (this.date === otherDate && this.activitiesList.indexOf(element) != this.activitiesList.indexOf(this.activitiesList[i])) {
				this.activitiesList[i].firstChild.disabled = true;
				this.activitiesList[i].style.color = 'grey';
			}
		}

	}
};

/* Function enables checkboxes when conflicted date was unchecked */

ActivitiesRegistrationInit.prototype.checkboxesEnabled = function(element) {
	for (let i = 0; i < this.activitiesList.length; i++) {
		if(this.datePattern.test(this.activitiesList[i].innerText)) {
			const otherDate = this.activitiesList[i].innerText.match(this.datePattern)[0];
			if (this.date === otherDate) {
				this.activitiesList[i].firstChild.disabled = false;
				this.activitiesList[i].style.color = 'black';
			}
		}

	}
};

/* Function prints total price */

ActivitiesRegistrationInit.prototype.showTotalPrice = function(message) {
	const totalPriceContainer = document.getElementById('total');
	totalPriceContainer.innerText = message;
};

var activitiesRegistrationForm = new ActivitiesRegistrationInit();

activitiesRegistrationForm.activitiesList.forEach(function (element) {
	const input = element.firstChild;
	element.addEventListener('change', (e) => {
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
		}
	});
});

/* -----PAYMENT INFO SECTION----- */

function PaymentInfo () {
	this.paymentInfoMenu = document.getElementById('payment');
	this.creditCardDiv = document.getElementById('credit-card');
	this.paypalInfo = $('#credit-card').next();
	this.paypalInfo.hide();
	this.bitCoinInfo = $('#credit-card').next().next();
	this.bitCoinInfo.hide();
}

PaymentInfo.prototype.onchangeHandler = function() {
		if(this.paymentInfoMenu.value === 'paypal') {
			$('#credit-card').hide('slow');
			this.paypalInfo.show('slow');
			this.bitCoinInfo.hide('slow');
		} else if (this.paymentInfoMenu.value === 'credit card') {
			$('#credit-card').show('slow');
			this.paypalInfo.hide('slow');
			this.bitCoinInfo.hide('slow');
		} else if(this.paymentInfoMenu.value === 'bitcoin') {
			$('#credit-card').hide('slow');
			this.paypalInfo.hide('slow');
			this.bitCoinInfo.show('slow');
		}
};

var newPaymentInfo = new PaymentInfo();

document.getElementById('payment').addEventListener('change', (e) => {
	newPaymentInfo.onchangeHandler();
});

/* -----FORM VALIDATION----- */

/* Init function with selected html elements, error messages text and hiding those messages */

function FormValidator() {
	this.nameField = document.getElementById('name');
	this.emailField = document.getElementById('mail');
	this.ccNumber = document.getElementById('cc-num');
	this.zip = document.getElementById('zip');
	this.cvv = document.getElementById('cvv');
	this.emailPattern = /(\w+)@(\w+)\.(\w+)/;
	this.isNumberPattern = /^\d+$/;
	this.invalidMail = "Please, enter valid email addres";
	this.invalidCCNom = "Please, enter a number between 13 and 16";
	this.invalidZip = "Please, enter exactly 5 numbers";
	this.invalidCvv = "Please, enter exactly 3 numbers";

	$('input[type=text], input[type=email]').each(function(index) {
		$(this).before('<p style="color: red"></p>');
		$(this).prev().hide();
	});

	$('#total').after('<p style="color: red">Please, select at least one activity.</p>');
	$('#total').next().hide();

	$('button').after('<p style="color: red" id="submit-message">Please, check your entry and try again.</p>');
	$('button').next().hide();
}

/* Boolean functions, which check if input matches the pattern */

FormValidator.prototype.isFieldEmpty = function (selector) {
	return $(selector).val() === '';
};

FormValidator.prototype.isEmailValid = function () {
	return !this.isFieldEmpty('#mail') && this.emailPattern.test(this.emailField.value);
};

FormValidator.prototype.isCardNumberValid = function () {
	return !this.isFieldEmpty('#cc-num') && this.isNumberPattern.test(this.ccNumber.value) && this.ccNumber.value.length >= 13 && this.ccNumber.value.length <= 16 || newPaymentInfo.paymentInfoMenu.value === 'paypal' || newPaymentInfo.paymentInfoMenu.value === 'bitcoin';
};

FormValidator.prototype.isZipValid = function () {
	return !this.isFieldEmpty('#zip') && this.isNumberPattern.test(this.zip.value) && this.zip.value.length === 5 || newPaymentInfo.paymentInfoMenu.value === 'paypal' || newPaymentInfo.paymentInfoMenu.value === 'bitcoin';
};

FormValidator.prototype.isCvvValid = function () {
	return !this.isFieldEmpty('#cvv') && this.isNumberPattern.test(this.cvv.value) && this.cvv.value.length === 3 || newPaymentInfo.paymentInfoMenu.value === 'paypal' || newPaymentInfo.paymentInfoMenu.value === 'bitcoin';
};

FormValidator.prototype.isActivitiesValid = function () {
	let result = false;
	$('.activities label>input').each(function(e, el) {
		if (el.checked) {
			result = true;
		}
	});
	return result;
};

/* Function enables button on change activities and showing the message */

FormValidator.prototype.activitiesValidator = function() {
	$('.activities label>input').each( (e, el) => {
		el.addEventListener('change', (e) => {
				if (!this.isActivitiesValid()) {
					$('#total').next().show('slow');
				} else {
					$('#total').next().hide('slow');
					this.hideSubmitMessage();
				}
		});
	});
};

/* Function hides error message on change in payment menu */

FormValidator.prototype.ccValidator = function() {
	document.getElementById('payment').addEventListener('change', (e) => {
		$('#submit-message').hide();
	});
};

/* Function returns true when every condition is true  */

FormValidator.prototype.canSubmit = function () {
	return !this.isFieldEmpty('#name') && this.isEmailValid() && this.isCardNumberValid() && this.isZipValid() && this.isCvvValid() && this.isActivitiesValid();
};

/* Function changes input styles and shows error message when field is empty */

FormValidator.prototype.textFieldEmptyEvent = function (selector) {
	const labelName = $(selector).prev().prev().text();
	$(selector).prev().text('Enter your ' + labelName);
	if(this.isFieldEmpty(selector)) {
		$(selector).prev().show('slow');
		$(selector).css('border-color', 'red');
	} else {
		$(selector).prev().hide('slow');
		$(selector).css('border-color', 'green');
	}
};

/* Function changes input styles and shows error message when input value doesn't match the pattern  */

FormValidator.prototype.showingErrorMessageCondition = function (condition, selector, message) {
	$(selector).prev().text(message);
	if (condition) {
		$(selector).prev().show('slow');
		$(selector).css('border-color', 'red');
	} else {
		$(selector).prev().hide('slow');
		$(selector).css('border-color', 'green');
	}
};

/* Functions change messages depends on error */

FormValidator.prototype.emailConfirmationEvent = function () {
	if (this.isFieldEmpty('#mail')) {
		this.textFieldEmptyEvent('#mail');
	} else {
		this.showingErrorMessageCondition(!this.isEmailValid(), '#mail', this.invalidMail);
	}
};

FormValidator.prototype.creditCardConfirmationEvent = function () {
	if (this.isFieldEmpty('#cc-num')) {
		this.textFieldEmptyEvent('#cc-num');
	} else {
		this.showingErrorMessageCondition(!this.isCardNumberValid(), '#cc-num', this.invalidCCNom);
	}
};

FormValidator.prototype.zipConfirmationEvent = function () {
	if (this.isFieldEmpty('#zip')) {
		this.textFieldEmptyEvent('#zip');
	} else {
		this.showingErrorMessageCondition(!this.isZipValid(), '#zip', this.invalidZip);
	}
};

FormValidator.prototype.cvvConfirmationEvent = function () {
	if (this.isFieldEmpty('#cvv')) {
		this.textFieldEmptyEvent('#cvv');
	} else {
		this.showingErrorMessageCondition(!this.isCvvValid(), '#cvv', this.invalidCvv);
	}
};

/* Function enables/disables form submission  */

FormValidator.prototype.enableSubmitEvent = function () {
	$("form").unbind().submit((e) => {
		if (!this.canSubmit()) {
			e.preventDefault();
			$('button').next().show('slow');
		}
 	});
};

FormValidator.prototype.hideSubmitMessage = function () {
	$('#submit-message').css('display', (index) => {
		if(this.canSubmit()) {
			return index = 'none';
		}
	});
};

/* Function shows error messages based on error type on keyup and focusout */

FormValidator.prototype.addValidationEvent = function () {
	$('#name').focusout(() => {this.textFieldEmptyEvent('#name')}).keyup(() => {this.textFieldEmptyEvent('#name')}).keyup(() => {this.hideSubmitMessage()});
	$('#mail').focusout(() => {this.emailConfirmationEvent()}).keyup(() => {this.emailConfirmationEvent()}).keyup(() => {this.hideSubmitMessage()});
	$('#cc-num').focusout(() => {this.creditCardConfirmationEvent()}).keyup(() => {this.creditCardConfirmationEvent()}).keyup(() => {this.hideSubmitMessage()});
	$('#zip').focusout(() => {this.zipConfirmationEvent()}).keyup(() => {this.zipConfirmationEvent()}).keyup(() => {this.hideSubmitMessage()});
	$('#cvv').focusout(() => {this.cvvConfirmationEvent()}).keyup(() => {this.cvvConfirmationEvent()}).keyup(() => {this.hideSubmitMessage()});
	$('button').click(() => {this.emailConfirmationEvent();
				this.creditCardConfirmationEvent();
				this.zipConfirmationEvent();
				this.cvvConfirmationEvent();
				if (!this.isActivitiesValid()) {
					$('#total').next().show('slow');
				} else {
					$('#total').next().hide('slow');
				}
		});
	this.activitiesValidator();
	this.ccValidator();
};

var newFormValidator = new FormValidator();

newFormValidator.addValidationEvent();
newFormValidator.enableSubmitEvent();
