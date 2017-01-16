var igdeuzi = "<h2>L'IG2I ? </h2>" +
			"<h3>Ecole d'ingénieur fondée en 1992, L' Institut de génie informatique et industriel" +
			"(IG2I) créé à Lens en 1992 est un centre de formation de l'école Centrale de Lille." +
			"Il recrute au niveau bac et forme des ingénieurs dans le domaine de l'informatique ou industriel en 5 années. </h3><br/>" +
			"<h3>Le cursus comporte une part importante" +
			"de stages en entreprises (20 mois répartis sur les 5 ans) dont un au moins dans un pays de langue anglaise.</h3><br/>" +
			
			"<h2>Pourquoi nous rejoindre ? </h2>" +
			"<h3>Non seulement les cours sont intéressants et variés, mais en plus il règne à l'IG2I une très bonne ambiance," +
			"des associations actives (comme Mecatronix !). De plus, à la sortie de l'école, l'embauche est bonne, car les IG2Iens sont très prisés !</h3>";

var rotation = 0;//permet de faire défiler les news de façon à ce qu'à chaque rafraichissement, rotation s'incrémente pour sélectionner un nouvel échantillon de news
var nbNews = 4;//nombre de news affichées à l'écran
var maxNews = 20;//nombre de news reçues avec le flux rss

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
	
	setInterval(function(){ majNews(); }, 10000);//temps de rafraichissement panel news en millisecondes
}

function majNews() {
	if ((rotation+1)*nbNews < maxNews) {
		 $.ajax({
		   url : './assets/php/functions/data.php',
		   type : 'POST', // Le type de la requête HTTP, ici devenu POST
		   data: {action:"getRSS"}, 
		   complete : function(res, statut){
				res = res["responseText"];
				res = JSON.parse(res);
				res = res.flux.item;
				console.log(res);
				var content = '';
				for(var i = 0; i < nbNews-1; i++) {
					content+= '<div class="newsItem">' +
					'<h3>' + res[i+rotation*nbNews].title + '</h3>' +
					'<p>' + res[i+rotation*nbNews].description + '</p>' +
					'</div><hr/>';
				}
				content += '<div class="newsItem">' +
					'<h3>' + res[i+nbNews+rotation*nbNews].title + '</h3>' +
					'<p>' + res[i+nbNews+rotation*nbNews].description + '</p>' +
					'</div>';
				$("#newsFrame").fadeOut("slow").queue(function() {
					$("#newsFrame").html(content);
					$("#newsFrame").fadeIn("slow");
					if(rotation == 0) $("#newsTitle").fadeIn("slow");
				 $(this).dequeue();
			  });
				rotation++;
		   }
		});
	}
	else {
		$("#newsFrame, #newsTitle").fadeOut("slow").queue(function() {
					$("#newsFrame").html(igdeuzi);
					$("#newsFrame").fadeIn("slow");
					rotation = 0;
					$(this).dequeue();
		});
	}
	console.log("Rotation : " + rotation*nbNews);
}