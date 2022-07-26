import { format } from 'date-fns';

function formatDate(str, outputFormat = 'dd-MMM-yyyy') {
  const formated = str ? format(new Date(str), outputFormat) : '';
  return formated;
}

export default formatDate;
