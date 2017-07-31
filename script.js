var container = document.getElementById("animals");
var btn = document.getElementById("btn");
var lat = "";
var long = "";
var url = "";
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=';           
      //console.log(lat);
//      console.log(long);
//      console.log(url);
    
      
  });
} else {
    console.log('error');
}


btn.addEventListener("click", function () {
    var newRequest = new XMLHttpRequest(); //defines request
    newRequest.open('GET', url);
    newRequest.onload = function () {
        //console.log(newRequest.responseText);  
        var myData = JSON.parse(newRequest.responseText);
       // console.log(myData.weather[0].description);
        renderHTML(myData);
    };
    newRequest.send(); //sends request
});

function renderHTML(data) {
    var temp = data.main.temp;
    var fahrenheit = Math.round(temp*(9/5)-459.67);
    var celsius = Math.round(temp-273.15);
    var html = "The weather in "+data.name+" is "+data.weather[0].description + "<br> The temperature is " + fahrenheit;
    container.insertAdjacentHTML('beforeend', html);
    
    console.log(temp);
    console.log(fahrenheit);
    console.log(celsius);
}

