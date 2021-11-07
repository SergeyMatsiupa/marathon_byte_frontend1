// for close modal window by clicking outside of it
$('.modal-overlay').on('click',function(e){
    if($(e.target).closest('.modal-wnd').length==0) {
        $(this).fadeOut();
    }
})

// for close modal window clicking on the Close button
$('.close-wnd').on('click', function() {
    $(this).parents('.modal-overlay').fadeOut();
})

// for to show modal window try for free
$('#try-for-free-btn, #try-for-free-btn-2').on('click',function(){
    $('#modal-wnd-free-id').fadeIn();
})

//for download file clicking on button
$("#download-btn-id").click(function (e) {
    e.preventDefault();
    let fileName;
    switch($('input[name="os-radio"]:checked').val()) {
        case 'win-radio':
            fileName = 'wnd.dat';
            break;
        case 'mac-radio':
            fileName = 'mac.dat';
            break;
        default:
            fileName = 'lnx.dat';
            break;
       }
    window.location.href 
        = `files/${fileName}`;
});