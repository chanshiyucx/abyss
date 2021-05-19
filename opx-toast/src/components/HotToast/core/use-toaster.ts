import { useEffect, useMemo } from 'react';
import { dispatch, ActionType, useStore } from './store';
import { toast } from './toast';
import { DefaultToastOptions } from './types';

export const useToaster = (toastOptions?: DefaultToastOptions) => {
  // useStore 的使用方式，类似 redux
  const { toasts, pausedAt } = useStore(toastOptions);
  const visibleToasts = toasts.filter((t) => t.visible);

  // 处理移除过期的 toast
  useEffect(() => {
    // 当处于暂停时不处理
    if (pausedAt) {
      return;
    }

    const now = Date.now();
    // 获取全部 toast 的过期移除定时器
    const timeouts = toasts.map((t) => {
      if (t.duration === Infinity) {
        // eslint-disable-next-line array-callback-return
        return;
      }

      // 计算剩余时间，如果剩余时间小于0，则立即移除，否则定时器移除
      const durationLeft = (t.duration ?? 0) + t.pauseDuration - (now - t.createdAt);
      if (durationLeft < 0) {
        if (t.visible) {
          toast.dismiss(t.id);
        }
        // eslint-disable-next-line array-callback-return
        return;
      }

      // 返回移除定时器
      return setTimeout(() => toast.dismiss(t.id), durationLeft);
    });

    // 卸载时，清除全部移除定时器
    return () => {
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt]);

  const handlers = useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: ActionType.START_PAUSE,
          time: Date.now(),
        });
      },
      endPause: () => {
        if (pausedAt) {
          dispatch({ type: ActionType.END_PAUSE, time: Date.now() });
        }
      },
      updateHeight: (toastId: string, height: number) =>
        dispatch({
          type: ActionType.UPDATE_TOAST,
          toast: { id: toastId, height },
        }),
      calculateOffset: (toastId: string, opts?: { reverseOrder?: boolean; margin?: number }) => {
        const { reverseOrder = false, margin = 8 } = opts ?? {};
        const index = visibleToasts.findIndex((toast) => toast.id === toastId);
        const offset =
          index !== -1
            ? visibleToasts
                .slice(...(reverseOrder ? [index + 1] : [0, index])) // 还有使用扩展运算符的骚操作
                .reduce((acc, t) => acc + (t.height ?? 0) + margin, 0)
            : 0;

        return offset;
      },
    }),
    [visibleToasts, pausedAt],
  );

  return {
    toasts,
    visibleToasts,
    handlers,
  };
};
