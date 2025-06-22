import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock 
} from 'react-icons/fa';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6 border-t-2 border-primary-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hakkımızda */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Canhan Tuhafiye</h3>
            <p className="text-neutral-300">
              En kaliteli tuhafiye ürünleri için doğru adres. Yılların deneyimiyle hizmetinizdeyiz.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors hover:scale-110 transform duration-300">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors hover:scale-110 transform duration-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors hover:scale-110 transform duration-300">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors hover:scale-110 transform duration-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/hakkimizda" className="text-neutral-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 transform group-hover:scale-150 transition-transform"></span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/urunler" className="text-neutral-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 transform group-hover:scale-150 transition-transform"></span>
                  Ürünlerimiz
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-neutral-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 transform group-hover:scale-150 transition-transform"></span>
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/sss" className="text-neutral-300 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 transform group-hover:scale-150 transition-transform"></span>
                  S.S.S
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim Bilgileri</h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-primary-600/20 p-2 rounded-lg mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaMapMarkerAlt className="text-primary-400 text-lg" />
                </div>
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  1234 Sokak No:1, Daire:2<br />
                  İzmir, Türkiye
                </span>
              </li>
              <li className="flex items-center group">
                <div className="bg-primary-600/20 p-2 rounded-lg mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaPhone className="text-primary-400 text-lg" />
                </div>
                <a href="tel:+905551234567" className="text-neutral-300 hover:text-white transition-colors">
                  +90 555 123 45 67
                </a>
              </li>
              <li className="flex items-center group">
                <div className="bg-primary-600/20 p-2 rounded-lg mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaEnvelope className="text-primary-400 text-lg" />
                </div>
                <a href="mailto:info@canhantuhafiye.com" className="text-neutral-300 hover:text-white transition-colors">
                  info@canhantuhafiye.com
                </a>
              </li>
              <li className="flex items-start group">
                <div className="bg-primary-600/20 p-2 rounded-lg mr-3 group-hover:bg-primary-500/30 transition-colors">
                  <FaClock className="text-primary-400 text-lg mt-0.5" />
                </div>
                <span className="text-neutral-300 group-hover:text-white transition-colors">
                  Pazartesi - Cumartesi: 09:00 - 18:00
                </span>
              </li>
            </ul>
          </div>

          {/* Bülten Aboneliği */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Bültenimize Abone Olun</h4>
            <p className="text-neutral-300 mb-4">
              Yeni ürünler, özel indirimler ve kampanyalardan ilk siz haberdar olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-neutral-500 transition-all duration-200"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                Abone Ol
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              Abone olarak <a href="#" className="text-primary-400 hover:underline">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
            </p>
          </div>

        </div>

        {/* Alt Kısım */}
        <div className="border-t border-neutral-800 mt-12 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Canhan Tuhafiye. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a 
              href="#" 
              className="text-neutral-400 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 hover:decoration-primary-500"
            >
              Gizlilik Politikası
            </a>
            <a 
              href="#" 
              className="text-neutral-400 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 hover:decoration-primary-500"
            >
              Kullanım Koşulları
            </a>
            <a 
              href="#" 
              className="text-neutral-400 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 hover:decoration-primary-500"
            >
              İade Politikası
            </a>
            <a 
              href="#" 
              className="text-neutral-400 hover:text-white transition-colors text-sm hover:underline hover:underline-offset-4 hover:decoration-primary-500"
            >
              KVKK Aydınlatma Metni
            </a>
          </div>
        </div>
        
        {/* Back to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 z-50"
          aria-label="Yukarı Çık"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
