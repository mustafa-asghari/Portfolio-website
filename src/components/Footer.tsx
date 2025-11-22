import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold mb-2">𝙈𝙪𝙨𝙩𝙖𝙛𝙖 𝘼𝙨𝙜𝙝𝙖𝙧𝙞</h3>
            <p className="text-muted-foreground text-sm font-light">𝙋𝙧𝙚𝙘𝙞𝙨𝙞𝙤𝙣 𝙚𝙣𝙜𝙞𝙣𝙚𝙚𝙧𝙞𝙣𝙜 𝙛𝙤𝙧 𝙩𝙝𝙚 𝙬𝙚𝙗</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-sm text-muted-foreground font-light">
            © {currentYear} 𝙈𝙪𝙨𝙩𝙖𝙛𝙖 𝘼𝙨𝙜𝙝𝙖𝙧𝙞
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
