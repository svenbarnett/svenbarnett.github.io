jQuery(document).ready(function() {
    var QRBox = $('#QRBox');
	var MainBox = $('#MainBox');
    var count = 2;
    var WeChatQR = $("#WeChatQR").val()
    var AliPayQR = $("#AliPayQR").val()
	$("#donateBox li,#donateBox li a").css("width", Math.ceil(74+(74*(4-count)/count))+"px");
	function showQR(QR) {
		if(QR) {
			MainBox.css('background-image', 'url(' + QR + ')');
		}
		$('#DonateText,#donateBox,#github').addClass('blur');
		QRBox.fadeIn(300, function(argument) {
			MainBox.addClass('showQR');
		});
	}

	$('#donateBox>li').click(function(event) {
		var thisID = $(this).attr('id');
		if(thisID === 'AliPay') {
			showQR(AliPayQR);
		} else if(thisID === 'WeChat') {
			showQR(WeChatQR);
		}
	});

	MainBox.click(function(event) {
		MainBox.removeClass('showQR').addClass('hideQR');
		setTimeout(function(a) {
			QRBox.fadeOut(300, function(argument) {
				MainBox.removeClass('hideQR');
			});
			$('#DonateText,#donateBox,#github').removeClass('blur');
		}, 600);

	});
});
