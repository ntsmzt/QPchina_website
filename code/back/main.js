function eventCard(e){
    return `
    <img class="poster" src="${e.image}">
    <h2 class="event-title">${e.Event_Title} <span class="date">(${e.Event_Date})</span></h2>
    <p>${e.Event_Summary_for_Web}</p>
    <button type="button">RSVP</button>
    `
}

fetch("data/event.json")
.then(response => {
   return response.json();
})
.then(events => {
    document.getElementById("numOfEvents").innerHTML = `${events.length} events found`;

    const eventList = document.getElementById('event');
    const pagination_element = document.getElementById('pagination');

    let current_page = 1;
    let rows = 10;

    function DisplayList (events, wrapper, rows_per_page, page) {
	    wrapper.innerHTML = "";
	    page--;
	    let start = rows_per_page * page;
	    let end = start + rows_per_page;
	    let paginatedcards = events.slice(start, end);

	    for (let i = 0; i < paginatedcards.length; i++) {
		    let e = paginatedcards[i];
		    let card_element = document.createElement('div');
		    card_element.classList.add('card');
		    card_element.innerHTML = eventCard(e);
		
		    wrapper.appendChild(card_element);
	    }
    }

    function SetupPagination (events, wrapper, rows_per_page) {
	    wrapper.innerHTML = "";

	    let page_count = Math.ceil(events.length / rows_per_page);
	    for (let i = 1; i < page_count + 1; i++) {
		    let btn = PaginationButton(i, events);
		    wrapper.appendChild(btn);
	    }
    }

    function PaginationButton (page, cards) {
	    let button = document.createElement('button');
	    button.innerText = page;
        button.className = "pagination_btn";

	    if (current_page == page){
            button.classList.add('active');
        }

	    button.addEventListener('click', function () {
		    current_page = page;
		    DisplayList(cards, eventList, rows, current_page);
	    });

	    return button;
    }

    DisplayList(events, eventList, rows, current_page);
    SetupPagination(events, pagination_element, rows);
});
