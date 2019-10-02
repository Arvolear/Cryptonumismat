$(document).ready(function()
{
	var ite = $('#main-content');
	var items = $('#main-content .block');
	var counter = items.length;

	counter = parseInt((counter + 2) / 3);

	document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';


	var items_stock = $('#main-content .block');
	var itemsow_stock = $('#main-content .block .owner');

	var pageK = 12;
	var pageAmount = parseInt((items.length + 11) / 12);

    var where = "Marketplace";
    var filter = "Oldest";
    var change = "Currency";
    var truth = false;


///////////////////////////////////////////////////////////////////////////////
//$(document).ready(function() {
					//var conNum = '0xe4e5388457a381eb608c09aa6e63330c9ff6fc09'; // MainNet
					var conNum = '0xe22f686f95d6859a8b68f9f186d5c06256bb3407'; // MainNet
					//var conNum = '0x94cd987a1660e08c174d754d22c77afe114823a0'; // Ropsten


            		var contract = web3.eth.contract(abi).at(conNum);

            		var contractAssign = contract.Assign();

					var bblock = $('#main-content .block');

            		var outOwn = $('#main-content .block .owner');
            		var outPri = $('#main-content .block .price');
            		var buyBut = $('#main-content .block .buy');
					var outNextPri = $('#main-content .block .next-price');
					var outFee = $('#main-content .block .fee');

            		contractAssign.watch(function(error, result)
			        {
            			if (!error)
			           	{
            				outOwn[result.args._cardIndex - 1].value = String(result.args._seller);
			           		outPri[result.args._cardIndex - 1].value = String((result.args._value / 1000000000000000000));

							function calculateNextPrice(_startPrice)
							{
								if (_startPrice < 0.05)
									_startPrice = _startPrice * 10 / 4;
								else if (_startPrice < 0.5)
								    _startPrice = _startPrice * 10 / 5;
								else if (_startPrice < 5)
								    _startPrice = _startPrice * 10 / 6;
								else if (_startPrice < 50)
								    _startPrice = _startPrice * 10 / 7;
								else
								    _startPrice = _startPrice * 10 / 8;

								return (_startPrice / 1000000) * 1000000;
							}

							function calculateDevCut(_startPrice)
							{
							    if (_startPrice < 0.5)
							        return '5%';
							    else if (_startPrice < 5)
							        return '4%';
							    else if (_startPrice < 50)
							        return '3%';
							    else
							        return '2%';
							}

							bblock[result.args._cardIndex - 1].value = String((result.args._value / 1000000000000000000));

	                       	outPri[result.args._cardIndex - 1].style.width = ((String((result.args._value / 1000000000000000000)).length) * 10) + 'px';

							outNextPri[result.args._cardIndex - 1].value = String((calculateNextPrice(result.args._value / 1000000000000000000)));
							outNextPri[result.args._cardIndex - 1].style.width = (String(String((calculateNextPrice(result.args._value / 1000000000000000000))).length) * 10) + 'px';

							outFee[result.args._cardIndex - 1].value = String(calculateDevCut(result.args._value / 1000000000000000000));
            			}
			        });

					var help = 0;

            		function display(i)
            		{
			            contract.displayCard(i + 1, function(error, result)
            			{
            				if (!error)
			            	{
            					if (result[1] !== '0x')
			            		{
						            outOwn[i].value = String(result[1]);
            						outPri[i].value = String((result[2] / 1000000000000000000));

									function calculateNextPrice(_startPrice)
									{
										if (_startPrice < 0.05)
											_startPrice = _startPrice * 10 / 4;
										else if (_startPrice < 0.5)
										    _startPrice = _startPrice * 10 / 5;
										else if (_startPrice < 5)
										    _startPrice = _startPrice * 10 / 6;
										else if (_startPrice < 50)
										    _startPrice = _startPrice * 10 / 7;
										else
										    _startPrice = _startPrice * 10 / 8;

										return (_startPrice / 1000000) * 1000000;
									}

								    function calculateDevCut(_startPrice)
								    {
								        if (_startPrice < 0.5)
								            return '5%';
								        else if (_startPrice < 5)
								            return '4%';
								        else if (_startPrice < 50)
								            return '3%';
								        else
								            return '2%';
								    }

									bblock[i].value = String((result[2] / 1000000000000000000));

                        			outPri[i].style.width = ((String((result[2] / 1000000000000000000)).length) * 10) + 'px';

									outNextPri[i].value = String((calculateNextPrice(result[2] / 1000000000000000000)));
									outNextPri[i].style.width = (String(String((calculateNextPrice(result[2] / 1000000000000000000))).length) * 10) + 'px';
									outFee[i].value = String(calculateDevCut(result[2] / 1000000000000000000));

									help++;
									//console.log(help, $("#main-content .block").length);
									if (help == $("#main-content .block").length)
									{
										ss("Marketplace", "Descending", "Currency", false, 0);
										$('#select-main').val("Descending");
										filter = "Descending";
										help = 0;
									}
			            		}
            				}
							else
							{
								console.log("Err");
							}
			            });
            		}

            		function press(i)
            		{
			            $(buyBut[i]).click(function()
                   		{
				            if (typeof web3 !== 'undefined')
				            {
				                web3 = new Web3(web3.currentProvider);

								web3.eth.getCoinbase(function(error, result)
								{
									console.log(outOwn[i].value, result);

									if(outOwn[i].value != result && result !== null)
									{
										var Net = web3.version.network;

										if (Net == 1)
										{
					            			var N = Number(outPri[i].value);

				            				if (N < 0.000001)
					            				N = 0.000001;

		    	               				contract.transfer(result, i + 1, {value: web3.toWei(N, 'ether'), gas: '100000', gasPrice: '5000000000'}, function(error){});
										}
									}
								});
							}
        	            });
            		}

					setTimeout(function()
					{
						for (var i = 0; i < $("#main-content .block").length; i++)
	            		{
    	        			display(i);
				            press(i);
            			}
					}, 100);
//});
/////////////////////////////////////////////////////////////////////////







    var opts =
    {
        totalPages: pageAmount,
        visiblePages: 4,
		startPage: 1,
        first: 'First',
        next: '',
        prev: '',
        last: 'Last',
        onPageClick: function (event, page)
        {
            function figure_out(truth)
            {
                //console.log(where, filter, change, truth, page - 1);
                ss(where, filter, change, truth, page - 1);
            }

            $('#cur2').change(function() {

                if (where != $('#cur2').val())
                {
                    where = $('#cur2').val();
                    filter = "Descending";
                    change = "Currency";
                    truth = true;

                    $('#cur').val(change);
                    $('#select-main').val(filter);

                    figure_out(truth);
                }
            });


            $('#select-main').change(function() {

                if (filter != $('#select-main').val())
                {
                    where = $('#cur2').val();
                    filter = $('#select-main').val();
                    change = $('#cur').val();
                    truth = true;

                    figure_out(truth);
                }
            });


            $('#cur').change(function() {

                if (change != $('#cur').val())
                {
                    where = $('#cur2').val();
                    filter = $('#select-main').val();
                    change = $('#cur').val();
                    truth = true;

                    figure_out(truth);
                }
            });

            figure_out(false);
        }
    }


$('.pagination').twbsPagination(opts);

function renovate()
{
	console.log(pageAmount);

    if ($('.pagination').data("twbs-pagination"))
    {
        $('.pagination').twbsPagination('destroy');
    }

	if (pageAmount < 1)
		pageAmount = 1;

    $('.pagination').twbsPagination($.extend(opts, {
        totalPages: pageAmount,
		startPage: 1,
    }));
}

/*$('#cur').change(function() {
	setTimeout(renovate, 100);
});

$('#cur2').change(function() {
	setTimeout(renovate, 100);
});

$('#select-main').change(function() {
	setTimeout(renovate, 100);
});*/

/*setTimeout(function() {
	$('#select-main').val("Descending");

	ss("Marketplace", "Descending", "Currency", false, 0);
}, 1500);*/

function ss(where, filter, name, change, page) {


	if (where === "Marketplace")
	{
       	if (filter === "Oldest")
		{
			console.log("Old");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (!($(items_stock[i]).hasClass(name)) && name !== 'Currency')
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Newest")
		{
			console.log("New");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (!($(items_stock[i]).hasClass(name)) && name !== 'Currency')
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Ascending")
		{
			console.log("Asc");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (!($(items_stock[i]).hasClass(name)) && name !== 'Currency')
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) > Number($(b).val()))
					return 1;

				if (Number($(a).val()) < Number($(b).val()))
					return -1;

				return 0;
			});


            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_ascend = jQuery.makeArray(temp);

			$(arritems_ascend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}


		if (filter === "Descending")
		{
			console.log("Desc");


            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if (!($(items_stock[i]).hasClass(name)) && name !== 'Currency')
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) < Number($(b).val()))
					return 1;

				if (Number($(a).val()) > Number($(b).val()))
					return -1;

				return 0;
			});

			//console.log(temp);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_descend = jQuery.makeArray(temp);

			$(arritems_descend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}
	}








	else if (where === "United")
	{
       	if (filter === "Oldest")
		{
			console.log("UOld");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Newest")
		{
			console.log("UNew");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Ascending")
		{
			console.log("UAsc");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) > Number($(b).val()))
					return 1;

				if (Number($(a).val()) < Number($(b).val()))
					return -1;

				return 0;
			});


            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_ascend = jQuery.makeArray(temp);

			$(arritems_ascend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}


		if (filter === "Descending")
		{
			console.log("UDesc");


            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) < Number($(b).val()))
					return 1;

				if (Number($(a).val()) > Number($(b).val()))
					return -1;

				return 0;
			});

			//console.log(temp);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_descend = jQuery.makeArray(temp);

			$(arritems_descend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}
	}








	else if (where === "Common")
	{
       	if (filter === "Oldest")
		{
			console.log("COld");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Newest")
		{
			console.log("CNew");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

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
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}

		if (filter === "Ascending")
		{
			console.log("CAsc");

            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) > Number($(b).val()))
					return 1;

				if (Number($(a).val()) < Number($(b).val()))
					return -1;

				return 0;
			});


            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_ascend = jQuery.makeArray(temp);

			$(arritems_ascend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
		}


		if (filter === "Descending")
		{
			console.log("CDesc");


            var temp = [];
			var counter = items_stock.length;

       		for (var i = 0; i < items_stock.length; i++) {
        		$(items_stock[i]).show();

            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || !($(items_stock[i]).hasClass(where)))
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

			if (change)
			{
				console.log(pageAmount);
				renovate();
			}

			temp.sort(function cmp(a, b)
			{
				if (Number($(a).val()) < Number($(b).val()))
					return 1;

				if (Number($(a).val()) > Number($(b).val()))
					return -1;

				return 0;
			});

			//console.log(temp);

            for (var i = 0; i < temp.length; i++)
            {
            	if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                {
                    $(temp[i]).hide();
                    counter--;
                }
            }


			var arritems_descend = jQuery.makeArray(temp);

			$(arritems_descend).appendTo(ite);

    		counter = parseInt((counter + 2) / 3);
   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
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

			            if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || (itemsow_stock[i].value !== result)) {
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

					if (change)
					{
						console.log(pageAmount);
						renovate();
					}

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
    	            document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
				}

       			if (filter === "Newest")
				{
					console.log("New C");

                    var temp = [];
               		var counter = items_stock.length;

	                for (var i = 0; i < items_stock.length; i++) {
    	               	$(items_stock[i]).show();

			            if ((!($(items_stock[i]).hasClass(name)) != name && name !== 'Currency') || (itemsow_stock[i].value !== result)) {
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

					if (change)
					{
						console.log(pageAmount);
						renovate();
					}

					//console.log(temp);

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
    	            document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
				}


				if (filter === "Ascending")
				{
					console.log("Asc C");

                    var temp = [];
					var counter = items_stock.length;

    	   			for (var i = 0; i < items_stock.length; i++) {
        				$(items_stock[i]).show();

		        	   	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || (itemsow_stock[i].value !== result))
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

					if (change)
					{
						console.log(pageAmount);
						renovate();
					}

		        	temp.sort(function cmp(a, b)
        			{
		        		if (Number($(a).val()) > Number($(b).val()))
        					return 1;

		        		if (Number($(a).val()) < Number($(b).val()))
        					return -1;

				        return 0;
		        	});

                    for (var i = 0; i < temp.length; i++)
                    {
            	        if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


        			var arritems_ascend = jQuery.makeArray(temp);

					$(arritems_ascend).appendTo(ite);

    				counter = parseInt((counter + 2) / 3);
		   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
				}


				if (filter === "Descending")
				{
					console.log("Desc C");

                    var temp = [];
					var counter = items_stock.length;

       				for (var i = 0; i < items_stock.length; i++) {
        				$(items_stock[i]).show();

		            	if ((!($(items_stock[i]).hasClass(name)) && name !== 'Currency') || (itemsow_stock[i].value !== result))
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

					if (change)
					{
						console.log(pageAmount);
						renovate();
					}

		        	temp.sort(function cmp(a, b)
        			{
		        		if (Number($(a).val()) < Number($(b).val()))
        					return 1;

		        		if (Number($(a).val()) > Number($(b).val()))
        					return -1;

				        return 0;
		        	});

                    for (var i = 0; i < temp.length; i++)
                    {
            	        if (i < page * pageK || i >= Math.min(38, (page + 1) * pageK))
                        {
                            $(temp[i]).hide();
                            counter--;
                        }
                    }


					var arritems_descend = jQuery.makeArray(temp);

					$(arritems_descend).appendTo(ite);

    				counter = parseInt((counter + 2) / 3);
		   			document.getElementById("content").style.height = ((counter * 500) + (counter * 42) + 30) + 'px';
				}
			});
		}
	}
}

});
//////////////////////////////////////////////////////
/*$(document).ready(function() {
(function($) {

  $.fn.visible = function(partial) {
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  	};
	})(jQuery);

var win = $(window);
var allMods = $(".block");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible");
  	}
	});

win.scroll(function(event) {
  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in");
    	}
  	});
	});
});*/
///////////////////////////////////////////////////////////////////////////////////////////
