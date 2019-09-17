const SLOTS_PER_REEL = 12, REEL_RADIUS = 150;
// radius = Math.round((panelWidth/2)/Math.tan(Math.PI/SLOTS_PER_REEL));
if (localStorage.getItem("autoclicker") == 'true') startClicker();

function createSlots (ringNum) {
    var ring = $('#ring'+ringNum), slotAngle = 360 / SLOTS_PER_REEL, seed = getSeed();
	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div'), transform = `rotateX(${slotAngle*i}deg) translateZ(${REEL_RADIUS}px)`, num = (seed+i)%12;
		slot.className = 'slot';
		slot.style.transform = transform;
		$(slot).append(`<p id="${ringNum}_${i}">${num}</p>`);
		ring.append(slot);
	}
}

function getSeed() {
	return Math.floor(Math.random()*SLOTS_PER_REEL);
}

function spin(timer) {
	for(var i=1;i<6;i++) {
		var oldSeed = -1, oldClass = $('#ring'+i).attr('class'), seed = getSeed();
		if(oldClass.length > 4) oldSeed = parseInt(oldClass.slice(10));
		while(oldSeed == seed) seed = getSeed();
		$('#ring'+i).css('animation',`back-spin 1s, spin-${seed} ${timer+i*0.5}s`).attr('class',`ring spin-${seed}`);
	}
	setTimeout(() => {
		var numbers = [], ring = [], current = null, cnt = 0;
		for (var i=1;i<6;i++) ring[i-1] = parseInt($("#ring"+i).attr("class").split(" ")[1].split("-")[1]);
		for (var i=0;i<5;i++) for (var j=0;j<12;j++) if (ring[i] == j) numbers[i] = $("#"+(i+1)+"_"+((j+4)%12)).text();

		function check(cnt) {
			if (cnt > 4) {
				alert("CONGRATS!!!\nYou won the MEGA jackpot!!!\n+1,000 OwO's!!!");
				OwO += 1000;
				localStorage.setItem("OwO", OwO);
				$("#OwO").text(`OwO (${OwO})`);
			} else if (cnt > 2) {
				alert("CONGRATS! You won the jackpot!\n+100 OwO's!");
				OwO += 100;
				localStorage.setItem("OwO", OwO);
				$("#OwO").text(`OwO (${OwO})`);
			}
		}

		numbers.sort();
		for (var i = 0; i < numbers.length; i++) {
			if (numbers[i] != current) {
				check(cnt);
				current = numbers[i], cnt = 1;
			} else cnt++;
		}
		check(cnt);
	}, ((timer+i*0.5)+1)*1000);
}

$(document).ready(function() {
	for (var i = 1; i <= 5; i++) createSlots(i);
 	$('.go').on('click',function(){
		var OwO = localStorage.getItem("OwO");
		if (OwO != null) {
			OwO = parseInt(OwO);
			if (OwO > 0) {
				OwO--;
				localStorage.setItem("OwO", OwO);
				$("#OwO").text(`OwO (${OwO})`);
				spin(10);
			} else alert("Not enough OwO's!\n(Wins on Lucky Charms)");
		}
 	})

 	$('#xray').on('click',function(){
        if($(this).is(':checked')) {
 			$('.slot').addClass('backface-on');
 			$('#rotate').css('animation','tiltin 2s 1');

			setTimeout(function(){
				$('#rotate').toggleClass('tilted');
			},2000);
 		} else {
 			$('#rotate').css({'animation':'tiltout 2s 1'});

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
