//this function returns monday and next monday to calculate weekly statistics chart
export const getCurrentWeek = () => {
  const now = new Date();

  const day = now.getDay(); //Sunday=0 , Monday=1, .. Saturday=6

  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1)); //day-1= days to go backwards(current day exclusive)
  monday.setHours(0, 0, 0, 0);

  const nextMonday = new Date(monday);
  nextMonday.setDate(monday.getDate() + 7);

  return {
    monday,
    nextMonday,
  };
};