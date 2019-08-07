import Moment from 'moment';

const shortDateFormat = 'DD MMM YYYY';
const longDateFormat = 'ddd DD MMM YYYY';
const shortDateTimeFormat = 'DD MMM YYYY HH:mm:ss';
const longDateTimeFormat = 'ddd DD MMM YYYY HH:mm:ss';
const dateTimePickerFormat = 'YYYY-MM-DDTHH:mm:ss';
const timeFormat = 'HH:mm:ss';

export const dateTimeHelper = {
  shortDate(date: string): string { return Moment(date).format(shortDateFormat); },
  getCurrentDate(): string { return Moment().format('DD/MM/YYYY') },
  shortDateFromDate(date: Date | null): string { return date ? Moment(date).format(shortDateFormat) : ""; },
  shortDateTimeFromDate(date: Date | null): string { return date ? Moment(date).format(shortDateTimeFormat) : ""; },
  longDateFromDate(date: Date | null): string { return date ? Moment(date).format(longDateFormat) : ""; },
  longDateTimeFromDate(date: Date | null): string { return date ? Moment(date).format(longDateTimeFormat) : ""; },
  toDateTimePickerValueFromDate(date: Date | null): string { return date ? Moment(date).format(dateTimePickerFormat) : ""; },
  getCurrentDateAsDate(): Date { return Moment().toDate(); },
  toJsonDateFromDateTimePicker(date: string): string | null { return date ? new Date(date).toJSON() : null },
  toJsonDateFromTimePicker(time: string): string | null { return time ? new Date('2018-01-01T' + time).toJSON() : null },
  timeFromDate(date: Date | null): string { return date ? Moment(date).format(timeFormat) : ""; },

  getFormattedDate(date: Date): string { return Moment(date).format('DD/MM/YYYY') },
  getStartOfThisMonth(date: Date) { return Moment(date).startOf('month'); },
  getStartOfNextMonth(date: Date) { return Moment(date).add(1, 'month').startOf('month'); },
  getStartOfNextMonthAsDate(date: Date) { return Moment(date).add(1, 'month').startOf('month').subtract(1, 'day').format('DD/MM/YYYY'); },
  getEndOfNextMonth(date: Date) { return Moment(date).add(1, 'month').endOf('month').subtract(1, 'day'); },
  getEndOfMonthPriorToDirectDebit(date: Date) {
    return this.getDaysDifferenceBetweenDates(date, Moment(date).endOf('month').toDate()) < 6 ?
      Moment(date).add(1, 'month').endOf('month').format('DD/MM/YYYY') :
      Moment(date).endOf('month').format('DD/MM/YYYY')
  },
  getDaysDifferenceBetweenDates(date1: Date, date2: Date) { return Moment(date2).diff(Moment(date1), 'days'); },
  getDaysUsedThisMonth(startDate: Date): number { return this.getDaysDifferenceBetweenDates(startDate, this.getStartOfNextMonth(startDate).toDate()) },
  getDaysTotalThisMonth(startDate: Date): number { return this.getDaysDifferenceBetweenDates(this.getStartOfThisMonth(startDate).toDate(), this.getStartOfNextMonth(startDate).toDate()) },
  getEndDateForQuarterly(date: Date) { return Moment(date).add(1, 'quarter').subtract(1, 'day'); },
  getEndDateForSemiAnnually(date: Date) { return Moment(date).add(6, 'month').subtract(1, 'day'); },
  getEndDateForAnnually(date: Date) { return Moment(date).add(1, 'year').subtract(1, 'day'); },
  getEndDateForQuarterlyAsDate(date: Date) { return Moment(date).add(1, 'quarter').subtract(1, 'day').format('DD/MM/YYYY'); },
  getEndDateForSemiAnnuallyAsDate(date: Date) { return Moment(date).add(6, 'month').subtract(1, 'day').format('DD/MM/YYYY'); },
  getEndDateForAnnuallyAsDate(date: Date) { return Moment(date).add(1, 'year').subtract(1, 'day').format('DD/MM/YYYY'); },
  getEndDateForPeriodAsDate(date: Date, productFrequencyName: string) {
    let endDate = {
      "Annually": this.getEndDateForAnnuallyAsDate(date), "Semi-Annually": this.getEndDateForSemiAnnuallyAsDate(date),
      "Quarterly": this.getEndDateForQuarterlyAsDate(date), "Monthly": this.getEndOfMonthPriorToDirectDebit(date)
    }; // this.getStartOfNextMonthAsDate(date)};
    return endDate[productFrequencyName];
  },

  getStartOfThisQuarter(date: Date) { return Moment(date).startOf('quarter'); },
  getStartOfNextQuarter(date: Date) { return Moment(date).add(1, 'quarter').startOf('quarter'); },
  getEndOfNextQuarter(date: Date) { return Moment(date).add(1, 'quarter').endOf('quarter'); }
}