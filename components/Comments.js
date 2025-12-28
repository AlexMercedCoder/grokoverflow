import React, { useEffect, useState } from 'react';

export default function Comments() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="comments-wrapper" style={{ marginTop: '3rem' }}>
      <script
        src="https://giscus.app/client.js"
        data-repo="alexmercedcoder/grokoverflow"
        data-repo-id="R_kgDOG_wKOg"
        data-category="General"
        data-category-id="DIC_kwDOG_wKOs4C0VDh"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="en"
        crossOrigin="anonymous"
        async
      />
    </div>
  );
}
