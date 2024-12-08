export const trimRegexAndThaiCharacters = (input: string) => {
  const regexSpecialCharacters = /[a-zA-Z!#$%^&*(), ?":{}|<>'+;&[\]฿\\=`~\/]/g;
  const regexThai = /[ก-๙]/;
  let cleanedInput = input.replace(regexSpecialCharacters, '');
  cleanedInput = cleanedInput.replace(regexThai, '');
  return cleanedInput.trim();
};
