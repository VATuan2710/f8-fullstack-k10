function calculateAge(birthday) {
  const birthDate = new Date(birthday.split("/").reverse().join("-"));
  const today = new Date();
  const diffTime = today - birthDate;
  const daysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return daysLived;
}
const birthday = "27/10/2003";
console.log(`Bạn đã sống được ${calculateAge(birthday)} ngày.`);
