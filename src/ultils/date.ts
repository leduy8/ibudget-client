const weekdays = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];
const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export function getLastDayOfMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function getMonthsAndNBefore(n = 3) {
  const months = [];
  const date = new Date();
  const m = date.getMonth() + 1; //January is 0
  const y = date.getFullYear();

  for (let i = n - 1; i >= 0; i--) {
    let month = m;
    let year = y;
    let title = "";

    if (month - i > 0) month = month - i;
    else {
      month = 12;
      year = year - 1;
    }

    if (i === 0) title = "THÁNG NÀY";
    else if (i === 1) title = "THÁNG TRƯỚC";
    else title = `${month}/${year}`;

    months.push({
      id: i + 1,
      title: title,
      dayStart: 1,
      dayEnd: getLastDayOfMonth(month, year),
      month: month,
      year: year,
    });
  }

  months.push({
    id: months.length + 1,
    title: "TƯƠNG LAI",
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
  let year: any, month: any, day: any;
  [year, month, day] = [...date.split("-")];

  return {
    weekday: weekdays[new Date(year, month, day).getDay()],
    day: day,
    month: months[month - 1],
    year: year,
  };
}

export function getReportDates() {
  const date = new Date();
  const m = date.getMonth() + 1; //January is 0
  const y = date.getFullYear();

  const timeLeap = [0, 3, 6];
  const titles = ["Tháng này", "3 tháng trước", "6 tháng trước"];
  const ids = [1, 3, 4];
  let timeRange = [];

  timeLeap.forEach((leap, index) => {
    if (m - leap > 0) {
      timeRange.push({
        id: ids[index],
        title: titles[index],
        dateStart: `${y}-${m - leap}-1`,
        dateEnd: `${y}-${m}-${getLastDayOfMonth(m, y)}`,
      });
    } else {
      timeRange.push({
        id: ids[index],
        title: titles[index],
        dateStart: `${y - 1}-${m - leap + 12}-1`,
        dateEnd: `${y}-${m}-${getLastDayOfMonth(m, y)}`,
      });
    }
  });

  if (m - 1 > 0) {
    timeRange.splice(1, 0, {
      id: 2,
      title: "Tháng trước",
      dateStart: `${y}-${m - 1}-1`,
      dateEnd: `${y}-${m - 1}-${getLastDayOfMonth(m - 1, y)}`,
    });
  } else {
    timeRange.splice(1, 0, {
      id: 2,
      title: "Tháng trước",
      dateStart: `${y - 1}-${m - 1 + 12}-1`,
      dateEnd: `${y - 1}-${m - 1 + 12}-${getLastDayOfMonth(m - 1 + 12, y - 1)}`,
    });
  }

  return timeRange;
}

export function getPlanningDates() {
  const date = new Date();
  const m = date.getMonth() + 1; //January is 0
  const y = date.getFullYear();

  let timeRange = [
    {
      id: 1,
      title: "Tháng này",
      fromDate: `${y}-${m}-1`,
      toDate: `${y}-${m}-${getLastDayOfMonth(m, `${y}`)}`,
    },
    {
      id: 2,
      title: "Năm nay",
      fromDate: `${y}-1-1`,
      toDate: `${y}-12-${getLastDayOfMonth(12, `${y}`)}`,
    },
  ];

  return timeRange;
}

export function checkDateInDateRange(fromDate, toDate, checkDate) {
  const fdate = fromDate.split("-");
  const tdate = toDate.split("-");
  const cdate = checkDate.split("-");

  const from = new Date(fdate[0], parseInt(fdate[1]) - 1, fdate[2]); // -1 because months are from 0 to 11
  const to = new Date(tdate[0], parseInt(tdate[1]) - 1, tdate[2]);
  const check = new Date(cdate[0], parseInt(cdate[1]) - 1, cdate[2]);

  return check > from && check < to;
}
