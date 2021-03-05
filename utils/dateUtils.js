const formatDate = (date) => {
  const currentMonth = date.getMonth();
  const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
  const currentDate = date.getDate();
  const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
  return `${monthString}-${dateString}-${date.getFullYear()}`;
};

const getRemainingDays = (expiryDate) => {
  const expDate = new Date(expiryDate);
  const today = new Date();
  const diffTime = Math.abs(expDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export { formatDate, getRemainingDays };
