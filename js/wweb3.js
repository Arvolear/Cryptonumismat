$(document).ready(function() {
					//var conNum = '0x386d51a52b36ff03602798418d4d5eec49939c5b';
					//var conNum = '0x94cd987a1660e08c174d754d22c77afe114823a0';
					var conNum = '0xe22f686f95D6859a8b68f9F186d5C06256bB3407';

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
									return _startPrice * 10 / 4;
								else if (_startPrice < 0.5)
								    return _startPrice * 10 / 5;
								else if (_startPrice < 5)
								    return _startPrice * 10 / 6;
								else if (_startPrice < 50)
								    return _startPrice * 10 / 7;
								else
								    return _startPrice * 10 / 8;
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
								            return _startPrice * 10 / 4;
								        else if (_startPrice < 0.5)
								            return _startPrice * 10 / 5;
								        else if (_startPrice < 5)
								            return _startPrice * 10 / 6;
								        else if (_startPrice < 50)
								            return _startPrice * 10 / 7;
								        else
								            return _startPrice * 10 / 8;
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

			            		}
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

										if (Net == 3)
										{
					            			var N = Number(outPri[i].value);

				            				if (N < 0.000001)
					            				N = 0.000001;

		    	               				contract.buy(i + 1, {value: web3.toWei(N, 'ether'), gas: '100000', gasPrice: '5000000000'}, function(error){});
										}
									}
								});
							}
        	            });
            		}
            		for (var i = 0; i < outPri.length; i++)
            		{
            			display(i);
			            press(i);
            		}
});
