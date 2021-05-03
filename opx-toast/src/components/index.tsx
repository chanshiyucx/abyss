import React from 'react';
import ReactDOM from 'react-dom';

import ToastContainer from './ToastContainer';

import { OToast, OTReturn } from './type.d';

import './styles.css';

let oToastID = 0;

const opxToast: OToast = (message, options = {}) => {
  let rootContainer = document.getElementById(options.containerID ?? 'ot-container');
  if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = 'ot-container';
    document.body.appendChild(rootContainer);
  }

  oToastID += 1;
  const toast = { id: oToastID, message, ...options };

  ReactDOM.render(<ToastContainer toast={toast} />, rootContainer);

  const hide = () => {
    ReactDOM.render(<ToastContainer hiddenID={toast.id} />, rootContainer);
  };

  const result: OTReturn = { hide };
  return result;
};

opxToast.success = (m, o) => opxToast(m, { ...o, type: 'success' });
opxToast.warn = (m, o) => opxToast(m, { ...o, type: 'warn' });
opxToast.info = (m, o) => opxToast(m, { ...o, type: 'info' });
opxToast.error = (m, o) => opxToast(m, { ...o, type: 'error' });
opxToast.loading = (m, o) => opxToast(m, { ...o, type: 'loading' });

export default opxToast;
