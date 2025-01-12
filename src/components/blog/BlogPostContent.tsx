interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const formatContent = (content: string) => {
    const withPreservedParagraphs = content.replace(/\n\n+/g, '|||PARAGRAPH|||');
    const withLineBreaks = withPreservedParagraphs.replace(/\n/g, '<br />');
    return withLineBreaks
      .split('|||PARAGRAPH|||')
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('\n\n');
  };

  return (
    <div 
      className="prose prose-invert prose-lg max-w-none
        prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-8
        prose-headings:font-judson prose-headings:text-white prose-headings:mt-16 prose-headings:mb-8
        prose-h1:text-5xl md:prose-h1:text-6xl prose-h1:leading-tight
        prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:leading-tight
        prose-h3:text-3xl md:prose-h3:text-4xl prose-h3:leading-tight
        prose-h4:text-2xl md:prose-h4:text-3xl prose-h4:leading-tight
        prose-strong:text-white prose-strong:font-medium
        prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors prose-a:no-underline
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 
        prose-blockquote:text-xl prose-blockquote:text-neutral-200 prose-blockquote:italic 
        prose-blockquote:font-judson prose-blockquote:my-12
        prose-pre:bg-neutral-800/50 prose-pre:text-neutral-300 prose-pre:border prose-pre:border-white/10
        prose-code:text-primary prose-code:bg-neutral-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-li:text-neutral-300 prose-li:marker:text-primary prose-li:mb-4
        prose-hr:border-neutral-800 prose-hr:my-16
        prose-img:rounded-lg prose-img:shadow-2xl prose-img:my-16
        prose-figure:my-16
        prose-figcaption:text-center prose-figcaption:text-neutral-400 prose-figcaption:mt-4
        whitespace-pre-wrap
        [&>p:first-of-type]:text-2xl [&>p:first-of-type]:text-neutral-200 [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:mb-12
        [&>p:first-of-type]:font-judson
        [&>p:not(:first-of-type)]:text-lg [&>p:not(:first-of-type)]:md:text-xl"
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content)
      }}
    />
  );
};

export default BlogPostContent;