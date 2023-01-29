jQuery(document).ready(function($)
{
	"use strict";

	loadCartItems();

	function saveData(data){
		let now = new Date();
		localStorage.setItem('expiry', now.getTime() + 900000);
		localStorage.setItem('cartItems', JSON.stringify(data));
	}

	function loadData(){
		let now = new Date();

		let expireTime = localStorage.getItem('expiry');

		if (now.getTime() > expireTime)
			localStorage.setItem('cartItems', JSON.stringify([]));
		
		return JSON.parse(localStorage.getItem('cartItems'));
	}

	function loadCartItems(){
		let data = loadData();

		if(!data) {
			localStorage.setItem('cartItems', JSON.stringify([]));
			return;
		}
		let str = '';
		let totalPrice = 0;
		let totalItems = 0;

		data.forEach((row, index) => {
			let price = row['price'] * row['quantity'];
			str += '<tr>'+
			'<td>' + row['name'] + '</td>'+
			'<td><div class="quantity"><button class="quantity_button rounded-circle subtract" data-id="' + index + '">-</button><span>' + row['quantity'] + '</span><button class="quantity_button rounded-circle add" data-id="' + index + '" data-stock="' + row['stock'] + '">+</button></div></td>'+
			'<td>$' + numberWithCommas(price) + '</td>'+
			'</tr>';

			totalItems += row['quantity'];
			totalPrice += price;
		});

		if(totalItems > 0) {
			$('.next_page').removeClass('disabled');
		}

		$('.total_price span').html('$' + numberWithCommas(totalPrice));
		$('.cart_items tbody').html(str);

		$('.item_counter').html('Tu pedido (' + totalItems + ')');
		$('.checkout_items').html(totalItems);
	}

	$('.next_page').on('click', function() {
		let items = loadData();

		if(items.length < 1)
			return;

		$('.cart_first_page').hide();		
		$('.cart_second_page').show();
	});

	$('.shoppingcart_back').on('click', function() {
		goBackCart();
	});

	function goBackCart() {
		$('.cart_second_page').hide();
		$('.cart_first_page').show();
	}
	
	$('.shoppingcart_close').on('click', function() {
		closeCart();
	});
	
	$('.checkout').on('click', function() {
		openCart();
	});

	function closeCart(){
		$('.shoppingcart').fadeOut();
		$('.shoppingcart_content').removeClass('active');
	}

	function openCart(){
		$('.shoppingcart').fadeIn();
		$('.shoppingcart_content').addClass('active');
	}

	$(document).on('click', '.quantity_button.subtract', function() {
		let id = $(this).data("id");
		let data = loadData();

		if(data[id]['quantity'] <= 1){
			data.splice(id, 1);
			saveData(data);
		} else {
			substractQuantity(id, 1);
		}

		if(data.length < 1) {
			$('.next_page').addClass('disabled');
		}

		loadCartItems();
	});

	$(document).on('click', '.quantity_button.add', function() {
		let id = $(this).data("id");
		let max = $(this).data("stock");

		sumQuantity(id, 1, max);
		
		loadCartItems();
	});

	$('.add_to_cart_button').on('click', function() {
		let titulo = $(this).attr('data-title');
		let id = $(this).attr('data-id');
		let precio = $(this).attr('data-price');
		let stock = $(this).attr('data-stock');

		let items = loadData();

		if(stock >= 1){
			if(items.length < 25){
				let itemExists = false;

				items.forEach((row) => {
					if(row['id'] === id) {
						if(row['quantity'] < stock)
							row['quantity'] += 1;

						itemExists = true;
					}
				});

				if(!itemExists) {
					items.push({name: titulo, quantity: 1, id: id, price: precio, stock: stock});
					$('.next_page').removeClass('disabled');
				}
				
				saveData(items);
				loadCartItems();
			} else {
				console.log('Superaste el maximo de items!')
			}
		}
	});

	function sumQuantity(id, num, max) {
		let data = loadData();
		
		if(data[id]['quantity'] < max)
			data[id]['quantity'] += num;

		saveData(data);
	}

	function substractQuantity(id, num) {
		let data = loadData();
		
		data[id]['quantity'] -= num;

		saveData(data);
	}

	$('.purchase_button').on('click', function(){
		
		let fullname = $('#fullname');
		let fullname_value = fullname.val();
		let shipping = $("input[name='shipping']:checked").val();
		let payment = $("input[name='payment']:checked").val();
		let address = $('#address');
		let address_value = address.val();
		// reset class
		fullname.removeClass('is-invalid');
		address.removeClass('is-invalid');
		
		if (! fullname_value.match('^[a-zA-Z ]+$')) {
			fullname.addClass('is-invalid');
		} else if (! address_value.match('^[a-zA-Z0-9 ]+$')) {
			address.addClass('is-invalid');
		} else {
			window.open(getUrlWhatsapp(fullname_value, shipping, payment, address_value), "_blank");
			goBackCart();
			closeCart();
		}
	});

	function getUrlWhatsapp(fullname, shipping, payment, address){
		let data = loadData();
		let str = "https://api.whatsapp.com/send/?phone=5493329566075&text=";

		data.forEach((row) => {
			str += row['name'] + " *[Cant: " + row['quantity'] + "]*\n";
		});

		str += '\nNombre completo: ' + fullname +
		'\nMétodo de entrega: ' + shipping +
		'\nForma de pago: ' + payment +
		'\nDirección de envío: ' + address;

		return encodeURI(str);
	}

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}
});