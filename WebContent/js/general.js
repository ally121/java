jQuery(document).ready(function() {
 	var $ = jQuery;
    var screenRes = $(window).width();
    var screenHeight = $(window).height();
   var saveCheckin=$("#saveCheckin").val();
   var saveCheckout=$("#saveCheckout").val();
   
    			$(".datepicker").datepicker({ minDate: 0, maxDate: "+1M +10D" });   
    		    
    		    $(".datepicker").datepicker( "option", "dateFormat","yy-mm-dd");
    		    if(saveCheckin!=undefined){
    		    	$( "#checkin" ).datepicker( "setDate", saveCheckin );
    		    }
    		    if(saveCheckout!=undefined){
    		    	$( "#checkout" ).datepicker( "setDate", saveCheckout );
    		    }
    		    
    $("[href=#]").click(function(event){
        event.preventDefault();
    });

// Body Wrap
    $(".body_wrap").css("min-height", screenHeight);
    $(window).resize(function() {
        screenHeight = $(window).height();
        $(".body_wrap").css("min-height", screenHeight);
    });

// Dropdown Menu
    $(".dropdown li").hover(function(){
        $(this).addClass('hover');
    },function(){
        $(this).removeClass('hover');
    });

// Remove outline in IE
	$("a, input, textarea").attr("hideFocus", "true").css("outline", "none");

// Add gradient to IE
    setTimeout(function () {
        $("body").addClass("gradient");
    }, 0);

// buttons
    $(".btn").hover(function(){
        $(this).stop().animate({"opacity": 0.8});
    },function(){
        $(this).stop().animate({"opacity": 1});
    });
	$('a.btn, span.btn').on('mousedown', function(){
		$(this).addClass('active')
	});
	$('a.btn, span.btn').on('mouseup mouseout', function(){
		$(this).removeClass('active')
	});

// style Select, Radio, Checkbox
    if ($("select").hasClass("select_styled")) {
        cuSel({changedEl: ".select_styled", visRows: 10});
    }
    if ($("div,p").hasClass("input_styled")) {
        $(".input_styled input").customInput();
    }

// First Child, Last Child
    $("li:first-child, .cusel span:first-child").addClass("first");
    $("li:last-child, .cusel span:last-child").addClass("last");

// NavBar Parents Arrow
    $(".dropdown ul").parent("li").addClass("parent");

// List Selector
    $('#listSelector li a').click(function(){
        $('#listSelector li').removeClass('selected');
        $('#listSelector .list-double a').removeClass('border-left border-right');
        $(this).parent().addClass('selected');

        if($('#listSelector .list-multi').hasClass('selected')) {$('#listSelector .list-double a').addClass('border-right')}
        if($('#listSelector .list-single').hasClass('selected')) {$('#listSelector .list-double a').addClass('border-left')}
    });

// Tabs
    var $tabs_on_page = $('.tabs').length;
    var $bookmarks = 0;

    for(var i = 1; i <= $tabs_on_page; i++){
        $('.tabs').eq(i-1).addClass('tab_id'+i);
        $bookmarks = $('.tab_id'+i+' li').length;
        $('.tab_id'+i).addClass('bookmarks'+$bookmarks);
    };

    $('.tabs li, .payment-form .btn').click(function() {
        setTimeout(function () {
            for(var i = 1; i <= $tabs_on_page; i++){
                $bookmarks = $('.tab_id'+i+' li').length;
                for(var j = 1; j <= $bookmarks; j++){
                    $('.tab_id'+i).removeClass('active_bookmark'+j);

                    if($('.tab_id'+i+' li').eq(j-1).hasClass('active')){
                        $('.tab_id'+i).addClass('active_bookmark'+j);
                    }
                }
            }
        }, 0)
    });

// Payment Form
    $('.payment-form #billing .btn-next, .payment-form #payment .btn-prev').click(function() {
        $('a[href="#shipping"]').tab('show');
    });
    $('.payment-form #shipping .btn-prev').click(function() {
        $('a[href="#billing"]').tab('show');
    });
    $('.payment-form #shipping .btn-next').click(function() {
        $('a[href="#payment"]').tab('show');
    });

// prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
    if($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({social_tools:false});
    };

// Smooth Scroling of ID anchors
    function filterPath(string) {
        return string
            .replace(/^\//,'')
            .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
            .replace(/\/$/,'');
    }
    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');

    $('a[href*=#].anchor').each(function() {
        $(this).click(function(event) {
            var thisPath = filterPath(this.pathname) || locationPath;
            if (  locationPath == thisPath
                && (location.hostname == this.hostname || !this.hostname)
                && this.hash.replace(/#/,'') ) {
                var $target = $(this.hash), target = this.hash;
                if (target && $target.length != 0) {
                    var targetOffset = $target.offset().top;
                    event.preventDefault();
                    $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
                        location.hash = target;
                    });
                }
            }
        });
    });

    // use the first element that is "scrollable"
    function scrollableElement(els) {
        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
            var el = arguments[i],
                $scrollElement = $(el);
            if ($scrollElement.scrollTop()> 0) {
                return el;
            } else {
                $scrollElement.scrollTop(1);
                var isScrollable = $scrollElement.scrollTop()> 0;
                $scrollElement.scrollTop(0);
                if (isScrollable) {
                    return el;
                }
            }
        }
        return [];
    };

// Audio Player
    var $players_on_page = $('.jp-audio').length;
    var $song_title = '';

    if($players_on_page > 0){
        for(var i = 1; i <= $players_on_page; i++){
            $('.jp-audio').eq(i-1).addClass('jp-audio'+i);
        };

        setTimeout(function () {
            for(var i = 1; i <= $players_on_page; i++){
                $song_title = $('.jp-audio'+i+' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
                $('.jp-audio'+i+' .song_title').html($song_title);
            };
        }, 1000);

        function switchSong() {
            setTimeout(function () {
                for(var i = 1; i <= $players_on_page; i++){
                    $('.jp-audio'+i+' .jp-previous, .jp-audio'+i+' .jp-next').removeClass('disabled');

                    if ($('.jp-audio'+i+' .jp-playlist ul li:last-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio'+i+' .jp-next').addClass('disabled');
                    }
                    if ($('.jp-audio'+i+' .jp-playlist ul li:first-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio'+i+' .jp-previous').addClass('disabled');
                    }
                    $song_title = $('.jp-audio'+i+' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
                    $('.jp-audio'+i+' .song_title').html($song_title);
                }
            }, 0)
        };

        $('.jp-previous, .jp-next, .jp-playlist ul').click(function() {
            switchSong()
        });
        $(".jp-jplayer").on($.jPlayer.event.ended, function(event) {
            switchSong()
        });
    };

    $(".jp-playlist-toggle").click(function () {
        var $this = $(this);
        for(var i = 1; i <= $players_on_page; i++){
            if ($this.parents('.jp-audio').hasClass('jp-audio'+i)) {
                $('.jp-audio'+i+' .jp-playlist').slideToggle("slow");
            }
        }
    });

// Placeholders
    if($("[placeholder]").size() > 0){
        $.Placeholder.init({ color : "#7b8a97" });
    }

// Weather
    $('.weather-forecast li a').click(function() {
        var day = $(this).attr('id');
        $('.weather-forecast li a, .weather-item').removeClass('active');
        $(this).addClass('active');
        $('.weather-item.'+day).addClass('active');
    });

// Vertical Menu
    $('.menu-vertical li').click(function() {
        $('.menu-vertical li').removeClass('active');
        $(this).addClass('active');
    });

// Crop Images in Image Slider

    // adds .naturalWidth() and .naturalHeight() methods to jQuery for retrieving a normalized naturalWidth and naturalHeight.
    (function($){
        var
            props = ['Width', 'Height'],
            prop;

        while (prop = props.pop()) {
            (function (natural, prop) {
                $.fn[natural] = (natural in new Image()) ?
                    function () {
                        return this[0][natural];
                    } :
                    function () {
                        var
                            node = this[0],
                            img,
                            value;

                        if (node.tagName.toLowerCase() === 'img') {
                            img = new Image();
                            img.src = node.src,
                                value = img[prop];
                        }
                        return value;
                    };
            }('natural' + prop, prop.toLowerCase()));
        }
    }(jQuery));

    var
        carousels_on_page = $('.carousel-inner').length,
        carouselWidth,
        carouselHeight,
        ratio,
        imgWidth,
        imgHeight,
        imgRatio,
        imgMargin,
        this_image,
        images_in_carousel;

    for(var i = 1; i <= carousels_on_page; i++){
        $('.carousel-inner').eq(i-1).addClass('id'+i);
    };

    function imageSize() {
        setTimeout(function () {
            for(var i = 1; i <= carousels_on_page; i++){
                carouselWidth = $('.carousel-inner.id'+i+' .item').width();
                carouselHeight = $('.carousel-inner.id'+i+' .item').height();
                ratio = carouselWidth/carouselHeight;

                images_in_carousel = $('.carousel-inner.id'+i+' .item img').length;

                for(var j = 1; j <= images_in_carousel; j++){
                    this_image = $('.carousel-inner.id'+i+' .item img').eq(j-1);
                    imgWidth = this_image.naturalWidth();
                    imgHeight = this_image.naturalHeight();
                    imgRatio = imgWidth/imgHeight;

                    if(ratio <= imgRatio){
                        imgMargin = parseInt((carouselHeight/imgHeight*imgWidth-carouselWidth)/2, 10);
                        this_image.css("cssText", "height: "+carouselHeight+"px; margin-left:-"+imgMargin+"px;");
                    }
                    else{
                        imgMargin = parseInt((carouselWidth/imgWidth*imgHeight-carouselHeight)/2, 10);
                        this_image.css("cssText", "width: "+carouselWidth+"px; margin-top:-"+imgMargin+"px;");
                    }
                }
            };
        },1000);
    };

    imageSize();
    $(window).resize(function() {
        $('.carousel-indicators .first').click();
        imageSize();
    });

});