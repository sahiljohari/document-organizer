const formatDate = (date) => {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  return `${monthString}-${dateString}-${date.getFullYear()}`;
};

export { formatDate };
