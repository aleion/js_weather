window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureSummary = document.querySelector('.temperature-summary');
    let temperatureTemp = document.querySelector('.degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let date = new Date;
    let day = date.getDay;
    let displayDay = document.querySelector('.location-day');

    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/35fd525710b35a3b7c405b9103379707/${lat},${long}?lang=es`;        

            fetch(api)
                .then(response => {
                    return response.json();
                })
        
                .then(data =>{
                   const {temperature, summary, icon} = data.currently;
                   const farenhToCels = (5 / 9) * (temperature - 32);
                   const celsFixed = farenhToCels.toFixed(1);

                   temperatureTemp.textContent = celsFixed;
                   temperatureSummary.textContent = summary;
                   locationTimeZone.textContent = data.timezone;
                   
                   
                   setIcons(icon, document.querySelector('.icon'));
            });
        });    
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "black"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    } 
});