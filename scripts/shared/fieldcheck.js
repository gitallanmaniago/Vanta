export function fieldChecker(data) {
  let result = 0;
  data.forEach((field, index) => {
    const errorElem = document.querySelector(`.js-field-${index}`);
    if(field.trim() === '') {
      result++;
      errorElem.classList.remove('hidden');
    } else
      errorElem.classList.add('hidden');
  });
  
  return result === 0 ? true : false;
}