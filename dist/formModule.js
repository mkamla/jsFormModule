(function($,window){
	'use-strict';
	var model = {},
		view = {},
		controller = {},
		actionURL;

	//private functions

	model.formData = {};
	model.validated = null;
	model.validateField = function(data,fieldName){
		if(fieldName==='name' && data.length >= 4){
			model.formData[fieldName] = data;
		}else if(fieldName==='email' && data.length >= 6){
			model.formData[fieldName] = data;
		}else if(fieldName==='message' && data.length >= 4){
			model.formData[fieldName] = data;
		} else {
			//show form error view
			model.validated = false;
			view.validationError(fieldName);
			return false;
		}
	};

	model.submit = function(data,callback){	
		//Sending form data to server'	
		$.ajax({
			type: 'POST',
			url: actionURL,
			data: data,
			success:  function(data){
				if(data.length && callback){
					callback();
				}
			}
		});
	};

	model.validate = function(form){
		var requiredFields = {},
		formField = view.form.find('input[type="text"],input[type="email"],textarea');

		view.removeErrorClass();

		$.each(formField,function(){
			var field = $(this),
				fieldName = field.attr('name'),
				fieldValue = field.val(),
				fieldValidation = field.attr('data-validation');
			if(fieldValidation ==='required'){
				model.validateField(fieldValue,fieldName);
			} else {
				model.formData[fieldName] = fieldValue;
			}
		});

		if(typeof(model.validated)==='undefined' || model.validated!== false){
			// Submit the form data
			model.submit(model.formData);
		}
	};

	var modelPublic = {
		submit: model.submit,
		validate: model.validate
	};


	//---VIEW

	view.hideForm = function(){
		self.form.hide();
	};

	view.showForm = function(){
		if($('.form-success').length){
			$('.form-success').remove();
		}
		self.form.show();
	};

	view.clearForm = function(){
		var formField = self.form.find('input[type="text"],input[type="email"],textarea');

		$.each(formField,function(){
			var field = $(this);
			field.val('');
		});
	};

	view.removeErrorClass = function(){
		view.form.find('input, textrea').removeClass('form-input-error');
	};

	view.validationError = function(fieldName){
		view.form.find('[name="'+fieldName+'"]').focus().addClass('form-input-error');
	};

	view.sendError = function(){

	};

	view.sendSuccess = function(){
		hideForm();
		self.form.after('<div class="form-success"><h2>Thank you!</h2><h3>Your message was successfully sent.</h3><a href="#" class="btn">Okay!</a></div>');
		$('.form-success .btn').on('click',function(e){
			e.preventDefault();
			clearForm();
			showForm();
		});
	};

	var viewPublic = {
		removeErrorClass: view.removeErrorClass,
		validationError: view.validationError,
		sendError: view.sendError,
		sendSuccess: view.sendSuccess
	};


	//--CONTROLLER

	controller.formSubmit = function(e){
		e.preventDefault();
		model.validate(view.form);
	};

	var controllerPublic = {
		formSubmit: controller.formSubmit
	};

	var init = function(target,actionURL){
		console.log('ContactForm initialized');

		view.form = $(target);
		view.formParent = $(target).parent();
		actionURL = actionURL;

		view.submitBtn = view.form.find('input[type="submit"]');

		if(view.submitBtn){
			view.submitBtn.bind('click',function(e){
				controller.formSubmit(e);
			});
		}
	};

	// public methods and properties to be returned
	var formHandler = {
		model: modelPublic,
		view: viewPublic,
		controller: controllerPublic,
		init: init
	};

	//transport
	if(typeof(define) === 'function' && define.amd){
		//AMD
		define(formHandler);
	} else if (typeof(exports)==='object'){
		//CommonJS
		module.exports = formHandler;
	} else {
		//browser global
		window.formHandler = formHandler;
	}
}(jQuery,window));