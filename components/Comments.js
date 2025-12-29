import React, { useEffect, useRef } from 'react';

export default function Comments() {
  const commentBox = useRef(null);

  useEffect(() => {
    if (!commentBox.current) return;
    
    // Clear existing children to prevent duplicates on re-renders
    commentBox.current.innerHTML = '';

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
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.crossOrigin = "anonymous";
    script.async = true;

    commentBox.current.appendChild(script);
  }, []);

  return (
    <div ref={commentBox} className="comments-wrapper" style={{ marginTop: '3rem' }} />
  );
}
