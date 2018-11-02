function url() {
    if (window.location.hash == '#a-experience') {
        $('#experience_btn').click();
    } else if (window.location.hash == '#a-skills') {
        $('#skills_btn').click();
    } else if (window.location.hash == '#a-projects') {
        $('#projects_btn').click();
    } else {
        $('#who_am_i_btn').click();
    }
}

// WHO AM I
$('#who_am_i_btn').click(function() {

    /**CLOSE MOBILE **/
    $('.mobile-menu').removeClass('active');

    /** ADD **/
    $('#who_am_i_btn').addClass('active');
    $('.who-am-i').addClass('active');


    /** REMOVE **/
    $('#experience_btn').removeClass('active');
    $('.experience').removeClass('active');
    $('#skills_btn').removeClass('active');
    $('.skills').removeClass('active');

    $('#projects_btn').removeClass('active');
    $('.projects').removeClass('active');

    /**ADD ICON**/
    $('#who-am-i-icon').addClass('animated flipInY active');
    /**REMOVE ICON**/
    $('#experience-icon').removeClass('animated flipInY active');
    $('#skills-icon').removeClass('animated flipInY active');

    $('#projects-icon').removeClass('animated flipInY active');


});

//EXPERIENCE
$('#experience_btn').click(function() {

    /**CLOSE MOBILE **/
    $('.mobile-menu').removeClass('active');

    /** ADD **/
    $('.experience').addClass('active');
    $('#experience_btn').addClass('active');


    /** REMOVE **/
    $('#who_am_i_btn').removeClass('active');
    $('.who-am-i').removeClass('active');
    $('#skills_btn').removeClass('active');
    $('.skills').removeClass('active');

    $('#projects_btn').removeClass('active');
    $('.projects').removeClass('active');

    /**ADD ICON**/
    $('#experience-icon').addClass('animated flipInY active');
    /**REMOVE ICON**/
    $('#who-am-i-icon').removeClass('animated flipInY active');
    $('#skills-icon').removeClass('animated flipInY active');

    $('#projects-icon').removeClass('animated flipInY active');

});

//SKILLS
$('#skills_btn').click(function() {

    /**CLOSE MOBILE **/
    $('.mobile-menu').removeClass('active');

    /** ADD **/
    $('.skills').addClass('active');
    $('#skills_btn').addClass('active');


    /** REMOVE **/
    $('#who_am_i_btn').removeClass('active');
    $('.who-am-i').removeClass('active');
    $('#experience_btn').removeClass('active');
    $('.experience').removeClass('active');

    $('#projects_btn').removeClass('active');
    $('.projects').removeClass('active');

    /**ADD ICON**/
    $('#skills-icon').addClass('animated flipInY active');
    /**REMOVE ICON**/
    $('#who-am-i-icon').removeClass('animated flipInY active');
    $('#experience-icon').removeClass('animated flipInY active');
    $('#projects-icon').removeClass('animated flipInY active');

});

//PROJECTS
$('#projects_btn').click(function() {

    /**CLOSE MOBILE **/
    $('.mobile-menu').removeClass('active');

    /** ADD **/
    $('.projects').addClass('active');
    $('#projects_btn').addClass('active');

    /** REMOVE **/
    $('#who_am_i_btn').removeClass('active');
    $('.who-am-i').removeClass('active');
    $('#experience_btn').removeClass('active');
    $('.experience').removeClass('active');
    $('#skills_btn').removeClass('active');
    $('.skills').removeClass('active');

    /**ADD ICON**/
    $('#projects-icon').addClass('animated flipInY active');
    /**REMOVE ICON**/
    $('#who-am-i-icon').removeClass('animated flipInY active');
    $('#experience-icon').removeClass('animated flipInY active');

    $('#skills-icon').removeClass('animated flipInY active');

});



/**MOBILE NAVBAR**/
$('#mobile-btn').click(function() {
    icon_behaviour();
    /**OPEN MOBILE MENU **/
    if ($('.mobile-menu').hasClass('active')) {
        $('.mobile-menu').removeClass('active');
    } else {
        $('.mobile-menu').addClass('active');
    }
});

function icon_behaviour() {
    /**ICON behaviour**/
    if ($('.hamburger-icon').hasClass('active')) {
        $('.hamburger-icon').removeClass('active');
        $('.close-icon').addClass('active');
    } else if ($('.close-icon').hasClass('active')) {
        $('.hamburger-icon').addClass('active');
        $('.close-icon').removeClass('active');
    } else {
        $('.hamburger-icon').addClass('active');
        $('.close-icon').removeClass('active');
    }
}

/**SECTION REDIRECT**/

$('#m-who_am_i_btn').click(function() {
    // Animate Scroll to #bottom
    $('html,body').animate({
            scrollTop: $("#who-am-i").offset().scrollTop = 0
        }, // Tell it to scroll to the top #bottom
        '2000' // How long scroll will take in milliseconds
    );
    $('#who_am_i_btn').click();
    icon_behaviour();

    return false;
});
$('#m-experience_btn').click(function() {
    // Animate Scroll to #bottom
    $('html,body').animate({
            scrollTop: $("#experience").offset().top - 20
        }, // Tell it to scroll to the top #bottom
        '2000' // How long scroll will take in milliseconds
    );
    $('#experience_btn').click();
    icon_behaviour();
    return false;
});
$('#m-skills_btn').click(function() {
    // Animate Scroll to #bottom
    $('html,body').animate({
            scrollTop: $("#skills").offset().top - 20
        }, // Tell it to scroll to the top #bottom
        '2000' // How long scroll will take in milliseconds
    );
    $('#skills_btn').click();
    icon_behaviour();
    return false;
});
$('#m-projects_btn').click(function() {
    // Animate Scroll to #bottom
    $('html,body').animate({
            scrollTop: $("#projects").offset().top - 20
        }, // Tell it to scroll to the top #bottom
        '2000' // How long scroll will take in milliseconds
    );
    $('#projects_btn').click();
    icon_behaviour();
    return false;
});