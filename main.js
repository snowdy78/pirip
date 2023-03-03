
let right_menu = document.getElementById('right-menu');
let left_menu = document.getElementById('left-menu');
let content = document.getElementById('content');

names_of_periods = [
    "1730-1800", "1800-1900", "1900-2000", "2000-сейчас"
];

for (let i = 0; i < names_of_periods.length; i++) 
{
    let elem = document.createElement("div");
    elem.className = "periods";
    elem.textContent = names_of_periods[i]; 
    left_menu.appendChild(elem);
}

let periods = document.getElementsByClassName('periods');

names_of_events = [
    "Основание Барнаула", "Плавильный завод", "Горное училище",
    "АГК Музей", 
    "Открытие народного дома",
    "Основание АлтГУ"
];

period_to_event = {};
period_to_event[names_of_periods[0]] = [names_of_events[0], names_of_events[1], names_of_events[2]];
period_to_event[names_of_periods[1]] = [names_of_events[3]];
period_to_event[names_of_periods[2]] = [names_of_events[4]];
period_to_event[names_of_periods[3]] = [names_of_events[5]];
console.log(period_to_event);


function resetEventsView(excepting_event)
{
    let events = document.getElementsByClassName('events');
    for (let i = 0; i < events.length; i++)
    {
        let event = events[i];
        if (event != excepting_event)
        {
            event.style.backgroundColor = '';
            event.style.color = '';
        }
    }  
    content.style.backgroundImage = '';
}

function resetPeriodsView(excepting_period) 
{
    for (let i = 0; i < periods.length; i++)
    {
        let period = periods[i];
        if (period != excepting_period)
        {
            period.style.background = '';
        }
    }  
    content.style.backgroundImage = ''; 
}

function onEventClick(event)
{  
    resetEventsView(event);
    let bgcolor = "rgb(132, 179, 250)"
    let color = "white";
    if (event.style.backgroundColor == '' && event.style.color == '') 
    {
        event.style.backgroundColor = bgcolor;
        event.style.color = color;
        content.style.backgroundImage = "none"; 
    }
    else 
    {
        event.style.backgroundColor = '';
        event.style.color = '';
    }
}

function onPeriodClick(period)
{
    resetPeriodsView(period);
    let bg = "linear-gradient(0deg, grey 0px, #D6F8FF 2px)"
    let events = right_menu.getElementsByClassName('events');
    if (events != null)
    {
        while(events.length != 0) 
        {
            events[0].remove();
        }
    }
    if (period.style.backgroundColor == '') // on period choosing
    {
        period.style.background = bg;
        
        for (let i = 0; i < period_to_event[period.textContent].length; i++)
        {
            let event = document.createElement('div');
            event.className = "events";
            event.textContent = period_to_event[period.textContent][i];
            event.addEventListener('click', () => { onEventClick(event)});
            right_menu.appendChild(event);
        }
    }
    else // on cancel choosing
    {
        period.style.background = '';
    }
}

for (let i = 0; i < periods.length; i++)
{
    let period = periods[i];
    period.addEventListener('click', () => { onPeriodClick(period); });
}