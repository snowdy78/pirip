
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

content_main_page_elements = [
    "Основание Барнаула", 
    "Плавильный завод", 
    "Горное училище", 
    "АГК Музей",
    "Открытие народного дома"
];

function generate_content_main_page()
{
    let elems = content.getElementsByClassName('text-block');
    while(elems.length != 0)
    {
        elems[0].remove();
    }
    let elems2 = content.getElementsByClassName('main-page');
    while (elems2.length != 0)
    {
        elems2[0].remove();
    }
    let main_page = document.createElement('div');
    main_page.className = 'main-page';
    let element_table = document.createElement('div');
    element_table.className = 'element-table';
    let elements1 = document.createElement('div');
    elements1.className = 'elements';

    for (let i = 0; i < Math.ceil(content_main_page_elements.length/2.); i++)
    {
        let element = document.createElement('div');
        element.className = 'element';
        element.textContent = content_main_page_elements[i];
        elements1.appendChild(element);
    }
    let elements2 = document.createElement('div');
    for (let i = Math.ceil(content_main_page_elements.length/2.); i < content_main_page_elements.length; i++)
    {
        let element = document.createElement('div');
        element.className = 'element';
        element.textContent = content_main_page_elements[i];
        elements2.appendChild(element);
    }
    elements2.className = 'elements';
    
    element_table.appendChild(elements1);
    element_table.appendChild(elements2);
    main_page.appendChild(element_table);
    content.appendChild(main_page);
}

// generates on start

generate_content_main_page();

////////

function generate_content_text_page()
{
    let elems = content.getElementsByClassName('text-block');
    while(elems.length != 0)
    {
        elems[0].remove();
    }
    let elems2 = content.getElementsByClassName('main-page');
    while (elems2.length != 0)
    {
        elems2[0].remove();
    }
    let text_block = document.createElement('div');
    text_block.className = 'text-block';
    let text = document.createElement('div');
    text.className = 'text';
    text_block.appendChild(text);
    content.appendChild(text_block);
}


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
    generate_content_main_page();
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
    generate_content_main_page();
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
        generate_content_text_page();
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