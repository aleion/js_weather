window.addEventListener('load', () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position.coords);
            
        })
    }
});

   
