const days = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

/**
 *
 * @param {number} startingDayIndex - Saturday: 0 | Sunday: 1 | Monday: 2 | Tuesday: 3 | Wednesday: 4 | Thursday: 5 | Friday: 6
 * @returns {Array} The Week Days where first day is based on the startingDayIndex
 */

const getWeekDays = (startingDayIndex = 0) => {
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(days[(i + startingDayIndex) % 7]);
  }

  return weekDays;
};

export { getWeekDays };
