
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
$('.section-features__content__drop-block_caption').on('click',function(){
    $(this).next('div').slideToggle(300);
    $(this).toggleClass('toggleColorBlue');
    $(this).nextAll('div.section-features__content__drop-block_line').toggleClass('toggleLine');
})

// parallax test
$('.footer-text-block').parallax({imageSrc: './img/sky1.jpeg', speed: 0.01});
