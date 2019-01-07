
const formatData = (data, numColumns) => {
  console.log('Formatting data');
  console.log(data);
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  // if (data.length <= 28) {
  //   data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
  // }
  return data;
};

const getMonthName = (val) => {
  let month = '';
  switch(val) {
    case 1:
      month = 'January';
      break;
    case 2:
      month = 'Febuary';
      break;
    case 3:
      month = 'March';
      break;
    case 4:
      month = 'April';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'July';
      break;
    case 8:
      month = 'August';
      break;
    case 9:
      month = 'September';
      break;
    case 10:
      month = 'October';
      break;
    case 11:
      month = 'November';
      break;
    case 12: 
      month = 'December';
      break;
    default:
      month = 'NaM';
  }
  return month;
}

export {
  formatData,
  getMonthName,
}