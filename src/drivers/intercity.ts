import { TextItem } from "pdfjs-dist/types/src/display/api";

import openCalendarPrompt from "../utils/openCalendarPrompt";

import pdfjs from "../utils/pdfjs";

document.querySelectorAll('#print_area > div.content > div > div > form > div.lista_biletow_wrapper > div > div.orange').forEach(ticket => {
    const buttonsCell = ticket.querySelector('div.table_div_cell:nth-child(7)');

    const addToCalendarButton = document.createElement('input');

    addToCalendarButton.classList.add('orangebutton');
    addToCalendarButton.type = 'button';
    addToCalendarButton.value = 'Do kalendarza';

    buttonsCell.append(addToCalendarButton);

    addToCalendarButton.addEventListener('click', async () => {
        const ticketCell = ticket.querySelector('div.first');
        const directionsCell = ticket.querySelector('div.table_div_cell_relacja');
        const timeAndDateCell = ticket.querySelector('div.table_div_cell_wyjazd_od_do');

        const ticketNumber = ticketCell.querySelector('a').innerText.replace(/\D/g, '');

        const [departureStation, arrivalStation, connectionId] = (<HTMLElement> directionsCell).innerText.split('\n');

        const departureDate = timeAndDateCell.querySelector('div.display-inline:nth-child(2)').innerHTML.trim();
        const departureTime = timeAndDateCell.querySelector('div.display-inline:nth-child(5)').innerHTML.trim();

        const arrivalDate = timeAndDateCell.querySelector('div.display-inline:nth-child(9)').innerHTML.trim();
        const arrivalTime = timeAndDateCell.querySelector('div.display-inline:nth-child(12)').innerHTML.trim();

        const ticketUrl = `https://bilet.intercity.pl/BiletPDF?bilet=${ticketNumber}`;

        let seats = '', wagon, legend;

        await pdfjs.getDocument(ticketUrl).promise.then(async function (pdf) {
            await pdf.getPage(1).then(async function (page) {
                await page.getTextContent().then(function (textContent) {
                    wagon = (<TextItem> textContent.items[49]).str + (<TextItem> textContent.items[51]).str;

                    let lookingForSeats = true;

                    for (let i = 53; lookingForSeats; i += 4) {
                        seats += (<TextItem> textContent.items[i]).str + (<TextItem> textContent.items[i + 2]).str + ' ';

                        lookingForSeats = seats.endsWith(', ');
                    }

                    for (let i in textContent.items) {
                        if ((<TextItem> textContent.items[i]).str.startsWith('LEGENDA:')) {
                            legend = (<TextItem> textContent.items[i]).str.replace('LEGENDA:', 'Legenda:');
                            break;
                        }
                    }
                });
            });
        }, function (reason) {
            console.error(reason);
        });

        openCalendarPrompt(
            departureStation,
            arrivalStation,
            departureDate,
            departureTime,
            arrivalDate,
            arrivalTime,
            ticketNumber,
            [
                `Numery miejsc: ${seats}`,
                `Numer wagonu: ${wagon}`,
                `Numer pociągu: ${connectionId}`,
                `Link do biletu: [url]${ticketUrl}[/url]`,
                legend
            ]
        );
    });
});