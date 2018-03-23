jQuery(function($){

	// Anchor
	$('a[href^="#"]').click(function(){
		var $this = $(this);
		$($this.attr('href')).attr('tabindex','0').fadeIn().focus();
		$(window).keydown(function(e){
			if(e.keyCode == 27){
				$('.modal').fadeOut();
				$this.focus();
			}
		});
		// Modal Close
		$('.modal .close').click(function(){
			$(this).closest('.modal').fadeOut();
			$this.focus();
			});
	});

	/* 사용자정의 jQuery */
	

});
