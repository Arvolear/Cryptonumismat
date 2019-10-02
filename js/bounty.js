$(document).ready(function()
{
	var N = document.getElementById('c-Nick-input');

	N.value = "Connecting...";
	N.style.color = "#ff0000";

	setInterval(function() 
	{
	    var Nick = document.getElementById('c-Nick-input');

		if (typeof web3 !== 'undefined')
		{
			web3 = new Web3(web3.currentProvider);

//			web3.version.getNetwork(function(error, result) {

			var	Net = web3.version.network;

				if (Net == 1)
				{
					web3.eth.getCoinbase(function(error, result)
					{
						if (result != null)
						{
							Nick.value = result;
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

			//});
		}
		else
		{			
			Nick.value = "No Web3!";
			Nick.style.color = "#ff0000";
		}
	}, 100);
});
