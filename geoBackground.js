function exportPositionImage(position) {
	$.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true',
	         success: function(data){
	             userCity = data.results[0].address_components[2].long_name;
					 userRegion = data.results[0].address_components[4].long_name;
	         }
	});
	
	function getImage(userCity,userRegion) {
		$.ajax ({
			type: 'GET',
			crossDomain: true,
 				dataType: 'jsonp',
			url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&restrict=cc_attribute&imgtype=photo&safe=active&imgsz=xxlarge&q='+userCity+'+'+userRegion
		}).done(function(response) {var googleBackground=(response.responseData.results[0].url);$('body').css('background-image','url('+googleBackground+')');$('body').css('background-size','cover');});
	}
	
	getImage();
}

function errorPosition() {
 				alert('The page could not get your location.');
}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(exportPositionImage, errorPosition);
} else {
    alert('Your browser does not support geolocation.');
}