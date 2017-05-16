$('.up').on('click', () => {
    $.ajax{
    	method: "POST",
    	url: '/trending/:vote/:id'
    }
});

$('.down').on('click', () => {
	 $.ajax{
    	method: "POST",
    	url: '/trending/:vote/:id'
    }
});