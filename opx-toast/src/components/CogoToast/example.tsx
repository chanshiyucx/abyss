import React from 'react';
import cogoToast from './index';

const types = ['success', 'info', 'loading', 'warn', 'error'];

const showMessage = (type: string) => {
  const { hide } = cogoToast[type](`This is a ${type} message.`, {
    position: 'top-left',
    heading: type,
    onClick: () => {
      hide();
    },
    onHide: () => {
      // console.log('onHide: ' + type);
    },
  });
};

const showAll = () =>
  types.forEach((type, i) => {
    setTimeout(() => {
      showMessage(type);
    }, 10);
  });

export const CogoToastExample = () => (
  <section>
    <h3>
      <a href="https://github.com/Cogoport/cogo-toast" rel="noopener nofollow">
        cogo-toast
      </a>
    </h3>
    <div>
      {types.map((type) => (
        <button key={type} className={type} onClick={() => showMessage(type)}>
          {type}
        </button>
      ))}
      <button className="primary" onClick={showAll}>
        Show All
      </button>
    </div>
  </section>
);
