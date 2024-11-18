const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h4 className="font-judson text-xl mb-4">About Flavr</h4>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Curating and sharing our favorite dining spots from around the world. Every recommendation is personally tested and thoughtfully selected.
            </p>
          </div>
          <div>
            <h4 className="font-judson text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/destinations" className="text-neutral-400 hover:text-white transition-colors">
                  All Destinations
                </a>
              </li>
              <li>
                <a href="/#newsletter" className="text-neutral-400 hover:text-white transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-judson text-xl mb-4">Contact</h4>
            <p className="text-neutral-400 text-sm">
              For collaborations and inquiries:<br />
              <a href="mailto:hello@flavr.com" className="text-primary hover:text-primary/90 transition-colors">
                hello@flavr.com
              </a>
            </p>
          </div>
        </div>
        <div className="text-center text-sm text-neutral-500 pt-12 border-t border-white/10">
          © {currentYear} Flavr. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;