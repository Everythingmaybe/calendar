import { WeekDay } from '@angular/common';

export interface Day {
  date: Date;
  number: number;
  isWeekend: boolean;
}

export function getMonthDays(date?: Date): Day[] {
  const tempDate = new Date(date || '');
  tempDate.setMonth(tempDate.getMonth() + 1, 0);
  tempDate.setHours(0, 0, 0, 0);
  return Array(tempDate.getDate()).fill(undefined).map((_, i) => {
    const number = i + 1;
    tempDate.setDate(number);
    const day = tempDate.getDay();
    return {
      date: new Date(tempDate),
      number,
      isWeekend: day === WeekDay.Sunday || day === WeekDay.Saturday
    };
  });
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString('default', { month: 'long' })
}
