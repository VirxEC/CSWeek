const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

function createSlots (ring) {
	var slotAngle = 360 / SLOTS_PER_REEL;
	var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		slot.className = 'slot';
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
		slot.style.transform = transform;
		var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');
		ring.append(slot);
	}
}

function getSeed() {
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
	for(var i = 1; i < 6; i ++) {
		var oldSeed = -1;
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) oldSeed = parseInt(oldClass.slice(10));
		var seed = getSeed();
		while(oldSeed == seed) {
			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}
}

$(document).ready(function() {
 	createSlots($('#ring1'));
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	createSlots($('#ring5'));
 	$('.go').on('click',function(){
		if (parseInt(localStorage.getItem("OwO")) > 0) {
			localStorage.setItem("OwO", OwO-1);
			var timer = 2;
			spin(timer);
		} else alert("Not enough OwO's!\n(Wins on Lucky Charms)");
 	})

 	$('#xray').on('click',function(){
 		var tilt = 'tiltout';
 		
    		if($(this).is(':checked')) {
 			tilt = 'tiltin';
 			$('.slot').addClass('backface-on');
 			$('#rotate').css('animation',tilt + ' 2s 1');

			setTimeout(function(){
				$('#rotate').toggleClass('tilted');
			},2000);
 		} else {
      			tilt = 'tiltout';
 			$('#rotate').css({'animation':tilt + ' 2s 1'});

			setTimeout(function(){
	 			$('#rotate').toggleClass('tilted');
	 			$('.slot').removeClass('backface-on');
	 		},1900);
 		}
 	});

 	$('#perspective').on('click',function(){
 		$('#stage').toggleClass('perspective-on perspective-off');
 	})	
 });
