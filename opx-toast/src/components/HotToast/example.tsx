import React, { useState } from 'react';
import toast, { Toaster, ToastPosition } from './index';

const positions: Array<ToastPosition> = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const examples: Array<{
  title: string;
  action: () => void;
  emoji: string;
}> = [
  {
    title: 'Success',
    emoji: '✅',
    action: () => {
      toast.success('Successfully toasted!');
    },
  },
  {
    title: 'Error',
    emoji: '❌',
    action: () => {
      toast.error("This didn't work.");
    },
  },
  {
    title: 'Promise',
    emoji: '⏳',
    action: () => {
      const promise = new Promise((res, rej) => {
        setTimeout(Math.random() > 0.5 ? res : rej, 1000);
      });

      toast.promise(
        promise,
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        },
        {
          style: {
            width: '200px',
            paddingRight: '10px',
          },
        },
      );
    },
  },
  {
    title: 'Multi Line',
    emoji: '↕️',
    action: () => {
      toast(
        "This toast is super big. I don't think anyone could eat it in one bite. It's larger than you expected. You eat it but it does not seem to get smaller.",
        {
          duration: 6000,
        },
      );
    },
  },
  {
    title: 'Emoji',
    emoji: '👏',
    action: () => {
      toast('Good Job!', {
        icon: '👏',
      });
    },
  },
  {
    title: 'Dark Mode',
    emoji: '🌚',
    action: () => {
      toast('Hello Darkness!', {
        icon: '👏',
        style: {
          borderRadius: '200px',
          background: '#333',
          color: '#fff',
        },
      });
    },
  },
  {
    title: 'JSX Content',
    emoji: '🔩',
    action: () => {
      toast((t) => (
        <span>
          Custom and <b>bold</b>
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </span>
      ));
    },
  },
  {
    title: 'Themed',
    emoji: '🎨',
    action: () => {
      toast.success('Look at my styles.', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    },
  },
];

export const HotToastExample = () => {
  const [position, setPosition] = useState<ToastPosition>('top-center');

  const renderPosition = (p: ToastPosition) => (
    <button
      id="p"
      key={p}
      onClick={() => {
        toast.success(
          <span>
            Position set to <b>{p}</b>
          </span>,
          {
            id: 'position',
            // duration: 100 * 1000,
          },
        );

        setPosition(p);
      }}
    >
      <span>{p}</span>
    </button>
  );

  return (
    <section>
      <h3>
        <a href="https://github.com/timolins/react-hot-toast" rel="noopener nofollow">
          react-hot-toast
        </a>
      </h3>
      <div>{positions.map((p) => renderPosition(p))}</div>
      <div>
        {examples.map((e) => (
          <button key={e.title} onClick={e.action}>
            <span>{e.emoji}</span>
            <div>{e.title}</div>
          </button>
        ))}
      </div>
      <Toaster position={position} />
    </section>
  );
};
