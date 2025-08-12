function formatHour(hour, format = "12hr") {
  const formats = ["12hr", "24hr"];
  if (!formats.includes(format)) {
    throw new Error("Invalid time format.");
  }
  let hr = hour < 24 ? hour : hour % 24;
  let hourText = "";
  if (format !== "12hr") {
    if (hr < 10) {
      hourText = `0${hr}:00`;
    } else {
      hourText = `${hr}:00`;
    }
  } else {
    if (hr === 24 || hr < 12) {
      if (hr === 0) hourText = "12:00 AM";
      else if (hr < 10) hourText = `0${hr}:00 AM`;
      else hourText = `${hr === 24 ? "12" : hr}:00 AM`;
    } else {
      if (hr === 12) hourText = "12:00 PM";
      else if (hr > 12 && hr < 22) hourText = `0${hr % 12}:00 PM`;
      else hourText = `${hr % 12}:00 PM`;
    }
  }

  return hourText;
}

function getHours(startHour = 6) {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(formatHour(i + startHour));
  }

  return hours;
}

export { formatHour, getHours };
