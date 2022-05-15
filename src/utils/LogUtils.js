const printArray = (arr, msg = '') => {
  let str = '';
  arr.forEach((item, index) => {
    str += item.name + ', ';
  });
  if (msg !== '') {
    msg += ': ';
  }
  console.log(msg + '陣列為 ', str);
};

export default printArray;
