function eventCard(e){
    return `
    <div class="card">
        <img class="poster" src="${e.image}">
        <h2 class="event-title">${e.title} <span class="date">(${e.date})</span></h2>
        <p>${e.summary}</p>
        <button type="button">RSVP</button>
        </div>
    `
}

fetch("data/event.json")
.then(response => {
   return response.json();
})
.then(events => {
    document.getElementById("event").innerHTML = `
    <h1 class="page-title">All Events</h1>
    <p class="footer">${events.length} events found</p>
    ${events.map(eventCard).join('')}
`
});