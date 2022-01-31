//Method fo Checking the stored data  is expired or not. If da is in more than 30 minutes then it is expired

export const isDataExpired = date => {
  const oldDate = new Date(date);
  const currentDate = new Date();
  const differenceInMillis = Math.abs(currentDate - oldDate);
  const differenceInMinutes = Math.floor(differenceInMillis / 1000 / 60);
  if (differenceInMinutes > 30) {
    return true;
  }
  return false;
};
