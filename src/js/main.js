// Add main scripts here
jQuery(document).ready(function(){

    $('a[href="#"]').click(function(e) {
    	e.preventDefault();
        console.log(jQuery(this).attr('id'),"is clicked!");
	 });

});