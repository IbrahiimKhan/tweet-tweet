const form = document.querySelector("form")
const input_form = document.querySelector(".input_form")
const submit_buttton = document.querySelector(".submit_buttton")
const search_field = document.querySelector(".search_field")
const ulElm = document.querySelector(".ulElm")
const liElm = document.querySelector(".liElm")
const starts = document.querySelector(".starts")
const ends = document.querySelector(".ends")
const message = document.querySelector(".showMsg")


//get date time
const tweets =localStorage.getItem("tweetsList")?
JSON.parse(localStorage.getItem("tweetsList")):[]
const getTime  = ()=>{
    let dateArray = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
   let time =  dateFns.format(new Date(),"hh:mma")
   let day = dateArray[dateFns.getDay(new Date())]
   timeDate = `${time} ${day}`
   return timeDate
}
// getting userInput data 
const inputData =()=>{
    return input_form.value
}
// getting tweet length
const tweetLength =(e)=>{
    input_form.value.length>250?starts.classList.add("text-danger"):starts.classList.add("text-success")
    if (input_form.value.length>250) {
        showMsg("character exceed th limit","text-danger")
    }
    const lengthOfTweet=  starts.textContent = input_form.value.length
    return lengthOfTweet
 }

//show hide error messages
 const removeMsg = ()=>{
    message.textContent = ""
 }
const showMsg = (msg,action = "text-primary")=>{
    message.textContent = msg
    message.classList.add(action)
    setTimeout(() => {
        removeMsg()
    }, 2000);
}

// tweets array pushing to ui
const tweetArrtoUiList=(tweets)=>{
    ulElm.textContent= ""
    tweets.map(e=>{
        //console.log(e.name)
        ulElm.insertAdjacentHTML("afterbegin",e.name)
     showMsg("Tweet made successfully","text-success")
     setTimeout(() => {
        document.location.reload()
    }, 2000);
     
    })
    return tweets
    
}
const showTweetsFromStorage=(tweets)=>{
    ulElm.textContent= ""
    tweets.map(e=>{
        //console.log(e.name)
        ulElm.insertAdjacentHTML("afterbegin",e.name)
     //showMsg("Tweet made successfully","text-success")
    })
    
}
// inserting tweet to ul
const insertTweetToList=(tweet,dateTime)=>{
    const tweetLengthVal = tweetLength()
    let tweetObj = {
        id:tweets.length+1,
    }
    const li = `
    <div class = "d-flex list_container">
    <li class="list-group-item liElm">${tweet} <strong class="dateandTime">${dateTime}</strong> </li>
    <a id="${tweetObj.id}" class="delete btn" >delete</a>
    </div>`
     tweetObj.name = li
     //console.log(tweetObj)
    if (tweetLengthVal<=250 && tweetLengthVal>0) {
        tweets.push(tweetObj)
        localStorage.setItem("tweetsList",JSON.stringify(tweets))
        return tweets
    }
    else if(tweetLengthVal===0){
        showMsg("Please write something to tweet","text-warning")
    }
    else{
       showMsg("you can't write more than 250 characters","text-warning")
        return
    } 
   
}

const checkLength =()=>{
    input_form.addEventListener("keyup",(e)=>{
      tweetLength()
      //fetch tweet length

      
    })
}
checkLength()
//checking tweet length
//listening user input by submitting it
//deleting an item
const getUserInputVal = ()=>{
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        const tweet = inputData()
        //date
        const dateTime = getTime()
        //console.log(tweet)
        // inserting tweet to ul
      const tweets =   insertTweetToList(tweet,dateTime)
      tweetArrtoUiList(tweets)
       
    })
}
getUserInputVal()


document.addEventListener("DOMContentLoaded",()=>{
    showTweetsFromStorage(tweets)
    //delete an item from storage and uit
   if (tweets.length>0) {
    ulElm.addEventListener("click",(e)=>{
        if (e.target.classList.contains("delete")) {
            const listId = Number(e.target.id)
            //console.log(e.target.parentElement)
            //console.log(listId)
            const restVal = tweets.filter(tweet=>{
                
               return (tweet.id!==listId)
             })
             localStorage.removeItem("tweetsList")
             setTimeout(() => {
                document.location.reload()
            }, 2000);
             localStorage.setItem("tweetsList",JSON.stringify(restVal))
             
              e.target.parentElement.remove()
                showMsg("Tweet delete successfully","text-danger")   
        }
    })
   }

})

//remove

//sarching tweets
search_field.addEventListener("keyup",(e)=>{
    const search = e.target.value.toLowerCase()
    
   let filterItem = tweets.filter(tweet=>{
     return  tweet.name.toLowerCase().includes(search)
    })
    showTweetsFromStorage(filterItem)
     showMsg("Product found successfully","text-success")
    
    
})
