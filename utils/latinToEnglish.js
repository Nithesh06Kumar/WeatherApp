//Method for converting Latin style letter to english (This is for API city names are in latin style)

export default latinToEnglish = value => {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
