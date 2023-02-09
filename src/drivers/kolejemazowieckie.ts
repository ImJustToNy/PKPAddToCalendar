import openCalendarPrompt from "../utils/openCalendarPrompt";

const buttonsCell = document.querySelector('#opcje-wybor');

const addToCalendarButton = document.createElement('button');

addToCalendarButton.classList.add('btn', 'btn-lg', 'btn-secondary');
addToCalendarButton.innerHTML = '<i class="fa fa-calendar-plus-o fa-fw"></i> Do kalendarza<br><span>Dodanie biletu do kalendarza</span>';

buttonsCell.append(addToCalendarButton);

addToCalendarButton.addEventListener('click', async () => {
    const leftColumn = document.querySelector('#pozycjeZamowienia > div:nth-child(2) > div > div.col-sm-5.col-xs-12 > div');

    const [departureStation, arrivalStation]
        = leftColumn.querySelector('b').innerHTML.split(' - ');

    const departureString = leftColumn.innerHTML.split('<br>')[1];
    const arrivalString = leftColumn.innerHTML.split('<br>')[2];

    const departureDate = parseDate(departureString);
    const departureTime = departureString.match(/\d{2}:\d{2}/)[0];

    const arrivalDate = parseDate(arrivalString);
    const arrivalTime = arrivalString.match(/\d{2}:\d{2}/)[0];

    const ticketNumber = document.querySelector('#pozycjeZamowienia > div:nth-child(2) > div > div.col-sm-7.col-xs-12 > div > div:nth-child(2) > b').innerHTML.replace('Bilet nr CP ', '');

    openCalendarPrompt(
        departureStation,
        arrivalStation,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        ticketNumber
    );
});

function parseDate(dateString: string) {
    const [day, month, year] = dateString.match(/\d{2}\.\d{2}\.\d{4}/)[0].split('.');

    return `${year}-${month}-${day}`;
}