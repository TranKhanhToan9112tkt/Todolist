const calendar = document.querySelector('.calendar');
const clssMonth = document.querySelector('.month');
const crrDate = document.querySelector('.current-date');
const weekDays = document.querySelector('.weekdays');
const days = document.querySelector('.days');
const next = document.querySelector('.next-btn');
const prev = document.querySelector('.prev-btn');
const todayBtn = document.querySelector('.today-btn');
const gotoBtn = document.querySelector('.goto-btn');
const dateInput = document.querySelector(".date-input");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const addEventClose = document.querySelector(".close");
const addEventBtn = document.querySelector(".add-event");
const addEventName = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");
const eventDay = document.querySelector('.event-day');
const eventDate = document.querySelector('.event-date');
const eventsList = document.querySelector('.events');
const eventAddBtn = document.querySelector('.add-event-btn');


// const eventsArr = [
//   {
//     day: 21,
//     month: 11,
//     year: 2023,
//     events: [
//       {
//         title: "Quét nhà ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Rửa bát",
//         time: "11:00 AM",
//       },
//     ],
//   },

//   {
//     day: 22,
//     month: 11,
//     year: 2023,
//     events: [
//       {
//         title: "Quét nhà ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Rửa bát",
//         time: "11:00 AM",
//       },
//     ],
//   },

// ];

let eventsArr = [];

getEvent()

const months = ["January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",];
let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
console.log(year);
console.log(month);
let activeDay;

function initCalendar(){
    const prevDay = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month, 1).getDate();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const lastDateOfDay = new Date(year,month+1,0).getDay();
    const firstDateOfDay = new Date(year,month,0).getDay();
    const firstDateNextOfDay = new Date(year, month+1, 1).getDay();


    console.log("year: " + year);
    console.log("month: " +month);
    console.log(prevDay);
    console.log(firstDay);
    console.log(lastDay);
    console.log("last date of day: " + lastDateOfDay);
    console.log("first date of day: " + firstDateOfDay);
    crrDate.innerText = months[month] + " " + year;


    //show prev dates
    if(firstDateOfDay !== 6){
        for(let i = (prevDay - firstDateOfDay); i <= prevDay; i++){
            let day = document.createElement('div');
            day.className = "day prev-date";
            day.innerHTML = i;
            days.appendChild(day);
        }
    }

    //show crr dates
    for(let i = firstDay; i <= lastDay; i ++)
    {
        let day = document.createElement('div')
        // kiểm tra xem hôm nay có sự kiện không
        let event = false;
        eventsArr.forEach((eventsObj)=>{
            if(eventsObj.day === i &&
                eventsObj.month === month + 1 &&
                eventsObj.year === year)
                {
                    event = true;
                }
        })

        // nếu là ngày hôm nay thêm class today
        if(i === new Date().getDate() && 
            year === new Date().getFullYear() &&
            month === new Date().getMonth())
            {
                getActiveDay(i)
                activeDay = i;
                console.log("active day: " + i)
                // nếu event = true thì thêm class event
                if(event){
                    day.className = "day today event active";
                }else{
                    day.className = "day today";
                }
                updateEvents(i)
            }else{
                if(event){
                    day.className = "day event"
                }else{
                    day.className = "day";
                }
            }
            day.innerHTML = i;
            days.appendChild(day);
    }
    //show next dates
    if(lastDateOfDay !== 0){
        for(let i = 1; i <= (7 - lastDateOfDay - 1); i++){
            let day = document.createElement('div')
            day.className = "day next-date";
            day.innerHTML = i;
            days.appendChild(day);
        }    
    }else if(lastDateOfDay === 0 && firstDateNextOfDay === 1){
        for(let i = 1; i <= (7 - lastDateOfDay - 1); i++){
            let day = document.createElement('div')
            day.className = "day next-date";
            day.innerHTML = i;
            days.appendChild(day);
        }    
    }
    handleDate();
}

initCalendar()

function prevMonth(){
    days.innerHTML ="";
    month--;
    if(month<0){
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth(){
    days.innerHTML ="";
    month++;
    if(month>11){
        month = 0;
        year++;
    }
    initCalendar();
}   

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

function goTodayBtn(){
    days.innerHTML ="";
    year = new Date().getFullYear();
    month = new Date().getMonth();
    console.log("today: " + "day: "+ "year: "+  year + " month: " + month)
    initCalendar();
}

todayBtn.addEventListener("click", goTodayBtn)

function formatDate(e){
    if(dateInput.value.length === 2){
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0,7);
    }
    if(e.inputType === "deleteContentBackward" && dateInput.value.length === 3){
        dateInput.value = dateInput.value.slice(0,2);
    }
}

dateInput.addEventListener("input", formatDate)

function handleGotoBtn(){
    days.innerHTML ="";
    const arrGoto = dateInput.value.split("/");
    month = arrGoto[0] -1;
    year = +arrGoto[1];
    console.log(typeof month)
    console.log(typeof year)
    if(typeof month === 'number' && typeof year === 'number'){
        initCalendar();
    }else {
        alert("cannot find date you want, try again!!");
        year = new Date().getFullYear();
        month = new Date().getMonth();
        initCalendar();
    }
}

gotoBtn.addEventListener("click", handleGotoBtn)


function handleAddEvent(){
    // console.log("active Open event")
    addEventWrapper.classList.toggle('activeOpen')
}
function handleRemoveAddEvent(){
    addEventWrapper.classList.remove('activeOpen')
}
function handleRemoveAddEventOutside(e){
    if(e.target !== addEventBtn && !addEventWrapper.contains(e.target)){
         addEventWrapper.classList.remove('activeOpen')
    }
}

addEventBtn.addEventListener("click", handleAddEvent)
addEventClose.addEventListener("click", handleRemoveAddEvent)
document.addEventListener("click", handleRemoveAddEventOutside)


function handleAddEventName(e){
    if(e.target.value >= 30)
        e.target.value = e.target.value.slice(0,30);
}

function handleAddEventFrom(e){
    if(e.target.value.length === 2){
        e.target.value += ":";
    }
    if(e.target.value.length > 5){
        e.target.value = e.target.value.slice(0,5);
    }
}

function handleAddEventTo(e){
    if(e.target.value.length === 2){
        e.target.value += ":";
    }
    if(e.target.value.length > 5){
        e.target.value = e.target.value.slice(0,5);
    }
}

addEventName.addEventListener("input", handleAddEventName)
addEventFrom.addEventListener("input", handleAddEventFrom)
addEventTo.addEventListener("input", handleAddEventTo)

function handleDate(){
    let daysArr = document.querySelectorAll('.day')
    // console.log(daysArr)
    daysArr.forEach((day)=>{
        day.addEventListener("click", (e)=>{
            console.log(e.target.classList)
            //remove today class
            daysArr.forEach((day)=>{
                day.classList.remove('active');
                day.classList.remove('today');
            })


            getActiveDay(e.target.innerHTML);
            updateEvents(e.target.innerHTML);
            activeDay = Number(e.target.innerHTML);
            console.log(e.target.innerHTML);

            //add class active
            day.classList.add("active")
            // handle click next-date in calender
            if(e.target.classList.contains('next-date')){
                nextMonth();
                console.log(e.target.classList.contains('next-date'))
                
                    const daysArr1 = document.querySelectorAll('.day')
                    daysArr1.forEach((day)=>{
                        day.classList.remove('active');
                        day.classList.remove('today');
                        if(!day.classList.contains('next-date') && 
                            day.innerHTML === e.target.innerHTML){
                                console.log("day innerHTML " + day.innerHTML + " : " + e.target.innerHTML)
                                day.classList.add('active')
                            }
                    })
            }
            // handle click prev-date in calender
            if(e.target.classList.contains('prev-date')){
                prevMonth();
                console.log(e.target.classList.contains('prev-date'))
                
                    const daysArr1 = document.querySelectorAll('.day')
                    daysArr1.forEach((day)=>{
                        day.classList.remove('active');
                        day.classList.remove('today');
                        if(!day.classList.contains('prev-date') && 
                            day.innerHTML === e.target.innerHTML){
                                console.log("day innerHTML " + day.innerHTML + " : " + e.target.innerHTML)
                                day.classList.add('active')
                            }
                    })
            }
            //
            console.log("e.target: " + e.target.classList)
        })
    })
}


// hiển thị ngày được chọn vào active day
function getActiveDay(day){
    console.log(day)
    const getDate = new Date(year,month,day)
    console.log(getDate.toString().split(" ")[0])
    const dateName = getDate.toString().split(" ")[0]
    const getMonthActive = months[month]
    const getYearActive = year
    const dateFull = day + " " + getMonthActive + " " + getYearActive;
    eventDay.innerHTML = dateName;
    eventDate.innerHTML = dateFull;
}

//hiển thị các event của ngày đó
function updateEvents(day){
    let events = "";
    eventsArr.forEach((eventt)=>{
        if(day == eventt.day &&
            month + 1 == eventt.month &&
            year == eventt.year)
            {
                eventt.events.forEach((ev)=>{
                    events += `<div class="event">
                                <div class="title">
                                <i class="fas fa-circle"></i>
                                <h3 class="event-title">${ev.title}</h3>
                                </div>
                                <div class="event-timee">
                                <span class="event-time">${ev.time}</span>
                                </div>
                            </div>`;
                })
            }
    })
    eventsList.innerHTML = events;
    storeEvent()
}

//submit event
function handleAddBtn(){
    const getEventName = addEventName.value;
    const getEventFrom = addEventFrom.value;
    const getEventTo = addEventTo.value;

    const arrEventFrom = getEventFrom.split(":")
    const arrEventTo = getEventTo.split(":")

    const changeTime = arrEventFrom[0] > 12 ? "PM" : "AM"
    const changeTime1 = arrEventTo[0] > 12 ? "PM" : "AM"

    const convertFrom = arrEventFrom[0] >= 12 ? (arrEventFrom[0] % 12) : arrEventFrom[0]
    const convertTo = arrEventTo[0] >= 12 ? (arrEventTo[0] % 12) : arrEventTo[0]

    const addEventTime = `${convertFrom}:${arrEventFrom[1]} ${changeTime} - ${convertTo}:${arrEventTo[1]} ${changeTime1}`
    
    let checkAddEvent = false;

    if(arrEventFrom[0] <= 24 && arrEventFrom[1] <= 59 &&
        arrEventTo[0] <= 24 && arrEventTo[1] <= 59 ){
            if(eventsArr.length > 0){
                eventsArr.forEach((item)=>{
                    if(item.day === activeDay &&
                        item.month === month + 1 &&
                        item.year === year){
                            item.events.push({title:getEventName, time:addEventTime})
                            checkAddEvent = true;
                        }
                    })
                }
            if(!checkAddEvent){
                eventsArr.push({
                    day: activeDay,
                    month: month+1,
                    year: year,
                    events: [{title:getEventName, time:addEventTime}]
                })
            }
            console.log(activeDay)
            console.log(eventsArr);
            addEventWrapper.classList.remove('activeOpen')
        }else{
            alert("Ban nhap chua dung dinh dang,vui long nhap lai!!");
        }
    // reset lại input
        addEventName.value = "";
        addEventFrom.value = "";
        addEventTo.value = "";
        
        const addEventNow = document.querySelector('.day.active');
        if(!addEventNow.classList.contains("event")){
            addEventNow.classList.add("event")
        }
        updateEvents(activeDay);
        
}

eventAddBtn.addEventListener("click", handleAddBtn)

function handleRemoveEvent(e){
    if(e.target.classList.contains("event")){
        const titleEvent = e.target.children[0].children[1].innerHTML;
        eventsArr.forEach((event)=>{
            if(event.day === activeDay &&
                event.month === month +1 &&
                event.year === year){
                    event.events.forEach((e,index)=>{
                        if(e.title === titleEvent){
                            event.events.splice(index,1);
                        }
                    })
                    if(event.events.length === 0){
                        eventsArr.splice(eventsArr.indexOf(event,1))
                        const addEventNow = document.querySelector('.day.active');
                        if(addEventNow.classList.contains("event")){
                            addEventNow.classList.remove("event")
                        }
                    }
                }
            })
        }
        updateEvents(activeDay)
}
eventsList.addEventListener("click", handleRemoveEvent)

//store các event lại
function storeEvent(){
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvent(){
    eventsArr.push(...JSON.parse(localStorage.getItem("events")))
}

console.log(eventsArr);