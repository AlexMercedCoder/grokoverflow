import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  const scrollHeight = () => {
    const el = document.documentElement;
    const ScrollTop = el.scrollTop || document.body.scrollTop;
    const ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    
    const percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    setWidth(percent);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHeight);
    return () => window.removeEventListener('scroll', scrollHeight);
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${width}%`,
        height: '4px',
        background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
        zIndex: 9999,
        transition: 'width 0.1s ease-out'
      }}
    />
  );
}
