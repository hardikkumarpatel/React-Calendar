const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function areDatesEqual(date1: any, date2: any) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const convertToDateObject = (date: Date) => {
  return new Date(date);
};

const getStartOfMonth = (date: Date) => {
  const today = new Date(convertToDateObject(date));
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return startOfMonth;
};

const getEndOfMonth = (date: Date) => {
  const today = new Date(convertToDateObject(date));
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDayOfMonth;
};

const getStartOfWeek = (date: Date) => {
  const today = new Date(convertToDateObject(date));
  const dayOfWeek = today.getDay();
  const difference = dayOfWeek - 0; // 0 is Sunday

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - difference);

  return startOfWeek;
};

const getEndOfWeek = (date: Date) => {
  const today = new Date(convertToDateObject(date));
  const dayOfWeek = today.getDay();
  const difference = 6 - dayOfWeek; // 6 is Saturday

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + difference);

  return endOfWeek;
};

const cn = (...args:  string[]) => {
  return args.filter(Boolean).join(' ').trim();
};



export { DAYS, getStartOfMonth, getEndOfMonth, getStartOfWeek, getEndOfWeek, areDatesEqual, cn };
