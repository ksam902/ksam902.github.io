(function($) {

    $(".landing-title").typed({
        strings: ["Hi, I'm Kyle."],
        typeSpeed: 8,
        startDelay: 1500,
        callback: function () {
            $(".typed-cursor").hide();
            $(".landing-description").typed({
        		strings: ["THINKER. ^500 DEVELOPER.", "^500 CREATOR."],
        		typeSpeed: 3,
                startDelay: 500,
                backDelay: 1000,
        	});
        }
    });

    $('.skills').on('click', function(e){
        e.preventDefault();
    });

})(jQuery);
