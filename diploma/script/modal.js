$('.modal-overlay').on('click',function(e){
    if($(e.target).closest('.modal').length==0) {
        $(this).fadeOut();
    }
    
})

$('.close').on('click', function() {
    $(this).parents('.modal-overlay').fadeOut();
})

$('#modal-button').on('click',function(){
    $('#modal-1').fadeIn();
})

// open 2nd modal
$('#get-start-btn-1').on('click',function(){
    $('#modal-2').fadeIn();
})