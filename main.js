window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureSummary = document.querySelector('.temperature-summary');
    let temperatureTemp = document.querySelector('.degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let date = new Date;
    let day = date.getDay;
    let displayDay = document.querySelector('.location-day');
   
    //icons
    

    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/35fd525710b35a3b7c405b9103379707/${lat},${long}`;        
            const geo = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}`;
            
            let api_two;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    
                    if(data.timezone.includes('America')){
                        const api_two = `${proxy}https://api.darksky.net/forecast/35fd525710b35a3b7c405b9103379707/${lat},${long}?lang=es`;
                        
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
                                temperatureSummary.textContent = summary;
                   
                   
                                console.log(data);
                   

                                setIcons(icon, document.querySelector('.icon'));
                            });
                    }else{ 
                        const api_two = `${proxy}https://api.darksky.net/forecast/35fd525710b35a3b7c405b9103379707/${lat},${long}`;
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
                            temperatureSummary.textContent = summary;
               
               
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
                    locationTimeZone.textContent = dataGeo.address.city;
                })
            
            
        });    
    };

    function setIcons(icon, iconID){ 
       let sunyIcon = '<svg width="180px" height="180px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 492"><defs></defs><style>.cls-1{fill:#ff9c47;}.cls-2{fill:#ffcc47;}</style></defs><title>sun</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><circle class="cls-1" cx="238.5" cy="253.5" r="238.5"/><circle class="cls-2" cx="238.5" cy="238.5" r="238.5"/></g></g></svg>';
        console.log(icon);

        let rainIcon = `<svg width="180px" height="180px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 407.5"><defs><style>.cls-1{fill:#d6b4f4;}.cls-2{fill:#d6e5f4;}</style></defs><title>snow_icon</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M372.56,76.12a152.73,152.73,0,0,0-271.42,50.14c-1.69-.09-3.39-.14-5.1-.14A96,96,0,0,0,96,318.2H355.35A121.65,121.65,0,0,0,372.56,76.12Z"/><path class="cls-2" d="M372.56,63.32a152.73,152.73,0,0,0-271.42,50.14c-1.69-.09-3.39-.13-5.1-.13a96,96,0,0,0,0,192.08H355.35A121.66,121.66,0,0,0,372.56,63.32Z"/><path class="cls-1" d="M100.72,402.08v-63.7a2.42,2.42,0,1,0-4.84,0v63.7a2.42,2.42,0,0,0,4.84,0Z"/><path class="cls-1" d="M108.56,342.36a2.41,2.41,0,0,0-3.42,0L98.3,349.2l-6.84-6.84A2.41,2.41,0,0,0,88,345.77l8.46,8.46a2.66,2.66,0,0,0,3.6,0l8.46-8.46A2.41,2.41,0,0,0,108.56,342.36Z"/><path class="cls-1" d="M88,398.1a2.43,2.43,0,0,0,3.42,0l6.84-6.84,6.84,6.84a2.42,2.42,0,0,0,3.42-3.42l-8.46-8.45a2.64,2.64,0,0,0-3.6,0L88,394.68A2.43,2.43,0,0,0,88,398.1Z"/><path class="cls-1" d="M127.09,384.06,71.93,352.21a2.42,2.42,0,0,0-2.42,4.19l55.17,31.85a2.42,2.42,0,1,0,2.41-4.19Z"/><path class="cls-1" d="M79.29,347.41a2.42,2.42,0,0,0-1.71,3l2.51,9.34-9.35,2.51A2.42,2.42,0,0,0,72,366.89l11.56-3.1a2.66,2.66,0,0,0,1.8-3.12l-3.1-11.55A2.41,2.41,0,0,0,79.29,347.41Z"/><path class="cls-1" d="M117.31,393.05a2.42,2.42,0,0,0,1.71-3l-2.51-9.35,9.35-2.5a2.42,2.42,0,0,0-1.25-4.67l-11.55,3.1a2.68,2.68,0,0,0-1.81,3.12l3.1,11.55A2.42,2.42,0,0,0,117.31,393.05Z"/><path class="cls-1" d="M124.68,352.21,69.51,384.06a2.42,2.42,0,0,0,2.42,4.19l55.16-31.85a2.42,2.42,0,1,0-2.41-4.19Z"/><path class="cls-1" d="M69,375.28a2.42,2.42,0,0,0,1.71,3l9.35,2.5-2.51,9.35a2.42,2.42,0,0,0,4.67,1.25l3.1-11.55a2.66,2.66,0,0,0-1.8-3.12L72,373.57A2.43,2.43,0,0,0,69,375.28Z"/><path class="cls-1" d="M127.57,365.18a2.42,2.42,0,0,0-1.71-3l-9.35-2.51,2.51-9.34a2.42,2.42,0,1,0-4.67-1.25l-3.1,11.55a2.68,2.68,0,0,0,1.81,3.12l11.55,3.1A2.42,2.42,0,0,0,127.57,365.18Z"/><path class="cls-1" d="M256.72,402.08v-63.7a2.42,2.42,0,1,0-4.84,0v63.7a2.42,2.42,0,0,0,4.84,0Z"/><path class="cls-1" d="M264.56,342.36a2.41,2.41,0,0,0-3.42,0l-6.84,6.84-6.84-6.84a2.41,2.41,0,0,0-3.42,3.41l8.46,8.46a2.66,2.66,0,0,0,3.6,0l8.46-8.46A2.41,2.41,0,0,0,264.56,342.36Z"/><path class="cls-1" d="M244,398.1a2.43,2.43,0,0,0,3.42,0l6.84-6.84,6.84,6.84a2.42,2.42,0,0,0,3.42-3.42l-8.46-8.45a2.64,2.64,0,0,0-3.6,0L244,394.68A2.43,2.43,0,0,0,244,398.1Z"/><path class="cls-1" d="M283.09,384.06l-55.16-31.85a2.42,2.42,0,0,0-2.42,4.19l55.17,31.85a2.42,2.42,0,0,0,2.41-4.19Z"/><path class="cls-1" d="M235.29,347.41a2.42,2.42,0,0,0-1.71,3l2.51,9.34-9.35,2.51a2.42,2.42,0,1,0,1.25,4.67l11.56-3.1a2.66,2.66,0,0,0,1.8-3.12l-3.1-11.55A2.41,2.41,0,0,0,235.29,347.41Z"/><path class="cls-1" d="M273.31,393.05a2.42,2.42,0,0,0,1.71-3l-2.51-9.35,9.35-2.5a2.42,2.42,0,0,0-1.25-4.67l-11.55,3.1a2.68,2.68,0,0,0-1.81,3.12l3.1,11.55A2.42,2.42,0,0,0,273.31,393.05Z"/><path class="cls-1" d="M280.68,352.21l-55.17,31.85a2.42,2.42,0,0,0,2.42,4.19l55.16-31.85a2.42,2.42,0,0,0-2.41-4.19Z"/><path class="cls-1" d="M225,375.28a2.42,2.42,0,0,0,1.71,3l9.35,2.5-2.51,9.35a2.42,2.42,0,0,0,4.67,1.25l3.1-11.55a2.66,2.66,0,0,0-1.8-3.12L228,373.57A2.43,2.43,0,0,0,225,375.28Z"/><path class="cls-1" d="M283.57,365.18a2.42,2.42,0,0,0-1.71-3l-9.35-2.51,2.51-9.34a2.42,2.42,0,1,0-4.67-1.25l-3.1,11.55a2.68,2.68,0,0,0,1.81,3.12l11.55,3.1A2.42,2.42,0,0,0,283.57,365.18Z"/><path class="cls-1" d="M389.72,405.08v-63.7a2.42,2.42,0,1,0-4.84,0v63.7a2.42,2.42,0,0,0,4.84,0Z"/><path class="cls-1" d="M397.56,345.36a2.41,2.41,0,0,0-3.42,0l-6.84,6.84-6.84-6.84a2.41,2.41,0,1,0-3.42,3.41l8.46,8.46a2.66,2.66,0,0,0,3.6,0l8.46-8.46A2.41,2.41,0,0,0,397.56,345.36Z"/><path class="cls-1" d="M377,401.1a2.43,2.43,0,0,0,3.42,0l6.84-6.84,6.84,6.84a2.42,2.42,0,0,0,3.42-3.42l-8.46-8.45a2.64,2.64,0,0,0-3.6,0L377,397.68A2.43,2.43,0,0,0,377,401.1Z"/><path class="cls-1" d="M416.09,387.06l-55.16-31.85a2.42,2.42,0,0,0-2.42,4.19l55.17,31.85a2.42,2.42,0,0,0,2.41-4.19Z"/><path class="cls-1" d="M368.29,350.41a2.42,2.42,0,0,0-1.71,3l2.51,9.34-9.35,2.51a2.42,2.42,0,0,0,1.25,4.67l11.56-3.1a2.66,2.66,0,0,0,1.8-3.12l-3.1-11.55A2.41,2.41,0,0,0,368.29,350.41Z"/><path class="cls-1" d="M406.31,396.05a2.42,2.42,0,0,0,1.71-3l-2.51-9.35,9.35-2.5a2.42,2.42,0,0,0-1.25-4.67l-11.55,3.1a2.68,2.68,0,0,0-1.81,3.12l3.1,11.55A2.42,2.42,0,0,0,406.31,396.05Z"/><path class="cls-1" d="M413.68,355.21l-55.17,31.85a2.42,2.42,0,0,0,2.42,4.19l55.16-31.85a2.42,2.42,0,0,0-2.41-4.19Z"/><path class="cls-1" d="M358,378.28a2.42,2.42,0,0,0,1.71,3l9.35,2.5-2.51,9.35a2.42,2.42,0,1,0,4.67,1.25l3.1-11.55a2.66,2.66,0,0,0-1.8-3.12L361,376.57A2.43,2.43,0,0,0,358,378.28Z"/><path class="cls-1" d="M416.57,368.18a2.42,2.42,0,0,0-1.71-3l-9.35-2.51,2.51-9.34a2.42,2.42,0,1,0-4.67-1.25l-3.1,11.55a2.68,2.68,0,0,0,1.81,3.12l11.55,3.1A2.42,2.42,0,0,0,416.57,368.18Z"/></g></g></svg>`;
        

        switch(icon){
            case 'partly-cloudy-day':
                iconID.innerHTML = sunyIcon;
                break;
            case 'cloudy' :
                    iconID.innerHTML = rainIcon;
                break;
                    
                
        };
    };
    
    

   


});


