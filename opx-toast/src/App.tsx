import React from 'react';
import './App.css';
import opxToast from './components/CogoToast';

const types = ['success', 'info', 'loading', 'warn', 'error'];

const showMessage = (type: string) => {
  const { hide } = opxToast[type](`This is a ${type} message.`, {
    position: 'top-left',
    heading: type,
    onClick: () => {
      hide();
    },
    onHide: () => {
      console.log('onHide: ' + type);
    },
  });
};

const showAll = () =>
  types.forEach((type, i) => {
    setTimeout(() => {
      showMessage(type);
    }, 10);
  });

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
