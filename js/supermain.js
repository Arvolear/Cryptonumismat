$(document).ready(function()
{
	var N = document.getElementById('Nick-input');

	N.value = "Connecting...";
	N.style.color = "#ff0000";

	setInterval(function()
	{
	    var Nick = document.getElementById('Nick-input');

		if (typeof web3 !== 'undefined')
		{
			web3 = new Web3(web3.currentProvider);

			web3.version.getNetwork(function(error, Net)
			{
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
							window.document.location.href = 'index.html';
						}
					});
				}
				else
				{
					Nick.value = "Wrong network!";
					Nick.style.color = "#ff0000";
					window.document.location.href = 'index.html';
				}
			});
		}
		else
		{
			Nick.value = "No Web3!";
			Nick.style.color = "#ff0000";
			window.document.location.href = 'index.html';
		}
	}, 100);
});

$(document).ready(function()
{
    var moneyinfo = [
    {
        info: "The United States one-dollar bill ($1) is a denomination of United States currency. An image of the first U.S. President (1789-97), George Washington, based on a painting by Gilbert Stuart, is currently featured on the obverse (front), and the Great Seal of the United States is featured on the reverse (back). The one-dollar bill has the oldest overall design of all U.S. currency currently being produced (The current two-dollar bill obverse design dates from 1928, while the reverse appeared in 1976). The obverse design of the dollar bill seen today debuted in 1963 (the reverse in 1935) when it was first issued as a Federal Reserve Note (previously, one dollar bills were Silver Certificates).",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States two-dollar bill ($2) is a    current denomination of U.S. currency. The third U.S. President (1801-09), Thomas Jefferson, is featured on the obverse of the note. The reverse features an engraving of the painting The Declaration of Independence by John Trumbull. When U.S. currency was changed to its current size, the $2 bill was issued only as a United States Note. Production went on until 1966, when the series was discontinued. Ten years passed before the $2 bill was reissued as a Federal Reserve Note with a new reverse design. Two-dollar bills are seldom seen in circulation as a result of banking policies with businesses which has resulted in low production numbers due to lack of demand.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States five-dollar bill ($5) is a  denomination of United States currency. The current $5 bill features the 16th U.S. President (1861-65), Abraham Lincoln's portrait on the front and the Lincoln Memorial on the back. All $5 bills issued today are Federal Reserve Notes. The $5 bill is sometimes nicknamed a \"fin\". The term has German/Yiddish     roots and is remotely related to the English \"five\", but it is far less common today than it was in the late 19th and early 20th centuries. The Bureau of Engraving and Printing says the average life of a $5 bill in circulation is 5.5 years before it is replaced due to wear. Approximately 6% of all paper currency produced by the U.S. Treasury's Bureau of Engraving and Printing in 2009 were $5 bills.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States ten-dollar bill ($10) is a denomination of U.S. currency. The obverse of the bill features the portrait of Alexander Hamilton, who served as the first U.S. Secretary of the Treasury. The reverse features the U.S. Treasury Building. All $10 bills issued today are Federal Reserve Notes. As of December 2013, the average life of a $10 bill is 4.5 years, or about 54 months, before it is replaced due to wear. Ten-dollar bills are delivered by Federal Reserve Banks in yellow straps. The source of the portrait on the $10 bill is John Trumbull\'s 1805 painting of Hamilton that belongs to the portrait collection of New York City Hall. The $10 bill is unique in that it is the only denomination in circulation in which the portrait faces to the left.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States twenty-dollar bill ($20) is a  denomination of U.S. currency. The seventh U.S. President (1829-1837), Andrew Jackson, has been featured on the front side of the bill since 1928; the White House is featured on the reverse. As of December 2013, the average circulation life of a $20 bill is 7.9 years before it is replaced due to wear. About 11% of all notes printed in 2009 were $20 bills. Twenty-dollar bills are delivered by Federal Reserve Banks in violet      straps. In a campaign called \"Women on 20s\", selected voters were asked to choose three of 15 female candidates to have a portrait on the $20 bill. The goal was to have a woman on the $20 bill by 2020, the centennial of the 19th Amendment which gave women the right to vote.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States fifty-dollar bill ($50) is a denomination of United States currency. The 18th U.S. President (1869-77), Ulysses S. Grant, is featured on the obverse, while the U.S. Capitol is featured on the reverse. All current-issue $50 bills are Federal Reserve Notes. As of December 2013, the average life of a $50 bill in circulation is 8.5 years, or approximately 102 months, before it is replaced due to wear. Approximately 6% of all notes printed in 2009 were $50 bills. They are delivered by Federal Reserve Banks in brown straps.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The United States one hundred-dollar bill ($100) is a denomination of United States currency. Statesman, inventor, diplomat, and American founding father Benjamin Franklin is  featured on the obverse of the bill. On the reverse of the banknote is an image of Independence Hall. The $100 bill is the largest denomination that has been printed since July 13, 1969, when the denominations of $500, $1.000, $5.000, and $10.000 were retired. The Bureau of Engraving and Printing says the average life of a $100 bill in circulation is 90 months (7.5 years) before it is replaced due to wear and tear.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The five euro note (&#8364 5) is the lowest value euro banknote and has been used since the introduction of the euro in 2002. The five euro note is the smallest at 120 x 62 mm with a grey colour scheme. All bank notes depict bridges, arches or doorways in a different historical European style; the five euro note shows the Classical era (up to the fifth century). Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and art are merely hypothetical examples of the architectural era. Like all euro notes, it contains the denomination, the EU flag, the signature of the president of the ECB and the initials of said bank in different EU languages, a depiction of EU territories overseas, the stars from the EU flag and twelve security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The ten euro note (&#8364 10) is the second-lowest value euro banknote and has been used since the introduction of the euro in 2002. The ten euro note is the second smallest at 127 mm x 67 mm with a red colour scheme. All bank notes depict bridges and arches/doorways in a different historical European style; the ten euro note shows the Romanesque era. Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and art are merely hypothetical examples of the architectural era. Like all euro notes, it contains the denomination, the EU flag, the signature of the president of the ECB and the initials of said bank in different EU languages, a depiction of EU territories overseas, the stars from the EU flag and twelve security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The twenty euro note (&#8364 20) is the third-lowest value euro banknote and has been used since the introduction of the euro in 2002. The twenty euro note is the third smallest euro note at 133 mm x 72 mm with a blue colour scheme. All bank notes depict bridges and arches/doorways in a different historical European style; the twenty euro note shows the gothic era. Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and art are merely hypothetical examples of the architectural era. Like all euro notes, it contains the denomination, the EU flag, the signature of the president of the ECB and the initials of said bank in different EU languages, a depiction of EU territories overseas, the stars from the EU flag and thirteen security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The fifty euro note (&#8364 50) is one of the middle value euro banknotes and has been used since the introduction of the euro in 2002. The fifty euro note is the fourth smallest note, measuring 140 mm x 77 mm, with an orange colour scheme. Each euro banknote depicts bridges and arches/doorways in a different historical European style; the &#8364 50 note shows the Renaissance era. Although Robert Kalina's original designs were  intended to show real monuments, for political reasons the bridge and the window are merely hypothetical examples of the architectural era. Like all euro notes, the &#8364 50 note shows the denomination, the EU flag, the signature of the president of the ECB, the initials of the ECB in the different EU languages, a depiction of EU territories overseas, the stars from the EU flag and security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The one hundred euro note (&#8364 100) is one of the higher value euro banknotes and has been used since the introduction of the euro (in its cash form) in 2002. The hundred euro note measures at 147 mm x 82 mm and has a green colour scheme. All bank notes depict bridges and arches/doorways in a different historical European style; the hundred euro note shows the Baroque and Rococo style. Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and artare merely hypothetical examples of the architectural era. Like all euro notes, it contains the denomination, the EU flag,the signature of the president of the ECB and the initials of said bank in different EU languages, a depiction of EU territoriesoverseas, the stars from the EU flag and twelve security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The two hundred euro note (&#8364 200) is the second-highest value euro banknote and has been used since the introduction of the euro (in its cash form) in 2002. The &#8364 200 note measures 153 mm x 82 mm and has a yellow colour scheme. All euro banknotes depict bridges and arches/doorways, each in a different historical European style: the &#8364 200 note shows the Art Nouveau era. Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and art are merely hypothetical examples of the architectural era. Like all euro notes, it contains the denomination, the EU flag, the signature of the president of the ECB and the initials of that bank in different EU languages, a depiction of EU territories overseas, the stars from the EU flag and twelve security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The five hundred euro note (&#8364 500) is the highest-value euro banknote and has been used since the introduction of the euro in 2002. The five hundred euro note measures at 160 mm x 82 mm with a purple colour scheme. All bank notes depict bridges and arches/doorways in a different historical European style; the five hundred euro note shows Modern architecture. Although Robert Kalina's original designs were intended to show real monuments, for political reasons the bridge and art are merely hypothetical examples of the architectural era. Nevertheless, the featured bridge is highly similar to Guadiana International Bridge. Like all euro notes, it contains the denomination, the EU flag, the signature of the president of the ECB and the initials of said bank in different EU languages, a depiction of EU territories overseas, the stars from the EU flag and twelve security features.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "Bitcoin is a cryptocurrency, a digital asset designed to work as a medium of exchange that uses cryptography to control its creation and management, rather than relying on central authorities. The presumed pseudonymous Satoshi Nakamoto integrated many existing ideas from the cypherpunk community   when creating bitcoin. On 18 August 2008, the domain name bitcoin.org was registered. Later that year on 31 October, a link to a paper authored by Satoshi Nakamoto titled Bitcoin: A Peer-to-Peer Electronic Cash System was posted to a cryptography mailing list. This paper detailed methods of using a peer-to-peer network to generate what was described as \"a system for electronic transactions without relying on trust\". On 3 January 2009, the bitcoin network came into existence with Satoshi Nakamoto mining the genesis block of bitcoin, which had a reward of 50 bitcoins.",
        picture: "btc.png",
        pwidth: "210px",
        pheight: "210px"
    },
    {
        info: "Ethereum is an open-source, public, blockchain-based distributed computing platform and operating system featuring smart contract (scripting) functionality. It supports a modified version of Nakamoto consensus via transaction based state transitions. Ethereum was initially described in a white  paper by Vitalik Buterin, a programmer involved with Bitcoin Magazine, in late 2013 with a goal of building decentralized   applications. Buterin had argued that Bitcoin needed a scripting language for application development. Failing to gain   agreement, he proposed development of a new platform with a more general scripting language.",
        picture: "eth.png",
        pwidth: "210px",
        pheight: "210px"
    },
    {
        info: "The history of the United States Dollar refers to more than 240 years since the Continental Congress of the United States authorized the issuance of Continental Currency in 1775. On April 2, 1792, the United States Congress created the United States dollar as the country\'s standard unit of money. After the creation of the U.S. dollar, the fledgling American administration of President     George Washington turned its attention to monetary issues again in the early 1790s under the leadership of Alexander Hamilton, the Secretary of the Treasury at the time. Congress acted on Hamilton\'s recommendations in the Coinage Act of 1792, which established the dollar as the basic unit of account for the United States. The word dollar is derived from Low Saxon cognate of the High German Thaler. The most commonly circulated and readily available currency, used by common Americans, at this time, was the Spanish Peso, also known as the \"Spanish milled dollar\", which was valued for its high silver content.",
        picture: "Dollar-country.png",
        pwidth: "210px",
        pheight: "130px"
    },
    {
        info: "The euro came into existence on 1 January 1999, although it had been a goal of the European Union (EU) and its predecessors since the 1960s. After tough negotiations, particularly due to opposition from the United Kingdom, the Maastricht Treaty entered into force in 1993 with the goal of creating an economic and monetary union by 1999 for all EU states except the UK and Denmark. First ideas of an economic and monetary union in Europe were raised well before establishing the European Communities. For example, already in the League of Nations, Gustav Stresemann asked in 1929 for a European currency against the background of an increased economic division due to a number of new nation states in Europe after World War I.",
        picture: "Euro-flag.png",
        pwidth: "210px",
        pheight: "130px"
    }

    ];

    var infocode = "";

    for (var i = 0; i < moneyinfo.length; i++)
    {
        var moninfo = moneyinfo[i];

        infocode += '<div class="b-popup" id="popup' + (i + 2) +  '">' +
                    '<div class="b-popup-content">' +
                        '<img src="./images2/intro/' + moninfo.picture + '" style="width: ' + moninfo.pwidth + '; height: ' + moninfo.pheight + '; position: relative; float: left;" alt="Didn\'t Download">' +
						'<div align="center" style="width: 100%">' +
	                        '<p style="width: 80%; text-align: center;">' + moninfo.info + '</p>' +
    	                    '<input type="button" value="OK" class="close-popup">' +
						'</div>' +
                    '</div>' +
                '</div>';
    }

    $("#info-popups").html(infocode);
});


$(document).ready(function()
{
	var money = [
	{
        about: "Common",
		type: "Dollar",
		prices: [1, 2, 5, 10, 20, 50, 100],
		country: "USA"
	},
    {
        about: "Common",
        type: "Euro",
        prices: [5, 10, 20, 50, 100, 200, 500],
        country: "Europe"
    },
    {
        about: "Common",
        type: "BTC",
        prices: [1],
        country: "Bitcoin"
    },
    {
        about: "Common",
        type: "ETH",
        prices: [1],
        country: "Ethereum"
    },
    {
        about: "United",
        type: "Dollar",
        prices: ["Every"],
        country: ""
    },
    {
        about: "United",
        type: "Euro",
        prices: ["Every"],
        country: ""
    },
    /*{
        type: "Grivna",
        prices: [1, 2, 5, 10, 20, 50, 100, 200, 500],
        country: "Ukraine"
    },*/
	];

	var code = "";
    var index = 0;
	for (var i = 0; i < money.length; i++)
	{
		var mon = money[i];
		for (var j = 0; j < mon.prices.length; j++)
		{
			var price = mon.prices[j];

			var type = mon.type;

			if (index != 0 && (index < 7 || index > 17))
				type = mon.type + 's';

			code += '<div class="block ' + mon.type + ' ' + mon.about + '">' +
						'<a href="javascript:PopUpShowF(' + (index + 2) + ')">' +
                        '<div class="' + mon.about + '-top"' + '>' +
                            '<p>' + mon.about + '</p>' +

                        '</div>' +
							'<img src="./images2/' + mon.type + '/' + price + '.png" style="background: url(./images2/' + mon.type + '/' + price + '.png); background-size:100% 310px;" class="content-img" alt="Didn\'t download">' +
						'</a>' +
						'<div class="' + mon.about + '-descrip">' +
							mon.country + ' ' + price + ' ' + type +
						'</div>' +
						'<div class="owner-block-0">' +
							'Owner: ' +
							'<input type="text" class="owner" readonly>' +
						'</div>' +
						'<div class="owner-block-1">' +
							'Price: ' +
							'<input type="text" class="price" readonly>' +
							'ETH ' +
							'<input type="submit" class="buy" value="BUY">' +
						'</div>' +
						'<div class="owner-block-2">' +
							'Next price:' +
							'<input type="text" class="next-price" readonly>' +
							'ETH &nbsp &nbsp' +
							'Fee:' +
							'<input type="text" class="fee" readonly>' +
						'</div>' +
					'</div>';
            index++;
		}
	}


	$("#main-content").html(code);

});


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

    for (var i = 0; i <= pups.length; i++)
    {
        CheckOK(i);
        PopUpHideF(i);
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////
