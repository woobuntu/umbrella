export default function convertTime(rawDate) {
  const [date, _] = rawDate.split("T");
  const [year, month, day] = date.split("-");

  return `${year}년 ${month}월 ${day}일`;
}
