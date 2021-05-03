import React, { useState, useEffect, ReactNode } from 'react';
import { string, number, bool, func, shape, node, oneOf, oneOfType } from 'prop-types';

import Icons from './Icons';
import { OTType, OTPosition, OTOptions } from './type';

const colors = {
  success: '#6EC05F',
  info: '#1271EC',
  warn: '#FED953',
  error: '#D60A2E',
  loading: '#0088ff',
};

type OToastProps = OTOptions & {
  show: boolean;
  id: number;
  message: string | ReactNode;
};

const Toast: React.FC<OToastProps> = (props) => {
  const type = props.type ?? 'success';
  const place = (props.position ?? 'top-center').includes('bottom') ? 'Bottom' : 'Top';
  const marginType = `margin${place}`;
  const className = ['ot-toast', `ot-toast-${type}`, props.onClick ? ' ot-cursor-pointer' : ''].join(' ');
  const borderLeft = `
    ${props.bar?.size ?? '3px'} 
    ${props.bar?.style ?? 'solid'} 
    ${props.bar?.color ?? colors[type]}
  `;
  const CurrentIcon = Icons[type];

  const [animStyles, setAnimStyles]: [any, Function] = useState({ opacity: 0, [marginType]: '-15px' });

  const style = {
    paddingLeft: props.heading ? '25px' : undefined,
    minHeight: props.heading ? '50px' : undefined,
    borderLeft,
    ...animStyles,
  };

  const handleHide = () => {
    setAnimStyles({ opacity: 0, [marginType]: '-15px' });
    setTimeout(() => {
      props.onHide?.(props.id, props.position);
    }, 300);
  };

  useEffect(() => {
    const animTimeout = setTimeout(() => {
      setAnimStyles({ opacity: 1, [marginType]: '15px' });
    }, 50);

    let hideTimeout;
    if (props.duration !== 0) {
      hideTimeout = setTimeout(() => {
        handleHide();
      }, props.duration);
    }

    return () => {
      clearTimeout(animTimeout);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, []);

  useEffect(() => {
    if (!props.show) {
      handleHide();
    }
  }, [props.show]);

  const clickProps = props.onClick
    ? {
        tabIndex: 0,
        onClick: props.onClick,
        onKeyPress: (e: any) => {
          if (e.keyCode === 13) {
            props.onClick?.(e);
          }
        },
      }
    : {};

  return (
    <div role={props.role} className={className} style={style} {...clickProps}>
      {props.renderIcon ? props.renderIcon() : <CurrentIcon />}
      <div className={props.heading ? 'ot-text-group-heading' : 'ot-text-group'}>
        {props.heading && <h4 className="ot-heading">{props.heading}</h4>}
        <div className="ot-text">{props.message}</div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  show: bool.isRequired,
  id: number.isRequired,
  message: oneOfType([string, node]).isRequired,
  type: oneOf<OTType>(['success', 'warn', 'info', 'error', 'loading']),
  duration: number,
  position: oneOf<OTPosition>(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']),
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
