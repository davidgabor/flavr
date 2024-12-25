interface BlogPostContentProps {
  content: string;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  // Function to process content and preserve formatting
  const formatContent = (content: string) => {
    // First, replace all double line breaks with a special marker
    const withPreservedParagraphs = content.replace(/\n\n+/g, '|||PARAGRAPH|||');
    
    // Then replace single line breaks with <br />
    const withLineBreaks = withPreservedParagraphs.replace(/\n/g, '<br />');
    
    // Finally, replace our paragraph markers with actual paragraphs
    return withLineBreaks
      .split('|||PARAGRAPH|||')
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('\n\n');
  };

  return (
    <div 
      className="prose prose-invert prose-lg max-w-none prose-p:text-neutral-300 prose-headings:font-judson prose-headings:text-white prose-strong:text-white prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:text-neutral-300 prose-pre:bg-neutral-800 prose-pre:text-neutral-300 prose-code:text-primary prose-li:text-neutral-300 prose-hr:border-neutral-800 prose-img:rounded-lg whitespace-pre-wrap"
      dangerouslySetInnerHTML={{ 
        __html: formatContent(content)
      }}
    />
  );
};

export default BlogPostContent;