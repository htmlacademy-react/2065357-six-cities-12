const convertDate = (date: string): string => new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' });

const convertToTwoDigit = (value: number): number | string => value < 10 ? `0${value}` : value;

const convertDateForDateTime = (date: string): string => {
  const d = new Date(date);

  return `${d.getFullYear()}-${convertToTwoDigit(d.getMonth() + 1)}-${convertToTwoDigit(d.getDate())}`;
};

export { convertDate, convertDateForDateTime };
