import { ReactNode, MouseEventHandler } from 'react';

export type CTType = 'success' | 'warn' | 'info' | 'error' | 'loading';

export type CTPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type CTOptions = Partial<{
  type: CTType;
  duration: number;
  position: CTPosition;
  role: string;
  containerID: string;
  heading: string;
  renderIcon: Function;
  bar: Partial<{
    size: string;
    style: 'solid' | 'dashed' | 'dotted';
    color: string;
  }>;
  onHide: Function;
  onClick: MouseEventHandler;
}>;

export type HideToastFunction = () => void;

export type CTReturn = { hide: HideToastFunction };

export type CTMethod = (message: string | ReactNode, options?: CTOptions) => CTReturn;

// 更高级的写法
export type CToast = CTMethod &
  {
    [key in CTType]: CTMethod;
  };

// export type CToast = CTMethod & {
//   success: CTMethod;
//   warn: CTMethod;
//   info: CTMethod;
//   error: CTMethod;
//   loading: CTMethod;
// };

declare namespace cogoToast {
  const success: CTMethod;
  const info: CTMethod;
  const loading: CTMethod;
  const warn: CTMethod;
  const error: CTMethod;
}

export default cogoToast;
