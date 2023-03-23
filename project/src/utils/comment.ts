const convertDate = (date: string): string => new Date(date).toLocaleString('en-US', {month: 'long', year: 'numeric'});

export {convertDate};
