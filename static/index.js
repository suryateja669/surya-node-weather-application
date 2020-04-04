const forecastForm=document.querySelector('form');
const forecastInput=document.querySelector('input');
const para1=document.querySelector('#para1');
const para2=document.querySelector('#para2');

forecastForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address=forecastInput.value;
    para1.textContent="Loading...!"
    para2.textContent="";
    fetch('/weather?address='+encodeURIComponent(address)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log("Error: ",data.error)
                para1.textContent=data.error;
            }
            else{
                //console.log(data);
                para1.textContent=data.forecast;
                para2.textContent=data.location;
            }
            
        })
            
        })
})