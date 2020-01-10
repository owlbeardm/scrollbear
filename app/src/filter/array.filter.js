angular.module('app.filters').filter('array', [
  () => (input) => {
    if (!input) {
      return '';
    }
    if (!Array.isArray(input)) {
      return input;
    }
    return input.reduce((accumulator, currentValue, currentIndex) => accumulator + (
      (currentIndex === 0)
        ? ''
        : ', ') + currentValue, '');
  },
]);
