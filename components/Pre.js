import { useState, useRef } from 'react';

const Pre = (props) => {
  const textInput = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div 
        onMouseEnter={onEnter} 
        onMouseLeave={onExit} 
        style={{ position: 'relative' }}
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          onClick={onCopy}
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            zIndex: 10,
            padding: '5px 10px',
            background: copied ? 'var(--secondary-color)' : 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-sans)',
            transition: 'background 0.2s'
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
      <pre ref={textInput} {...props}>
        {props.children}
      </pre>
    </div>
  );
};

export default Pre;
