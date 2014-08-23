

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
			formHandler.init('#sample-form');
		});
	</script>

###HTML form body
Inputs that are required, give class attribute value of 'required'

	<form id="sample-form" action="POST">

		<input type="text" class="required" name="email" />

	</form>