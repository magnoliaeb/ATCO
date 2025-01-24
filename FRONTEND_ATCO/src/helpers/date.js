import { format, isBefore, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import {  formatInTimeZone  } from 'date-fns-tz';


const timeZone = 'America/Caracas';

// Formato deseado
export const formattedDate = (date) => {
    return formatInTimeZone(date, timeZone, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export const compareDates = (dueDate) => {

    // const date1InUtc = zonedTimeToUtc(dueDate, timeZone);
    // const date2InUtc = zonedTimeToUtc(new Date(), timeZone);



    // return isBefore(date1InUtc, date2InUtc) ? true : false;
    return isBefore(parseISO(dueDate), new Date()) ? true : false;

}
