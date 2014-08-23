

# jsFormModule

A modular javascript/jQuery form validator with AJAX form processing

##Install

###Command Line
`git clone https://github.com/mkamla/jsFormModule`

###Bower
`bower install js-form-module`


##Basic Usage	
	<script type="text/javascript" src="jquery/jquery.min.js"></script		
	<script type="text/javascript" src="dist/jsFormModule.min.js"></script

	<script type="text/javascript">
		$(document).ready(function(){
			formModule.init('#sample-form','path/to/form-processor');
		});
	</script>

The `formHandler.init()` function accepts two arguments. The first argument is the jQuery selector of the form you wish to initialize. The second argument is a string used for the [form action attribute](http://www.w3.org/TR/html401/interact/forms.html#h-17.3). The value serves as the destination path for the `$.ajax()` call inside the module.

###HTML body
Input fields that are required, should be given a class attribute value of 'required'. 

	<form id="sample-form" action="POST">

		<input type="text" class="required" name="email" />

	</form>