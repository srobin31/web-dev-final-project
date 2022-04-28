export const renderDateStr = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${month}/${day}/${year}`;
};

export const getAge = (birthday) => {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  const d = today.getDate() - birthday.getDate();
  if (m < 0 || (m === 0 && d < 0)) {
      age -= 1;
  }
  return age;
};
