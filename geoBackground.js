function getGeoBackground(){

	var defaultCity = 'Los Angeles';
	var defaultRegion = 'California';
	var randNum = Math.floor(Math.random()*4);
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function errorPosition() {
 		
 		console.log('The page could not get your location.');
 						
		function getDefaultImage() {
		
			$.ajax ({
				type: 'GET',
				crossDomain: true,
				dataType: 'jsonp',
				url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgtype=photo&safe=active&imgsz=xxlarge&q='+defaultCity+'+'+defaultRegion
			}).done(
				function(response) {
					var googleBackground = (response.responseData.results[randNum].url);
					$('body').css('background-image','url('+googleBackground+')');
					$('body').css('background-size','cover');
				});
		}
		
		getDefaultImage();
	}

	function success(pos) {

		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
		var userCity;
		var userRegion;
  
		function getMapResults() {
			$.ajax ({
				type: 'GET',
				url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=true',
				success: function(data){
						userCity = data.results[0].address_components[2].long_name;
						userRegion = data.results[0].address_components[4].long_name;
						getImage();
				}
			})
		}
		
		function getImage() {
			$.ajax ({
				type: 'GET',
				crossDomain: true,
				dataType: 'jsonp',
				url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgtype=photo&safe=active&imgsz=xxlarge&q='+userCity+'+'+userRegion
			}).done(
				function(response) {
					var googleBackground = (response.responseData.results[randNum].url);
					$('body').css('background-image','url('+googleBackground+')');
					$('body').css('background-size','cover');
				});
  		}
  
  		getMapResults();
	};

	navigator.geolocation.getCurrentPosition(success, errorPosition, options);
}
