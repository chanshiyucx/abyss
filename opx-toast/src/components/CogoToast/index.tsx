import React from 'react';
import ReactDOM from 'react-dom';

import ToastContainer from './ToastContainer';

import { CToast, CTReturn } from './types';

import './styles.css';

let oToastID = 0;

const cogoToast: CToast = (message, options = {}) => {
  let rootContainer = document.getElementById(options.containerID ?? 'ct-container');
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'ct-container';
    document.body.appendChild(rootContainer);
  }

  oToastID += 1;
  const toast = { id: oToastID, message, ...options };

  ReactDOM.render(<ToastContainer toast={toast} />, rootContainer);

  const hide = () => {
    ReactDOM.render(<ToastContainer hiddenID={toast.id} />, rootContainer);
  };

  const result: CTReturn = { hide };
  return result;
};

cogoToast.success = (m, o) => cogoToast(m, { ...o, type: 'success' });
cogoToast.warn = (m, o) => cogoToast(m, { ...o, type: 'warn' });
cogoToast.info = (m, o) => cogoToast(m, { ...o, type: 'info' });
cogoToast.error = (m, o) => cogoToast(m, { ...o, type: 'error' });
cogoToast.loading = (m, o) => cogoToast(m, { ...o, type: 'loading' });

export default cogoToast;
