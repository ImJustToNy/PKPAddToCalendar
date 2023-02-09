// Polyfill for custom elements to prevent errors when initializing add-to-calendar-button
import '@webcomponents/custom-elements';

import { atcb_action } from "add-to-calendar-button";

export default function openCalendarPrompt(
    departureStation: string,
    arrivalStation: string,
    departureDate: string,
    departureTime: string,
    arrivalDate: string,
    arrivalTime: string,
    ticketNumber: string,
    description: string[] = [],
) {
    atcb_action({
        'name': `Podróż ${departureStation} - ${arrivalStation}`,
        'description': description.join('<br>'),
        'startDate': departureDate,
        'endDate': arrivalDate,
        'startTime': departureTime,
        'endTime': arrivalTime,
        'iCalFileName': `Podroz-${ticketNumber}`,
        'language': 'pl',
        'timeZone': 'Europe/Warsaw',
        'options': [
            'Apple',
            'Google',
            'iCal',
            'Microsoft365',
            'MicrosoftTeams',
            'Outlook.com',
            'Yahoo'
        ],
    });
}