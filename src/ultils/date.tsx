const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function getLastDayOfMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

export function getMonthsAndNBefore(n=3) {
    const months = [];
    const date = new Date();
    const m = date.getMonth() + 1; //January is 0
    const y = date.getFullYear();

    for (let i = n - 1; i >= 0; i--) {
        let month = m;
        let year = y;
        let title = "";

        if (month - i > 0) 
            month = month - i;
        else {
            month = 12;
            year = year - 1
        }

        if (i === 0)
            title = "THIS MONTH";
        else if (i === 1)
            title = "LAST MONTH";
        else 
            title = `${month}/${year}`
        
        months.push({
            id: i + 1,
            title: title,
            dayStart: 1,
            dayEnd: getLastDayOfMonth(month, year),
            month: month,
            year: year
        })
    }

    months.push({
        id: months.length + 1,
        title: "FUTURE",
    });

    return months;
}

export function getDateJsonFormat(date: string) {
    return date.split("T")[0];
}

export function toDisplayDate(jsonDate: string) {
    const dateParts = jsonDate.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

export function getDateDetails(date: string) {
    let year: any, month: any, day: any = [...date.split("-")];
    
    return {
        "weekday": weekdays[new Date(year, month, day).getDay()],
        "day": day,
        "month": months[month - 1],
        "year": year,
    };
}