$(document).ready(function() {
    const input = $('#input');
    const image = $('#img');
    const temp = $('#temperature');
    const humidity = $('#humidity');
    const condition = $('#condition');
    const weatherData = $('#weather-data');
    const errorMessage = $('#error-message');
    const city = $('#city');

  
    function fetchData() {
      const inputValue = input.val().trim();
      if (inputValue === '') {
        errorMessage.text('Please enter a city');
        errorMessage.show();
        weatherData.hide();
        return;
      }
  
      $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?key=a35819a538db4049b47161716232606&q=${inputValue}&aqi=yes`,
        method: 'GET',
        success: function(data) {
          const cityValue = data.location.name;
          const temperatureValue = data.current.temp_c;
          const humidityValue = data.current.humidity;
          const conditionValue = data.current.condition.text;
  
          city.text(cityValue);
          temp.text(`${temperatureValue}°C`);
          humidity.text(`${humidityValue}%`);
          condition.text(conditionValue);
  
          weatherData.show('100');
          errorMessage.hide();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          errorMessage.text('Error:Enter Valid City Name');
          errorMessage.show();
          weatherData.hide();
        }
      });
    }
  
    image.on('click', fetchData);
    input.on('keydown', function(event) {
      if (event.key === 'Enter') {
        fetchData();
      }
    });
  });
