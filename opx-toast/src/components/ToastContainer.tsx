import React, { useState, useEffect } from 'react';
import { shape, number } from 'prop-types';

import { OTType } from './type';
import Toast from './Toast';

const camelCase = (str: string) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const defaultToasts = {
  topLeft: [],
  topCenter: [],
  topRight: [],
  bottomLeft: [],
  bottomCenter: [],
  bottomRight: [],
};

type OToastItem = {
  type: OTType;
  id: number;
  message: string;
  duration: number;
  onClick: any;
  onHide: any;
};

type OToastContainerProps = Partial<{
  toast: {
    position?: string;
    onHide?: Function;
  };
  hiddenID: number;
}>;

const ToastContainer: React.FC<OToastContainerProps> = ({ toast, hiddenID }) => {
  const [allToasts, setToasts] = useState(defaultToasts);

  useEffect(() => {
    if (toast) {
      setToasts((prevToasts) => {
        const position = camelCase(toast.position ?? 'top-center');
        return { ...prevToasts, [position]: [...prevToasts[position], toast] };
      });
    }
  }, [toast]);

  const handleRemove = (id: number, position: string) => {
    setToasts((prevToasts) => {
      const toastPosition = camelCase(position ?? 'top-center');
      return {
        ...prevToasts,
        [toastPosition]: prevToasts[toastPosition].filter((item: OToastItem) => item.id !== id),
      };
    });
    toast?.onHide?.();
  };

  const rows = ['top', 'bottom'];
  const groups = ['Left', 'Center', 'Right'];

  return (
    <>
      {rows.map((row) => (
        <div key={`row_${row}`} className="ot-row">
          {groups.map((group) => {
            const type = `${row}${group}`;
            const className = ['ot-group', row === 'bottom' ? 'ot-flex-bottom' : ''].join(' ');
            return (
              <div key={type} className={className}>
                {allToasts[type].map((item: OToastItem) => (
                  <Toast key={`${type}_${item.id}`} show={hiddenID !== item.id} {...item} onHide={handleRemove} />
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

ToastContainer.propTypes = {
  toast: shape({}),
  hiddenID: number,
};

ToastContainer.defaultProps = {
  toast: undefined,
  hiddenID: undefined,
};

export default ToastContainer;
