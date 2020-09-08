import { getWallet } from '../../../';

import { setUserPublicAddress } from '../../utils';
import { setSwapVia } from '../../utils/storage-and-user-helper';

export const connectWithMetaMask = async (widgetInstance) => {
  let seedPhraseCredentials = {
    wallet: 'metamask',
    infuraKey: '7484a12fa3b544f79bf51ef44edd6db5'
  };

  return await getWallet(seedPhraseCredentials).then((res) => {
    const errorMessage = document.getElementById('error-message');

    if (res === 'metamask not detected') {
      errorMessage.innerHTML = res;
      errorMessage.style.display = 'block';
      return { status: false, message: 'Error connecting wallet' };
    } else {
      errorMessage.style.display = 'none';
      widgetInstance.userAddress = res;
      setUserPublicAddress(res);
      setSwapVia('metamask');
      return { status: true, message: 'Got wallet address' };
    }
  });
};
