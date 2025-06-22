          import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page home-page">
      <div className="container about-container" style={{marginTop:'48px'}}>

        <div className="about-content-box">
          <h2>Hakkımızda</h2>
          <p className="intro">30+ yıllık deneyim, güvenilirlik ve modern hizmetlerle Canhan Tuhafiye'de tuhafiye alışverişinin adresi!</p>
          <p>
            Canhan Tuhafiye, tuhafiye ve el işi sektöründe binlerce ürün çeşidiyle 30 yılı aşkın süredir kesintisiz hizmet sunmaktadır. Merkezimiz Samsun'da olup, Atakum ve Kale şubelerimizle müşterilerimize kaliteli ve çeşitli ürünler sunmanın gururunu yaşıyoruz. Güler yüzlü ekibimiz ve müşteri memnuniyetine verdiğimiz önemle, her ihtiyaca ve zevke uygun ürünleri özenle seçiyoruz.
          </p>
          <p>
            Misyonumuz; sizlere en üst düzeyde kaliteli ürün ve hizmet sunmak, her yaştan ve her zevkten el işi ve hobi severin beklentilerini karşılamaktır. Modern teknolojiyi yakından takip ederek, yeni ürünleri koleksiyonumuza sürekli ekliyoruz. WhatsApp ve telefon üzerinden kolayca sipariş verebilir, hızlı kargo avantajımızdan yararlanabilirsiniz.
          </p>
          <p>
            Canhan Tuhafiye olarak, güvenilirliğimiz ve çeşitliliğimizle sektörde öncü olmayı sürdürüyoruz. Bizi tercih ettiğiniz için teşekkür ederiz. Sizlere daha iyi hizmet sunabilmek için her zaman çalışmaya devam ediyoruz.
          </p>
        </div>
      </div>

      {/* Footer Şube Bilgileri */}
      <footer className="pink-footer">
        <div className="footer-copyright">
          &copy; 2025 Canhan Tuhafiye. Tüm hakları saklıdır.
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/905522610011" className="whatsapp-fab" target="_blank" rel="noopener noreferrer" title="WhatsApp ile Hızlı İletişim"
        style={{position:'fixed',right:30,bottom:30,zIndex:1000,backgroundColor:'#ff7eb9',borderRadius:'50%',width:60,height:60,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 6px 24px #f94f9c44'}}>
        <span style={{color:'#fff',fontSize:32}}>&#x1F4AC;</span>
        <span style={{color:'#fff',fontSize:32}}>💬</span>
      </a>
    </div>
  );
};

export default About;
