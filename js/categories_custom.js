
jQuery(document).ready(function($)
{
	"use strict";

	var header = $('.header');
	var topNav = $('.top_nav')
	var mainSlider = $('.main_slider');
	var hamburger = $('.hamburger_container');
	var viewproduct = $('.viewproduct');
	var cartContent = $('.viewproduct_content');
	var cartClose = $('.viewproduct_close');
	var menu = $('.hamburger_menu');
	var menuActive = false;
	var hamburgerClose = $('.hamburger_close');
	var fsOverlay = $('.fs_menu_overlay');
	var catalogData = [];
	var productGrid = $('.product-grid');

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
	initFavorite();
	initFixProductBorder();
	initIsotopeFiltering();
	initPriceSlider();
	initCheckboxes();
	fetchCatalog();

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

		if(cartClose.length)
		{
			cartClose.on('click', function()
			{
				closeViewer();
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

		productGrid.on( 'click', '.see_more', function() {
			loadItem($(this).data("id"));
		  });
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

	function openViewer()
	{
		viewproduct.fadeIn();
		cartContent.addClass('active');
	}

	function closeViewer()
	{
		viewproduct.fadeOut();
		cartContent.removeClass('active');
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
				for(var i = 2; i < products.length; i+=3)
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
				for(var i = 3; i < products.length; i+=4)
				{
					var product = $(products[i]);
					product.css('border-right', 'none');
				}
			}	
    	}
    }
    function initIsotopeFiltering()
    {
    	var sortTypes = $('.type_sorting_btn');
    	var sortNums = $('.num_sorting_btn');
    	var sortTypesSelected = $('.sorting_type .item_sorting_btn is-checked span');
    	var filterButton = $('.filter_button');

    	if(productGrid.length)
    	{
    		productGrid.isotope({
    			itemSelector: '.product-item',
	            getSortData: {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_name'
	            },
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });

			sortTypes.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		$('.type_sorting_text').text($(this).text());
	        		var option = $(this).attr('data-isotope-option');
	        		option = JSON.parse( option );
    				$('.product-grid').isotope( option );
	        	});
	        });

	        filterButton.on('click', function()
	        {
	        	productGrid.isotope({
		            filter: function()
		            {
		            	var priceRange = $('#amount').val();
			        	var priceMin = parseFloat(priceRange.split('-')[0].replace('$', ''));
			        	var priceMax = parseFloat(priceRange.split('-')[1].replace('$', ''));
			        	var itemPrice = $(this).find('.product_price').clone().children().remove().end().text().replace( '$', '' );

			        	return (itemPrice > priceMin) && (itemPrice < priceMax);
		            },
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });
	        });

			$('.sidebar_categories a').on( 'click', function() {
				var filterValue = $(this).attr('data-filter');
				// use filterFn if matches value
				productGrid.isotope({filter: filterValue });
				
				$('.sidebar_categories').find('li').removeClass('active');
				$(this).parent().addClass('active');
			  });			  
    	}
    }

    function initPriceSlider()
    {
		$( "#slider-range" ).slider(
		{
			range: true,
			min: 0,
			max: 10000,
			values: [ 0, 10000 ],
			slide: function( event, ui )
			{
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
			
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    }

    function initCheckboxes()
    {
    	if($('.checkboxes li').length)
    	{
    		var boxes = $('.checkboxes li');

    		boxes.each(function()
    		{
    			var box = $(this);

    			box.on('click', function()
    			{
    				if(box.hasClass('active'))
    				{
    					box.find('i').removeClass('fa-square');
    					box.find('i').addClass('fa-square-o');
    					box.toggleClass('active');
    				}
    				else
    				{
    					box.find('i').removeClass('fa-square-o');
    					box.find('i').addClass('fa-square');
    					box.toggleClass('active');
    				}
    				// box.toggleClass('active');
    			});
    		});

    		if($('.show_more').length)
    		{
    			var checkboxes = $('.checkboxes');

    			$('.show_more').on('click', function()
    			{
    				checkboxes.toggleClass('active');
    			});
    		}
    	};
    }

	function fetchCatalog() {
		fetch("https://opensheet.elk.sh/18j3DDe7Xorzyy3bzPKBVQ3tc2KCQmmEJNYbzoGp1rtY/catalog").then((res) => res.json()).then((data) => {
			initCatalog(data);
			getUrlHash();
			easePreloader();
		});
	}

	function initCatalog(data) {
			catalogData = data;

			var items = $();

			data.forEach((row, index) => {
				let str = '<div class="product-item ' + row['tipo'] + '">'+
				'<div class="product product_filter">'+
				'<div class="product_image"><img src="'+ (row['imagen'] ? row['imagen'] : 'images/no_disponible.png') + '" alt=""></div>'+
				'<div class="product_info">'+
				'<h6 class="product_name"><a href="catalog.html#' + index + '">' + (row['titulo'] ? row['titulo'] : "Articulo sin nombre") + '</a></h6>'+
				'<div class="product_price">$' + (row['precio'] ? row['precio'] : 0) + '</div>'+
				'</div>'+
				'</div>'+
				'<div class="red_button see_more" data-id="' + index + '">Ver producto</div>'+
				'</div>';
				
				items = items.add(str);
			});

			productGrid.isotope('insert', items);
	}

	function getUrlHash() {
		if(window.location.hash) {
			var hash = window.location.hash.substring(1);
			
			if(/^\d+$/.test(hash)){
				loadItem(hash);
			} else {
				loadCategorie(hash);
			}
		}
	}

	function loadCategorie(str){
		var arr = ['cartera', 'neceser', 'mochila'];

		if(arr.includes(str)){
			productGrid.isotope({filter: '.' + str });

			$('.sidebar_categories').find('li').removeClass('active');
		}
		
		$("[data-filter='." + str +"']").parent().addClass('active');
	}

	function loadItem(key){
		if(key > catalogData.length - 1)
			return;

		var itemTitle = catalogData[key]['titulo'];
		var title = itemTitle ? itemTitle : "Articulo sin nombre";
		var itemImage = catalogData[key]['imagen'];
		var itemPrice = catalogData[key]['precio'];
		var price = (itemPrice ? itemPrice : '0');
		var itemDesc = catalogData[key]['descripcion'];

		$('.item_name').html(title);
		$('.item_desc').html(itemDesc ? itemDesc : 'Sin descripcion');
		$('.item_price').html('$' + price);
		$('.item_image').css("background-image", 'url("' + (itemImage ? itemImage : 'images/no_disponible.png') +'")');
		$('.add_to_cart_button').attr('data-price', price);
		$('.add_to_cart_button').attr('data-id', key);
		$('.add_to_cart_button').attr('data-title', title);

		window.location.hash = key;

		openViewer();		
	}

	function easePreloader(){
		$(".preloader").fadeOut(500);
	}

	$('.add_to_cart_button').on('click', function() {
		closeViewer();
	});
});