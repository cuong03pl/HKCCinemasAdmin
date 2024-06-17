export function convertTime(datetime) {
  const date = datetime?.slice(0, datetime?.indexOf("T")).split("-");
  return `${date[2]}-${date[1]}-${date[0]}`;
}

export function convertTimeSpan(timespan) {
  if (timespan) {
    const date = timespan?.split(":");
    return `${date[0]}:${date[1]}`;
  } else return timespan;
}
