export function getFirstDayOfMonth (date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function getLastDayOfMonth (date = new Date()): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function getDaysInMonth (date = new Date()): number {
    return getLastDayOfMonth(date).getDate()
}

export function getDaysOfMonth (date = new Date()): Date[] {
    const daysInMonth = getDaysInMonth(date);
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }

    return days;
}

export function getDateLabel (date = new Date()): string {
    const [dayLabel, monthLabel, yearLabel] = getDateSegments(date);

    return dayLabel + '.' + monthLabel + '.' + yearLabel
}

export function getDateString (date: Date): string {
    const [day, month, year] = getDateSegments(date);
    return `${year}-${month}-${day}`;
}

function getDateSegments (date: Date): [day: string, month: string, year: string] {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return [day, month, String(date.getFullYear())];
}
