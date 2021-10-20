
$('.about-items > div').on('click',function(){
    $(this).children('.about-icon').toggleClass('active');
    $(this).parent('.about-items').toggleClass('toggleBg')
    $(this).children('.about-position').toggleClass('toggleBg');
    $(this).children('.about-location').toggleClass('toggleBg');
    $(this).children('.about-location').toggleClass('toggleColor');
    $(this).toggleClass('toggleColor')
    $(this).next('p').slideToggle(300).toggleClass('toggleColor')
})

// for Features section drop-block
$('.section-features__content-drop-block__caption').on('click',function(){
    $(this).next('div').slideToggle(300);
    // $(this).toggleClass('toggleColorBlue');
    // $(this).nextAll('div.section-features__content-drop-block__line').toggleClass('toggleLine');
    $(this).parent().toggleClass('section-features__content__drop-block_showed');
})

// parallax test
$('.footer-text-block').parallax({imageSrc: './img/sky1.jpeg', speed: 0.01});

// carousel
$('.section-trusted__carousel').slick({
    autoplay: true,
    autoplaySpeed: 1500,
    dots: true,
    arrows: false,
    // adaptiveHeight: true,
})


/* button-up */
$(window).scroll(function(){
    if($(this).scrollTop() > 500) {
        $('#up').fadeIn();
    } else {
        $('#up').fadeOut();
    }
})

$('#up').on('click', function(){
    $('html,body').animate({scrollTop: 0}, 400)
})


// scroll page to ID
$('#home').on('click', function(e){
    e.preventDefault();
    $('html,body').animate({scrollTop: $('#about').offset().top}, 200)
})

// for to hide scrollbar when menu is showed
$('.checkbox').change(function(){
    if(this.checked) {
        $('body').css({'overflow': "hidden"})
    }
    else {
        $('body').css({'overflow': "visible"})
    }
})

//send start trial form date to Telegram (through telegram.php on back-end)
$('#submit-trial-id').on('click', function(e){
    e.preventDefault();
    let spec_offs = $('#spec-offs-id').is(":checked");
    let email = $('#email-trial-id').val().trim();
    if (email=="") {
        $('#error-email').text('Enter your email');
        return false;
    }
    $.ajax({
        url: 'ajax/telegram.php',
        type: 'POST',
        cache: false,
        data: {'email': email, 'spec_offs': spec_offs},
        dataType: 'html',
        beforeSend: function(){
            $('#submit-trial-id').prop('disabled', true);
        },
        success: function(){
            // alert('its okay');
            $('#error-email').val('');
            $('#email-trial-id').val('');
            $('#submit-trial-id').prop('disabled', false);
            $('#modal-3').fadeIn();
        }
    })
})