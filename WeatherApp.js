const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', function () {
	
	const searchinput = document.getElementById('search-input');
	fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchinput.value}`)
			.then((res)=>res.json())
			.then((searchResponse)=>{
				const container = document.getElementById('container');
				container.innerHTML = '';
				
				const location = searchResponse.results[0];
				const lat = location.latitude;
				const lng = location.longitude;

				fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,rain,visibility`)
					.then((res)=>res.json())
					.then((responseBody)=>{
						const hourly = responseBody.hourly;

						
						for (let i = 0; i < hourly.time.length; i++) {
							const date = new Date(hourly.time[i]);
							container.innerHTML += `
							<div class="card">
								<div class="card-header">
									<span>${date.toLocaleTimeString('en-GB')}  ${date.toLocaleDateString('en-GB')}</span>
								</div>
								<div class="card-body">
									<h3>${hourly.temperature_2m[i]} ${responseBody.hourly_units.temperature_2m}</h3>
									<div class="d-flex">
									<span>Rain: ${hourly.rain[i]} ${responseBody.hourly_units.rain}</span> &nbsp; <span>Visibility: ${hourly.visibility[i]} ${responseBody.hourly_units.visibility}</span>	
									</div>
								</div>
							</div>`;
							
						}
					});
			});

});

