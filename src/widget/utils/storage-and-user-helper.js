// Storage & user helper utils.

export function setUserToken(token) {
  localStorage.setItem('token', token);
}

export function getUserToken() {
  return localStorage.getItem('token');
}

export function setUserPublicAddress(address) {
  localStorage.setItem('address', address);
}

export function getUserPublicAddress() {
  return localStorage.getItem('address');
}

export function setSwapVia(swapvia) {
  localStorage.setItem('swapvia', swapvia);
}

export function getSwapVia() {
  return localStorage.getItem('swapvia');
}

export function whetherUserLoggedIn() {
  return getUserToken() ? true : false;
}
