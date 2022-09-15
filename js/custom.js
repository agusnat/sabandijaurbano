jQuery(document).ready(function($)
{
	"use strict";

	var header = $('.header');
	var topNav = $('.top_nav')
	var mainSlider = $('.main_slider');
	var hamburger = $('.hamburger_container');
	var menu = $('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = $('.hamburger_close');
	var fsOverlay = $('.fs_menu_overlay');

	setHeader();

	$(window).on('resize', function()
	{
		initFixProductBorder();
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initTimer();
	initFavorite();
	initFixProductBorder();
	initIsotopeFiltering();
	initSlider();
	initArrivals();

	function setHeader()
	{
		if(window.innerWidth < 992)
		{
			if($(window).scrollTop() > 100)
			{
				header.css({'top':"0"});
			}
			else
			{
				header.css({'top':"0"});
			}
		}
		if(window.innerWidth > 991 && menuActive)
		{
			closeMenu();
		}
	}

	function initMenu()
	{
		if(hamburger.length)
		{
			hamburger.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
			});
		}

		if(fsOverlay.length)
		{
			fsOverlay.on('click', function()
			{
				if(menuActive)
				{
					closeMenu();
				}
			});
		}

		if(hamburgerClose.length)
		{
			hamburgerClose.on('click', function()
			{
				if(menuActive)
				{
					closeMenu();
				}
			});
		}

		if($('.menu_item').length)
		{
			var items = document.getElementsByClassName('menu_item');
			var i;

			for(i = 0; i < items.length; i++)
			{
				if(items[i].classList.contains("has-children"))
				{
					items[i].onclick = function()
					{
						this.classList.toggle("active");
						var panel = this.children[1];
					    if(panel.style.maxHeight)
					    {
					    	panel.style.maxHeight = null;
					    }
					    else
					    {
					    	panel.style.maxHeight = panel.scrollHeight + "px";
					    }
					}
				}	
			}
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		// menu.css('right', "0");
		fsOverlay.css('pointer-events', "auto");
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		fsOverlay.css('pointer-events', "none");
		menuActive = false;
	}

	function initTimer()
    {
    	if($('.timer').length)
    	{
    		// Uncomment line below and replace date
	    	// var target_date = new Date("Dec 7, 2017").getTime();

	    	// comment lines below
	    	var date = new Date();
	    	date.setDate(date.getDate() + 3);
	    	var target_date = date.getTime();
	    	//----------------------------------------
	 
			// variables for time units
			var days, hours, minutes, seconds;

			var d = $('#day');
			var h = $('#hour');
			var m = $('#minute');
			var s = $('#second');

			setInterval(function ()
			{
			    // find the amount of "seconds" between now and target
			    var current_date = new Date().getTime();
			    var seconds_left = (target_date - current_date) / 1000;
			 
			    // do some time calculations
			    days = parseInt(seconds_left / 86400);
			    seconds_left = seconds_left % 86400;
			     
			    hours = parseInt(seconds_left / 3600);
			    seconds_left = seconds_left % 3600;
			     
			    minutes = parseInt(seconds_left / 60);
			    seconds = parseInt(seconds_left % 60);

			    // display result
			    d.text(days);
			    h.text(hours);
			    m.text(minutes);
			    s.text(seconds); 
			 
			}, 1000);
    	}	
    }

    function initFavorite()
    {
    	if($('.favorite').length)
    	{
    		var favs = $('.favorite');

    		favs.each(function()
    		{
    			var fav = $(this);
    			var active = false;
    			if(fav.hasClass('active'))
    			{
    				active = true;
    			}

    			fav.on('click', function()
    			{
    				if(active)
    				{
    					fav.removeClass('active');
    					active = false;
    				}
    				else
    				{
    					fav.addClass('active');
    					active = true;
    				}
    			});
    		});
    	}
    }

    function initFixProductBorder()
    {
    	if($('.product_filter').length)
    	{
			var products = $('.product_filter:visible');
    		var wdth = window.innerWidth;

    		// reset border
    		products.each(function()
    		{
    			$(this).css('border-right', 'solid 1px #e9e9e9');
    		});

    		// if window width is 991px or less

    		if(wdth < 480)
			{
				for(var i = 0; i < products.length; i++)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 576)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 1; i < products.length; i+=2)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 768)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 2; i < products.length; i+=3)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

    		else if(wdth < 992)
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 3; i < products.length; i+=4)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}

			//if window width is larger than 991px
			else
			{
				if(products.length < 5)
				{
					var product = $(products[products.length - 1]);
					product.css('border-right', 'none');
				}
				for(var i = 4; i < products.length; i+=5)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}	
    	}
    }

    function initIsotopeFiltering()
    {
    	if($('.grid_sorting_button').length)
    	{
    		$('.grid_sorting_button').click(function()
	    	{
	    		// putting border fix inside of setTimeout because of the transition duration
	    		setTimeout(function()
		        {
		        	initFixProductBorder();
		        },500);

		        $('.grid_sorting_button.active').removeClass('active');
		        $(this).addClass('active');
		 
		        var selector = $(this).attr('data-filter');
		        $('.product-grid').isotope({
		            filter: selector,
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });

		        
		         return false;
		    });
    	}
    }

    function initSlider()
    {
    	if($('.product_slider').length)
    	{
    		var slider1 = $('.product_slider');

    		slider1.owlCarousel({
    			loop:false,
    			dots:false,
    			nav:false,
    			responsive:
				{
					0:{items:1},
					480:{items:2},
					768:{items:3},
					991:{items:4},
					1280:{items:5},
					1440:{items:5}
				}
    		});

    		if($('.product_slider_nav_left').length)
    		{
    			$('.product_slider_nav_left').on('click', function()
    			{
    				slider1.trigger('prev.owl.carousel');
    			});
    		}

    		if($('.product_slider_nav_right').length)
    		{
    			$('.product_slider_nav_right').on('click', function()
    			{
    				slider1.trigger('next.owl.carousel');
    			});
    		}
    	}
    }

	function initArrivals() {
		fetch("https://opensheet.elk.sh/18j3DDe7Xorzyy3bzPKBVQ3tc2KCQmmEJNYbzoGp1rtY/catalog").then((res) => res.json()).then((data) => {
			data.forEach((row, index) => {
				if(index > data.length - 10) {
					let str = '<div class="owl-item product_slider_item">'+
					'<div class="product-item">'+
					'<div class="product discount">'+
					'<div class="product_image"><img src="'+ (row['imagen'] ? row['imagen'] : 'images/no_disponible.png') + '" alt=""></div>'+
					'<div class="product_info">'+
					'<h6 class="product_name"><a href="catalog.html#' + index + '">' + (row['titulo'] ? row['titulo'] : "Articulo sin nombre") + '</a></h6>'+
					'<div class="product_price">$' + (row['precio'] ? row['precio'] : '-') + '</div>'+
					'</div></div></div></div>';

					$('.owl-carousel').owlCarousel('add', str);
				}
			});

			$('.owl-carousel').owlCarousel('update');
		});

		easePreloader();
	}

	function easePreloader(){
		$(".preloader").fadeOut(500);
	}
});