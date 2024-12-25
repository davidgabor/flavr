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
        prose-p:text-neutral-300 prose-p:text-lg md:text-xl prose-p:leading-relaxed
        prose-headings:font-judson prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6
        prose-h1:text-4xl md:prose-h1:text-5xl
        prose-h2:text-3xl md:prose-h2:text-4xl
        prose-h3:text-2xl md:prose-h3:text-3xl
        prose-h4:text-xl md:prose-h4:text-2xl
        prose-strong:text-white
        prose-a:text-primary hover:prose-a:text-primary/80 prose-a:transition-colors
        prose-blockquote:border-primary prose-blockquote:text-neutral-300 prose-blockquote:italic
        prose-pre:bg-neutral-800 prose-pre:text-neutral-300
        prose-code:text-primary
        prose-li:text-neutral-300 prose-li:marker:text-primary
        prose-hr:border-neutral-800 prose-hr:my-12
        prose-img:rounded-lg prose-img:shadow-xl
        whitespace-pre-wrap
        [&>p:first-of-type]:text-2xl [&>p:first-of-type]:text-neutral-200 [&>p:first-of-type]:leading-relaxed"
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content)
      }}
    />
  );
};

export default BlogPostContent;