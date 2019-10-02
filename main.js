    var pups = document.getElementsByClassName('b-popup');

    function PopUpShowF(i) {
        $(pups[i]).show();
    }

$(document).ready(function() {

    var OKBut = document.getElementsByClassName('close-popup');

    //console.log(pups);

    function PopUpHideF(i) {
        $(pups[i]).hide();
    }


    function CheckOK(i) {
        $(OKBut[i]).click(function() {
            PopUpHideF(i);
        });
    }

    for (var i = 0; i < pups.length; i++)
    {
        CheckOK(i);
        PopUpHideF(i);
    }
});

$(document).ready(function() {

	setInterval(function() {
		if (typeof web3 !== 'undefined')
		{
			web3 = new Web3(web3.currentProvider);

			web3.version.getNetwork(function(error, result) {

	    		var Nick = document.getElementById('Nick-input');
				if (result == 3)
				{
					web3.eth.getCoinbase(function(error, result)
					{	
						if (result != null)
						{
							var temp = "Connected: "
							Nick.value = (temp + result);
							Nick.style.color = "#33f2e9";
						}
						else
						{
							Nick.value = "Not connected!";
							Nick.style.color = "#ff0000";
						}
					});
				}
				else
				{
					Nick.value = "Wrong network!";
					Nick.style.color = "#ff0000";
				}
			});
		}
	}, 1000);    
});

$(document).ready(function()
{
	var money = [
	{
		type: "Dollar",
		prices: [1, 2, 5, 10, 20, 50, 100],
		country: "USA"
	},
    {
        type: "Dirham",
		prices: [5, 10, 20, 50, 100, 200, 500, 1000],
		country: "AED"
    },
    {
        type: "Euro",
        prices: [5, 10, 20, 50, 100, 200, 500],
        country: "Europe"
    },
    {
        type: "Grivna",
        prices: [1, 2, 5, 10, 20, 50, 100, 200, 500],
        country: "Ukraine"
    },
    {
        type: "Ruble",
        prices: [5, 10, 50, 100, 500, 1000, 5000],
        country: "Russia"
    }];

	var code = "";
    var index = 0;
	for (var i = 0; i < money.length; i++)
	{
		var mon = money[i];
		for (var j = 0; j < mon.prices.length; j++)
		{
			var price = mon.prices[j];

			var type = mon.type;

			if (index != 0 && (index < 15 || index > 22))
				type = mon.type + 's';

			code += '<div id="' + mon.type + '" class="block">' +
						'<a href="javascript:PopUpShowF(' + (index+1) + ')">' +
							'<img src="./images/' + mon.type + '/' + price + '.jpg" style="background: url(./images/' + mon.type + '/' + price + '.jpg);background-size:100% 150px;" class="content-img" alt="Didn\'t download">' +
							'<img src="./images/' + mon.type + '/' + price + '-1.jpg" style="background: url(./images/' + mon.type + '/' + price + '-1.jpg);background-size:100% 150px;" class="content-img" alt="Didn\'t download">' +
						'</a>' +
						'<div class="descrip' + mon.type.toLowerCase() + '">' +
							mon.country + ' ' + price + ' ' + type +
						'</div>' +
						'<div class="owner-block">' +
							'Owner: ' +
							'<input type="text" class="owner" readonly>' +
							'Price: ' +
							'<input type="text" class="price" readonly>' +
							'ETH ' +
							'<input type="submit" class="buy" value="BUY">' +
						'</div>' +
						'<div class="owner-block-2">' +
							'Next price:' +
							'<input type="text" class="next-price" readonly>' +
							'ETH' +
							'<span style="color:#3e3e3e; font-size:10px;">#%$@$*</span>' +
							'Fee:' +
							'<input type="text" class="fee" readonly>' +
						'</div>' +
					'</div>';
            index++;
		}
	}

	$("#main-content").html(code);







  var items = $('#main-content .block');
  var counter = items.length;

  counter = parseInt((counter + 2) / 3);

  document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';





var items_stock = $('#main-content .block');
var itemsow_stock = $('#main-content .block .owner');

var pageK = 12;
var pageAmount = parseInt((items.length + 11) / 12);


    var where = "Marketplace";
    var filter = "Oldest";
    var change = "Currency";
    var truth = false;

    var opts =
    {
        totalPages: pageAmount,
        visiblePages: 4,
        first: 'First',
        next: '',
        prev: '',
        last: 'Last',
        onPageClick: function (event, page)
        {
            function figure_out()
            {
                //console.log(where, filter, change, truth, page - 1);
                ss(where, filter, change, truth, page - 1);
            }

            $('#cur2').change(function() {

                if (where != $('#cur2').val())
                {
                    where = $('#cur2').val();
                    filter = "Oldest";
                    change = "Currency";
                    truth = false;

                    $('#cur').val(change);
                    $('#select-main').val("Oldest");

                    figure_out();
                }
            });


            $('#select-main').change(function() {

                if (filter != $('#select-main').val())
                {
                    where = $('#cur2').val();
                    filter = $('#select-main').val();
                    change = $('#cur').val();
                    truth = true;

                    figure_out();
                }
            });


            $('#cur').change(function() {

                if (change != $('#cur').val())
                {
                    where = $('#cur2').val();
                    filter = $('#select-main').val();
                    change = $('#cur').val();
                    truth = false;

                    figure_out();
                }
            });

            figure_out();
        }
    }


$('.pagination').twbsPagination(opts);

function renovate()
{
    if ($('.pagination').data("twbs-pagination"))
    {
        $('.pagination').twbsPagination('destroy');
    }

	if (pageAmount < 1)
		pageAmount = 1;

    $('.pagination').twbsPagination($.extend(opts, {
        totalPages: pageAmount,
    }));
}

$('#cur').change(function() {
	setTimeout(renovate, 100);
});

$('#cur2').change(function() {
	setTimeout(renovate, 100);
});





function ss(where, filter, name, change, page) {
	var ite = $('#main-content');


	if (where === "Marketplace")
	{
       	if (filter === "Oldest")
		{
			console.log("Old");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (items_stock[i].id != name && name !== 'Currency')
				{
            		$(items_stock[i]).hide();
                	counter--;
            	}

                if ($(items_stock[i]).is(":visible"))
                {
                    temp.push(items_stock[i]);
                }
    		}


            pageAmount = parseInt((counter + 11) / 12);
            //console.log("PAGE", pageAmount);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_stock = jQuery.makeArray(temp);

			$(arritems_stock).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
		}

		if (filter === "Newest")
		{
			console.log("New");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (items_stock[i].id != name && name !== 'Currency')
				{
            		$(items_stock[i]).hide();
                	counter--;
            	}

                if ($(items_stock[i]).is(":visible"))
                {
                    temp.push(items_stock[i]);
                }
    		}


            pageAmount = parseInt((counter + 11) / 12);
            //console.log("PAGE", pageAmount);

			//if (change)
				temp.reverse();

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems = jQuery.makeArray(temp);


			$(arritems).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
		}

		if (filter === "Ascending")
		{
			console.log("Asc");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (items_stock[i].id != name && name !== 'Currency')
				{
            		$(items_stock[i]).hide();
                	counter--;
            	}

                if ($(items_stock[i]).is(":visible"))
                {
                    temp.push(items_stock[i]);
                }
    		}


            pageAmount = parseInt((counter + 11) / 12);
            //console.log("PAGE", pageAmount);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) > Number($(b).val()))
					return 1;

				if (Number($(a).val()) < Number($(b).val()))
					return -1;

				return 0;
			});

			var arritems_ascend = jQuery.makeArray(temp);

			$(arritems_ascend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
		}


		if (filter === "Descending")
		{
			console.log("Desc");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (items_stock[i].id != name && name !== 'Currency')
				{
            		$(items_stock[i]).hide();
                	counter--;
            	}

                if ($(items_stock[i]).is(":visible"))
                {
                    temp.push(items_stock[i]);
                }
    		}


            pageAmount = parseInt((counter + 11) / 12);
            //console.log("PAGE", pageAmount);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) < Number($(b).val()))
					return 1;

				if (Number($(a).val()) > Number($(b).val()))
					return -1;

				return 0;
			});

			var arritems_descend = jQuery.makeArray(temp);

			$(arritems_descend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
		}
	}




	else if (where === "Collection")
	{
		if (typeof web3 !== 'undefined')
		{
			web3 = new Web3(web3.currentProvider);

			web3.eth.getCoinbase(function(error, result)
			{
       			if (filter === "Oldest")
				{
					console.log("Old C");

                    var temp = [];
               		var counter = items_stock.length;

	                for (var i = 0; i < items_stock.length; i++) {
    	               	$(items_stock[i]).show();

			            if ((items_stock[i].id != name && name !== 'Currency') || (itemsow_stock[i].value !== result)) {
        		        	$(items_stock[i]).hide();
              			    counter--;
                    	}

                        if ($(items_stock[i]).is(":visible"))
                        {
                            temp.push(items_stock[i]);
                        }
               		}


                    pageAmount = parseInt((counter + 11) / 12);
                    //console.log("PAGE", pageAmount);

                    for (var i = 0; i < temp.length; i++)
                    {
                    	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


			        var arritems_stock = jQuery.makeArray(temp);

					$(arritems_stock).appendTo(ite);

	                counter = parseInt((counter + 2) / 3);
    	            document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
				}

       			if (filter === "Newest")
				{
					console.log("New C");

                    var temp = [];
               		var counter = items_stock.length;

	                for (var i = 0; i < items_stock.length; i++) {
    	               	$(items_stock[i]).show();

			            if ((items_stock[i].id != name && name !== 'Currency') || (itemsow_stock[i].value !== result)) {
        		        	$(items_stock[i]).hide();
              			    counter--;
                    	}

                        if ($(items_stock[i]).is(":visible"))
                        {
                            temp.push(items_stock[i]);
                        }
               		}


                    pageAmount = parseInt((counter + 11) / 12);
                    //console.log("PAGE", pageAmount);

                    //if (change)
						temp.reverse();

                    for (var i = 0; i < temp.length; i++)
                    {
                    	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


			        var arritems_stock = jQuery.makeArray(temp);

					$(arritems).appendTo(ite);

	                counter = parseInt((counter + 2) / 3);
    	            document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
				}


				if (filter === "Ascending")
				{
					console.log("Asc C");

                    var temp = [];
					var counter = items_stock.length;

    	   			for (var i = 0; i < items_stock.length; i++) {
        				$(items_stock[i]).show();

		        	   	if ((items_stock[i].id != name && name !== 'Currency') || (itemsow_stock[i].value !== result))
						{
            				$(items_stock[i]).hide();
	                		counter--;
    	        		}

                        if ($(items_stock[i]).is(":visible"))
                        {
                            temp.push(items_stock[i]);
                        }
    				}


                    pageAmount = parseInt((counter + 11) / 12);
                    //console.log("PAGE", pageAmount);

                    for (var i = 0; i < temp.length; i++)
                    {
            	        if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


		        	temp.sort(function cmp(a, b)
        			{
		        		if (Number($(a).val()) > Number($(b).val()))
        					return 1;

		        		if (Number($(a).val()) < Number($(b).val()))
        					return -1;

				        return 0;
		        	});

        			var arritems_ascend = jQuery.makeArray(temp);

					$(arritems_ascend).appendTo(ite);

    				counter = parseInt((counter + 2) / 3);
		   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
				}


				if (filter === "Descending")
				{
					console.log("Desc C");

                    var temp = [];
					var counter = items_stock.length;

       				for (var i = 0; i < items_stock.length; i++) {
        				$(items_stock[i]).show();

		            	if ((items_stock[i].id != name && name !== 'Currency') || (itemsow_stock[i].value !== result))
						{
            				$(items_stock[i]).hide();
		                	counter--;
        		    	}

                        if ($(items_stock[i]).is(":visible"))
                        {
                            temp.push(items_stock[i]);
                        }
    				}


                    pageAmount = parseInt((counter + 11) / 12);
                    //console.log("PAGE", pageAmount);

                    for (var i = 0; i < temp.length; i++)
                    {
            	        if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


		        	temp.sort(function cmp(a, b)
        			{
		        		if (Number($(a).val()) < Number($(b).val()))
        					return 1;

		        		if (Number($(a).val()) > Number($(b).val()))
        					return -1;

				        return 0;
		        	});

					var arritems_descend = jQuery.makeArray(temp);

					$(arritems_descend).appendTo(ite);

    				counter = parseInt((counter + 2) / 3);
		   			document.getElementById("content").style.height = ((counter * 470) + (counter * 42) + 50) + 'px';
				}
			});
		}
	}
}
});
