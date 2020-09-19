// Storage & user helper utils.

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
  return getUserPublicAddress() ? true : false;
}
