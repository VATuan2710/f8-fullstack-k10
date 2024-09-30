function countDownToNewYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const newYear = new Date(currentYear + 1, 0, 1);
  const diffTime = newYear - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(`Còn ${daysLeft} ngày đến Tết Dương Lịch!`);
}
countDownToNewYear();
