    window.addEventListener('load', function()
	{
		setInterval(function()
		{
            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            if (typeof web3 !== 'undefined')
            {
                // Use the browser's ethereum provider
                web3 = new Web3(web3.currentProvider);

				//web3.version.getNetwork(function(error, result)
				//{

				var Net = web3.version.network;

					if (Net == 1)
					{
						web3.eth.getCoinbase(function(error, result)
						{
							if (result === null)
        		            {
                                document.body.innerHTML = '<body><h1>Please login into your account!</h1><h1>You may also need to grant cryptomumismat.com an access to your account (Metamask settings->connections). Don\'t worry, it\'s a readonly operation.</body>';
                		    }
	                	    else
							{
        	   				//document.body.innerHTML = '<body><h1>Successfuly logged in!</h1></body>';

								window.document.location.href = 'intro.html';
							}

						});
					}
					else
					{
            			document.body.innerHTML = '<body><h1>You are probably connected to a wrong Network!</h1></body>';
					}

				//});

			}
        	else
	        {
    	        document.body.innerHTML = '<body><h1>No web3? You should consider trying <a target="_blank" href="https://metamask.io/">Metamask</a>.</h1></body>';
        	}
		}, 100);
    });
