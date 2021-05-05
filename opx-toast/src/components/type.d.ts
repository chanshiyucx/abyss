import { ReactNode, MouseEventHandler } from 'react';

export type OTType = 'success' | 'warn' | 'info' | 'error' | 'loading';

export type OTPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type OTOptions = Partial<{
  type: OTType;
  duration: number;
  position: OTPosition;
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

export type OTReturn = { hide: HideToastFunction };

export type OTMethod = (message: string | ReactNode, options?: OTOptions) => OTReturn;

// 更高级的写法
export type OToast = OTMethod &
  {
    [key in OTType]: OTMethod;
  };

// export type OToast = OTMethod & {
//   success: OTMethod;
//   warn: OTMethod;
//   info: OTMethod;
//   error: OTMethod;
//   loading: OTMethod;
// };

declare namespace opxToast {
  const success: OTMethod;
  const info: OTMethod;
  const loading: OTMethod;
  const warn: OTMethod;
  const error: OTMethod;
}

export default opxToast;
