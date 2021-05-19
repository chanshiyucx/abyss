import { useEffect, useState } from 'react';
import { ToastType, Toast, DefaultToastOptions } from './types';

const TOAST_LIMIT = 20;

export enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  UPSERT_TOAST,
  DISMISS_TOAST,
  REMOVE_TOAST,
  START_PAUSE,
  END_PAUSE,
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<Toast>;
    }
  | {
      type: ActionType.UPSERT_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.START_PAUSE;
      time: number;
    }
  | {
      type: ActionType.END_PAUSE;
      time: number;
    };

interface State {
  toasts: Toast[];
  pausedAt: number | undefined;
}

// 可以读取 interface 属性类型
const toastTimeouts = new Map<Toast['id'], ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionType.REMOVE_TOAST,
      toastId,
    });
  }, 1000);

  toastTimeouts.set(toastId, timeout);
};

const clearFromRemoveQueue = (toastId: string) => {
  const timeout = toastTimeouts.get(toastId);
  if (timeout) {
    clearTimeout(timeout);
  }
};

export const reducer = (state: State, action: Action): State => {
  // 为什么这里的 switch 不需要 break
  // The switch cases all use return statements, so a break isn't necessary. [https://github.com/reduxjs/redux/issues/2996]
  switch (action.type) {
    case ActionType.ADD_TOAST:
      // 添加 toast 限制长度 20
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case ActionType.UPDATE_TOAST:
      //  ! Side effects !
      if (action.toast.id) {
        clearFromRemoveQueue(action.toast.id);
      }

      return {
        ...state,
        // 还有这种骚操作 GET！
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };
    case ActionType.UPSERT_TOAST:
      const { toast } = action;
      return state.toasts.find((t) => t.id === toast.id)
        ? reducer(state, { type: ActionType.UPDATE_TOAST, toast })
        : reducer(state, { type: ActionType.ADD_TOAST, toast });
    case ActionType.DISMISS_TOAST:
      const { toastId } = action;

      // ! Side effects ! - This could be execrated into a dismissToast() action, but I'll keep it here for simplicity
      if (toastId) {
        // 隐藏一个
        addToRemoveQueue(toastId);
      } else {
        // 隐藏全部
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t,
        ),
      };
    case ActionType.REMOVE_TOAST:
      return {
        ...state,
        toasts: action.toastId === undefined ? [] : state.toasts.filter((t) => t.id !== action.toastId),
      };
    case ActionType.START_PAUSE:
      return {
        ...state,
        pausedAt: action.time,
      };

    case ActionType.END_PAUSE:
      const diff = action.time - (state.pausedAt ?? 0);
      return {
        ...state,
        pausedAt: undefined,
        toasts: state.toasts.map((t) => ({
          ...t,
          pauseDuration: t.pauseDuration + diff,
        })),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [], pausedAt: undefined };

export const dispatch = (action: Action) => {
  // listeners 其实就是 setState 数组，reducer 返回新的 state，然后调用 setState 设置新的 state
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

// 简单定义一个对象
const defaultTimeouts: {
  [key in ToastType]: number;
} = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: 30000,
};

// 负责返回全部 state
export const useStore = (toastOptions: DefaultToastOptions = {}): State => {
  const [state, setState] = useState<State>(memoryState);

  // 将 setState 函数缓存，每次 dispatch 时候都需要 setState 一下
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  const mergedToasts = state.toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t,
    duration: t.duration ?? toastOptions[t.type]?.duration ?? toastOptions?.duration ?? defaultTimeouts[t.type],
    style: {
      ...toastOptions.style,
      ...toastOptions[t.type]?.style,
      ...t.style,
    },
  }));

  return {
    ...state,
    toasts: mergedToasts,
  };
};
