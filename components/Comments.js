import React, { useEffect, useRef } from 'react';

export default function Comments() {
  const commentBox = useRef(null);

  useEffect(() => {
    if (!commentBox.current) return;
    
    // Clear existing children
    commentBox.current.innerHTML = '';
    
    // Determine current theme
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const giscusTheme = currentTheme === "dark" ? "dark" : "light";

    const script = document.createElement('script');
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "alexmercedcoder/grokoverflow");
    script.setAttribute("data-repo-id", "R_kgDOG_wKOg");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOG_wKOs4C0VDh");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    // Initial theme set based on current site state
    script.setAttribute("data-theme", giscusTheme); 
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    commentBox.current.appendChild(script);

    // Watch for theme changes to update Giscus dynamically
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                
                 // Send message to Giscus iframe to update theme
                 const iframe = document.querySelector('iframe.giscus-frame');
                 if (!iframe) return;
                 iframe.contentWindow.postMessage({
                   giscus: {
                     setConfig: {
                       theme: newTheme
                     }
                   }
                 }, 'https://giscus.app');
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={commentBox} className="comments-wrapper" style={{ marginTop: '3rem' }} />
  );
}
