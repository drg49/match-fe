export const handleResponse = res => res.ok ? res.json() : res.text().then((e) => { throw new Error(e)});

export const parseError = error => JSON.parse(error.message).message;

export const capitalizeWords = (str) => {
  let words = str.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}
