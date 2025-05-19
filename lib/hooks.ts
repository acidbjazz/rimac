export const useAgeFromBirthday = (birthDay: string) => {
  const [d, m, y] = birthDay.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) {
    age--;
  }
  return age;
};
