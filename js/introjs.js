    var pups = document.getElementsByClassName('c-popup');

    function PopUpShowF(i) {
        $(pups[i]).show();
    }

$(document).ready(function() {

    var OKBut = document.getElementsByClassName('c-close-popup');

    var linkToBo = document.getElementsByClassName('click-on-bounty');

    //console.log(pups);

    function PopUpHideF(i) {
        $(pups[i]).hide();
    }

	$(linkToBo).click(function() {
		Cookies.set('bounty_program', '1', { expires: 3 });
        PopUpHideF(1);
	});

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

$(document).ready(function()
{
	if (Cookies.get('bounty_program') != '1')
	{
		setTimeout(function()
		{
			PopUpShowF(1);
		}, 2000);

	}
});

$(document).ready(function()
{
	console.log(Cookies.get("bounty_program"));

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
