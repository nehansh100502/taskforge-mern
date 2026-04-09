import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiGithub, 
  FiTwitter, 
  FiLinkedin, 
  FiMail, 
  FiMapPin, 
  FiPhone,
  FiArrowUp,
  FiHeart,
  FiGlobe,
  FiClock,
  FiShield,
  FiLock,
  FiBriefcase,
  FiUsers,
  FiFolder,
  FiCalendar
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: 'Product',
      icon: FiBriefcase,
      links: [
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Integrations', path: '/integrations' },
        { name: 'Changelog', path: '/changelog' }
      ]
    },
    company: {
      title: 'Company',
      icon: FiUsers,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' }
      ]
    },
    resources: {
      title: 'Resources',
      icon: FiFolder,
      links: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Help Center', path: '/help' },
        { name: 'Community', path: '/community' },
        { name: 'Status', path: '/status' }
      ]
    },
    legal: {
      title: 'Legal',
      icon: FiShield,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'GDPR', path: '/gdpr' }
      ]
    }
  };

  const socialLinks = [
    { icon: FiGithub, name: 'GitHub', url: 'https://github.com', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: FiTwitter, name: 'Twitter', url: 'https://twitter.com', color: 'hover:text-blue-400' },
    { icon: FiLinkedin, name: 'LinkedIn', url: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { icon: FiMail, name: 'Email', url: 'mailto:hello@taskforge.com', color: 'hover:text-red-400' }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: FiUsers },
    { label: 'Projects Created', value: '50K+', icon: FiFolder },
    { label: 'Tasks Completed', value: '1M+', icon: FiCalendar },
    { label: 'Happy Teams', value: '5K+', icon: FiHeart }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="relative bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Animated Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 animate-gradient-x" />
      
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 bg-linear-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">TF</span>
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                TaskForge
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Transform your project management experience with TaskForge. 
              Streamline workflows, boost productivity, and deliver results faster.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiMapPin className="text-cyan-500 shrink-0" size={18} />
                <span className="text-sm">123 Innovation Drive, Tech Valley, SV 94043</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiPhone className="text-cyan-500 shrink-0" size={18} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiGlobe className="text-cyan-500 shrink-0" size={18} />
                <span className="text-sm">www.taskforge.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FiClock className="text-cyan-500 shrink-0" size={18} />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Sections */}
         
      
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© {currentYear} TaskForge. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <FiHeart className="text-red-500 animate-pulse" size={14} /> for better productivity
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-xs text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                Terms
              </Link>
              <Link to="/security" className="text-xs text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1">
                <FiLock size={12} />
                Security
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-linear-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-linear-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;