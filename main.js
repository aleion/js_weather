window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureSummary = document.querySelector('.temperature-summary');
    let temperatureTemp = document.querySelector('.degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let date = new Date();
                        
    
    let hours = date.getHours();
    let minutes = date.getMinutes();

    
    //Day and Hour
    
    document.querySelector('.location-time').innerHTML = hours + ':' + minutes;
    
    //icons
    

    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/[API_KEY]/${lat},${long}`;        
            const geo = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`;
            
            let api_two;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    
                    if(data.timezone.includes('America')){
                        let days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
                        let dayName = days[date.getDay()];
                        document.querySelector('.location-day').innerHTML = dayName.toUpperCase();


                        const api_two = `${proxy}https://api.darksky.net/forecast/[API_KEY]/${lat},${long}?lang=es`;
                        
                        fetch(api_two)
                            .then(response => {
                            return response.json();
                            })
        
                            .then(data =>{
                                const {temperature, summary, icon} = data.currently;
                                const farenhToCels = (5 / 9) * (temperature - 32);
                                const celsFixed = farenhToCels.toFixed(1);
                                console.log(data.timezone);
                    
                                temperatureTemp.textContent = celsFixed;
                                temperatureSummary.textContent = summary.toUpperCase();
                   
                                console.log(data);
                                setIcons(icon, document.querySelector('.icon'));
                            });
                            
                    }else{ 
                        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        let dayName = days[date.getDay()];
                        document.querySelector('.location-day').innerHTML = dayName.toUpperCase();    

                        const api_two = `${proxy}https://api.darksky.net/forecast/[API_KEY]/${lat},${long}`;
                        fetch(api_two)
                        .then(response => {
                        return response.json();
                        })
    
                        .then(data =>{
                            const {temperature, summary, icon} = data.currently;
                            const farenhToCels = (5 / 9) * (temperature - 32);
                            const celsFixed = farenhToCels.toFixed(1);
                            console.log(data);
                
                            temperatureTemp.textContent = celsFixed;
                            temperatureSummary.textContent = summary.toUpperCase();
               
               
                            console.log(data);
               

                            setIcons(icon, document.querySelector('.icon'));
                        });
                    }
                })
            
            fetch(geo)
                .then(responseG =>{
                    return responseG.json();
                })
                .then(dataGeo =>{
                    let city = dataGeo.address.city;
                    locationTimeZone.textContent = city.toUpperCase();
                    console.log(city);
                    
                    
                })
        });    
    };

    function setIcons(icon, iconID){ 

        let hola = '<h1>caca</h1>';
        
        switch(icon){
            case 'clear-day':
                    iconID.innerHTML = '<img src="icons/clear-day.png">';
                break;
            case 'clear-night':
                    iconID.innerHTML = '<img src="icons/clear-night.png">';
                break;
            case 'cloudy':
                    iconID.innerHTML = '<img src="icons/cloudy.png">';
                break;
            case 'fog':
                    iconID.innerHTML = '<img src="icons/fog.png">';
                break;
            case 'partly-cloudy-day':
                    iconID.innerHTML = '<img src="icons/partly-cloudy-day.png">'; 
                break;
            case 'partly-cloudy-night':
                iconID.innerHTML = '<img src="icons/partly-cloudy-night.png">';
                break;
            case 'rain':
                    iconID.innerHTML = '<img src="icons/rain.png">';
                break;
            case 'sleet':
                    iconID.innerHTML = '<img src="icons/sleet.png">';
                break;
            case 'snow':
                    iconID.innerHTML = '<img src="icons/snow.png">';
                break;
            case 'wind':
                    iconID.innerHTML = '<img src="icons/wind.png">';
                break;
            default:
                //png                              
        };
    };
    
    

   


});


