import { getWallet } from '../../../';

import { setUserPublicAddress } from '../../utils';
import { setSwapVia } from '../../utils/storage-and-user-helper';

import { METAMASK_NOT_DETECTED } from '../../../constants/responses';

export const connectWithMetaMask = async (widgetInstance) => {
  let seedPhraseCredentials = {
    wallet: 'metamask'
  };

  return await getWallet(seedPhraseCredentials).then((res) => {
    const errorMessage = document.getElementById('error-message');

    if (res === METAMASK_NOT_DETECTED) {
      errorMessage.innerHTML = res;
      errorMessage.style.display = 'block';
      return { status: false };
    } else {
      errorMessage.style.display = 'none';
      widgetInstance.userAddress = res;
      setUserPublicAddress(res);
      setSwapVia('metamask');
      return { status: true };
    }
  });
};
