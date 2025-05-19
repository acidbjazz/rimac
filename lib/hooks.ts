export const useAgeFromBirthday = (birthDay: string | undefined): number | null => {
  if (!birthDay) {
    return null;
  }
  const [d, m, y] = birthDay.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  const currentMonth = today.getMonth() + 1; // Meses son 0-indexados
  const currentDay = today.getDate();

  if (currentMonth < m || (currentMonth === m && currentDay < d)) {
    age--;
  }
  return age < 0 ? 0 : age;
};
