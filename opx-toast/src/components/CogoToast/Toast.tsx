import React, { useState, useEffect, ReactNode } from 'react';
import { string, number, bool, func, shape, node, oneOf, oneOfType } from 'prop-types';

import Icons from './Icons';
import { CTType, CTPosition, CTOptions } from './types';

const colors = {
  success: '#6EC05F',
  info: '#1271EC',
  warn: '#FED953',
  error: '#D60A2E',
  loading: '#0088ff',
};

type CToastProps = CTOptions & {
  show: boolean;
  id: number;
  message: string | ReactNode;
};

const Toast: React.FC<CToastProps> = ({
  show = true,
  message,
  type = 'success',
  position = 'top-center',
  id,
  role,
  duration = 3000,
  heading,
  bar,
  renderIcon,
  onClick,
  onHide,
}) => {
  const place = position.includes('bottom') ? 'Bottom' : 'Top';
  const marginType = `margin${place}`;
  const className = ['ct-toast', `ct-toast-${type}`, onClick ? ' ct-cursor-pointer' : ''].join(' ');
  const borderLeft = `
    ${bar?.size ?? '3px'} 
    ${bar?.style ?? 'solid'} 
    ${bar?.color ?? colors[type]}
  `;
  const CurrentIcon = Icons[type];

  const [animStyles, setAnimStyles]: [any, Function] = useState({ opacity: 0, [marginType]: '-15px' });

  const style = {
    paddingLeft: heading ? '25px' : undefined,
    minHeight: heading ? '50px' : undefined,
    borderLeft,
    ...animStyles,
  };

  const handleHide = () => {
    setAnimStyles({ opacity: 0, [marginType]: '-15px' });
    setTimeout(() => {
      onHide?.(id, position);
    }, 300);
  };

  useEffect(() => {
    const animTimeout = setTimeout(() => {
      setAnimStyles({ opacity: 1, [marginType]: '15px' });
    }, 50);

    let hideTimeout;
    if (duration !== 0) {
      hideTimeout = setTimeout(() => {
        handleHide();
      }, duration);
    }

    return () => {
      clearTimeout(animTimeout);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) {
      handleHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const clickProps = onClick
    ? {
        tabIndex: 0,
        onClick: onClick,
        onKeyPress: (e: any) => {
          if (e.keyCode === 13) {
            onClick?.(e);
          }
        },
      }
    : {};

  return (
    <div role={role} className={className} style={style} {...clickProps}>
      {renderIcon ? renderIcon() : <CurrentIcon />}
      <div className={heading ? 'ct-text-group-heading' : 'ct-text-group'}>
        {heading && <h4 className="ct-heading">{heading}</h4>}
        <div className="ct-text">{message}</div>
      </div>
    </div>
  );
};

// propTypes 可以省略
Toast.propTypes = {
  show: bool.isRequired,
  id: number.isRequired,
  message: oneOfType([string, node]).isRequired,
  type: oneOf<CTType>(['success', 'warn', 'info', 'error', 'loading']),
  duration: number,
  position: oneOf<CTPosition>(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']),
  role: string,
  heading: string,
  renderIcon: func,
  bar: shape({}),
  onHide: func,
  onClick: func,
};

Toast.defaultProps = {
  show: true,
  duration: 3000,
  position: 'top-center',
  role: 'status',
  bar: {},
};

export default Toast;
