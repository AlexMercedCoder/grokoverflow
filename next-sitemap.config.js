/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://grokoverflow.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
    ],
    additionalPaths: async (config) => [],
  },
  // URL-encode all paths to handle multi-word tags/categories with spaces
  // and differentiate priority between posts and taxonomy pages
  transform: async (config, path) => {
    // Strip any query string just in case
    const cleanPath = path.split('?')[0];
    const encodedLoc = encodeURI(`https://grokoverflow.com${cleanPath}`);

    // Blog posts get highest priority
    const isPost = cleanPath.startsWith('/posts/');
    // Taxonomy (category/tag/author) listing pages
    const isTaxonomy =
      cleanPath.startsWith('/blog/category/') ||
      cleanPath.startsWith('/blog/tag/') ||
      cleanPath.startsWith('/blog/author/');

    const priority = isPost ? 0.9 : isTaxonomy ? 0.5 : 0.7;
    const changefreq = isPost ? 'monthly' : 'weekly';

    return {
      loc: encodedLoc,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
