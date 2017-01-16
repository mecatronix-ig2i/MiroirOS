function loadJS() {
	$('.weather-temperature').openWeather({
				key: 'c9d49310f8023ee2617a7634de23c2aa',
				city: 'Lens',
				descriptionTarget: '.weather-description',
				windSpeedTarget: '.weather-wind-speed',
				minTemperatureTarget: '.weather-min-temperature',
				maxTemperatureTarget: '.weather-max-temperature',
				humidityTarget: '.weather-humidity',
				sunriseTarget: '.weather-sunrise',
				sunsetTarget: '.weather-sunset',
				placeTarget: '.weather-place',
				iconTarget: '.weather-icon',
				customIcons: '../src/img/icons/weather/',
				success: function() {
				
					//show weather
					$('.weather-wrapper').show();
					
				},
				error: function(message) {
				
					console.log(message);
				
				}
			});
			
	var clock = $('.your-clock').FlipClock({
		clockFace: 'TwentyFourHourClock'
	});
	
	majNews();
}

function majNews() {
	 $.ajax({
       url : './assets/php/functions/data.php',
       type : 'POST', // Le type de la requête HTTP, ici devenu POST
	   data: {action:"getRSS"}, 
	   complete : function(res, statut){
			res = res["responseText"];
			res = JSON.parse(res);
			res = res.flux.item;
			console.log(res);
			var content = '<h2>Quelque news ?</h2>';
			for(var i = 0; i < 3; i++) {
				content += '<div class="newsItem">' +
				'<h3>' + res[i].title + '</h3>' +
				'<p>' + res[i].description + '</p>' +
				'</div><hr/>';
			}
			content += '<div class="newsItem">' +
				'<h3>' + res[i+1].title + '</h3>' +
				'<p>' + res[i+1].description + '</p>' +
				'</div>';
			$("#newsFrame").html(content);
       }
    });
}