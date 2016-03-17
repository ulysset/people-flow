/**
 * XMLHttpRequest micro library
 *
 * @param {string} url
 * @param {string} method
 * @param {object} body
 * @param {object} headers
 * @return {object}
 */
export default (url, { method = 'GET', body = null, headers = {} } = {} ) => {
  const xhr = new XMLHttpRequest();
  return new Promise(resolve => {
    xhr.open(method, url, true);
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key.toLowerCase(), headers[key]);
    });
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status !== 0 && xhr.statusText !== 'abort') {
        resolve(xhr.response);
      }
    };
    xhr.send(body);
  });
};
