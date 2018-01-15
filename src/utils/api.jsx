import fetch from 'isomorphic-unfetch';

function checkStatus(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }

  return res;
}

export default function request(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json());
}
