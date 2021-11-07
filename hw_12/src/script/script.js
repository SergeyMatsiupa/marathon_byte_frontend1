// scroll page to ID 
$('#product-link-id').on('click', function(e){
    e.preventDefault();
    $('html,body').animate({scrollTop: $('#features-id').offset().top}, 200)
})