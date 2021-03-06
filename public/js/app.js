console.log("connected")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    fetch('/weather?search=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
               messageOne.textContent='Unable to find location.Please try for another location'
            }
            else{
               messageOne.textContent=data.location
               messageTwo.textContent=data.foreCastData + "°C"
            }
    
        })
    })


    console.log('testing')
}) 