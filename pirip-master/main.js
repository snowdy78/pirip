
let right_menu = document.getElementById('right-menu');
let left_menu = document.getElementById('left-menu');
let content = document.getElementById('content');

var names_of_periods = [
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

var page_names = [
    "Основание Барнаула", 
    "Плавильный завод", 
    "Горное училище",
    "АГК Музей", 
    "Открытие народного дома",
    "Основание АлтГУ",
    "Медицинская школа при горном госпитале",
    "Строительство паровой машины Ползунова",
    "Публичная библиотека им. А.С.Гуляева",
    "Телеграф в Барнауле",
    "Научная библиотека им. В.Я.Шишкова",
    "Алтайская железная дорога",
    "Первый ВУЗ Барнаула",
    "АГМУ",
    "Барнаульская ТЭЦ-2",
    "Издательский дом Алтапресс",
    "Итоги 2020 года в цифрах",
    "Итоги 2021 года",
    "Итоги 2022. Главные барнаульские события"
];

var current_period = null;
var current_event = null;

period_to_event = {};
period_to_event[names_of_periods[0]] = [page_names[0], page_names[1], page_names[2], page_names[6], page_names[7]];
period_to_event[names_of_periods[1]] = [page_names[3], page_names[8], page_names[9], page_names[10]];
period_to_event[names_of_periods[2]] = [page_names[4], page_names[11], page_names[12], page_names[13], page_names[14], page_names[5], page_names[15]];
period_to_event[names_of_periods[3]] = [page_names[16], [page_names[17]], [page_names[18]]]; // Перезаполнить последнюю страницу.

content_main_page_elements = []
for (let i = 0; i < 6 && i < page_names.length; i++)
{
    content_main_page_elements[i] = page_names[i]; 
}

function free(arr)
{
    while (arr.length != 0)
    {
        arr[0].remove();
    }
}
function find(arr, object)
{
    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i] == object){
            return true;
        }
    }
    return false;
}
function generate_content_main_page()
{
    let main_page = document.createElement('div');
    main_page.className = 'main-page';
    let element_table = document.createElement('div');
    element_table.className = 'element-table';
    let rows = [];
    let row_count = Math.ceil(content_main_page_elements.length/2.);
    let start = 0;
    for (let i = 0; i < row_count; i++)
    {
        let row = document.createElement('div');
        row.className = 'element-row';
        for (let i = start; i < start + 2 && i != content_main_page_elements.length; i++)
        {
            let cell = document.createElement('div');
            cell.className = 'element-cell';
            let element = document.createElement('div');
            element.className = 'element-block';
            element.textContent = content_main_page_elements[i];
            let path =  `url("img/${i + 1}.png")`;
            element.style.backgroundImage = path;
            element.addEventListener('click', () => {onEventClick(element)});
            cell.appendChild(element);
            row.appendChild(cell);
        }
        start += 2;
        rows.push(row);
    }
    for (let i = 0; i < rows.length; i++)
    {
        element_table.appendChild(rows[i]);
    }
    main_page.appendChild(element_table);
    content.appendChild(main_page);
}

// generates on start

////////

function generate_content_text_page(event)
{
    let elems = content.getElementsByClassName('text-block');
    free(elems);
    let elems2 = content.getElementsByClassName('main-page');
    free(elems2);
    let text_block = document.createElement('div');
    text_block.className = 'text-block';
    let description = document.createElement('div');
    let header = document.createElement('div');
    header.className = 'header';
    header.textContent = event.textContent;
    description.className = 'text';
    description.textContent = text_dict[event.textContent];
    text_block.appendChild(header);
    text_block.appendChild(description);
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
}

function onEventClick(event)
{  
    let bgcolor = "rgb(132, 179, 250)";
    let color = "white";
    event.style.backgroundColor = bgcolor;
    event.style.color = color;
    window.location.href = event.textContent + ".html";
}
function generateEvents(period)
{
    for (let i = 0; i < period_to_event[period.textContent].length; i++)
    {
        let event = document.createElement('div');
        event.className = "events";
        event.addEventListener('click', () => { onEventClick(event)});
        let e = document.createElement('div');
        e.className = "event";
        e.textContent = period_to_event[period.textContent][i];
        if (e.textContent == current_event)
        {
            let bgcolor = "rgb(132, 179, 250)";
            let color = "white";
            event.style.backgroundColor = bgcolor;
            event.style.color = color;
        }
        event.append(e);
        right_menu.appendChild(event);
    }
}
function getPeriodByName(period_name)
{
    for (let i = 0; i < periods.length; i++)
    {
        let period = periods[i];
        if (period.textContent == period_name)
        {
            return period;
        }
    }
    return null;
}
function getEventByName(event_name)
{
    let events = right_menu.getElementsByClassName("events");
    for (let i = 0; i < events.length; i++)
    {
        let event = events[i];
        if (event.textContent == event_name)
        {
            return event;
        }
    }
    return null;
}

function chooseEvent(event_name)
{
    let period_name = null;
    for (let i = 0; i < names_of_periods.length; i++)
    {
        if (find(period_to_event[names_of_periods[i]], event_name))
        {
            period_name = names_of_periods[i];
            break;
        }
    }
    if (period_name != null)
    {
        let period = getPeriodByName(period_name);
        choosePeriod(period);
        let event = getEventByName(event_name);
        if (event != null)
        {
            resetEventsView(event);
            current_event = event_name;
            let bgcolor = "rgb(132, 179, 250)"
            let color = "white";
            event.style.backgroundColor = bgcolor;
            event.style.color = color;
        }
    }

}

function choosePeriod(period)
{
    let bg = "linear-gradient(0deg, grey 0px, #D6F8FF 2px)";
    period.style.background = bg;
    generateEvents(period); 
    current_period = period.textContent;
}
function onPeriodClick(period)
{
    resetPeriodsView(period);
    
    let events = right_menu.getElementsByClassName('events');
    if (events != null)
    {
        free(events)
    }
    if (period.style.backgroundColor == '') // on period choosing
    {
        choosePeriod(period);
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