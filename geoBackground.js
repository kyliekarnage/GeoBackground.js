function errorPosition() {
 				//alert('The page could not get your location.');
 				defaultCity = 'Los Angeles';
				defaultRegion = 'California';
				function getDefaultImage() {
							$.ajax ({
								type: 'GET',
								crossDomain: true,
									dataType: 'jsonp',
								url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgtype=photo&safe=active&imgsz=xxlarge&q='+defaultCity+'+'+defaultRegion
							}).done(function(response) {var googleBackground=(response.responseData.results[0].url);$('body').css('background-image','url('+googleBackground+')');$('body').css('background-size','cover');});
				}
				getDefaultImage();
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude;
  var lon = crd.longitude;
  
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
			}).done(function(response) {var googleBackground=(response.responseData.results[0].url);$('body').css('background-image','url('+googleBackground+')');$('body').css('background-size','cover');});
  }
  
  getMapResults();
};

navigator.geolocation.getCurrentPosition(success, errorPosition, options);
