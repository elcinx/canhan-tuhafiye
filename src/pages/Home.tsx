import './Home.css';
import React from 'react';
import { FaSearch, FaYarn, FaCut, FaGift, FaStar, FaWhatsapp } from 'react-icons/fa';

const mainCategories = [
  { name: 'İplik', icon: <FaYarn size={32} color="#f94f9c" />, desc: 'Renkli örgü ve dikiş iplikleri' },
  { name: 'Aksesuar', icon: <FaGift size={32} color="#f94f9c" />, desc: 'Düğme, fermuar, süs ve daha fazlası' },
  { name: 'Düğme', icon: <FaStar size={32} color="#f94f9c" />, desc: 'Her çeşit düğme ve aksesuar' },
  { name: 'Kumaş', icon: <FaCut size={32} color="#f94f9c" />, desc: 'Pamuk, kadife ve özel kumaşlar' },
  { name: 'Dantel', icon: <FaStar size={32} color="#f94f9c" />, desc: 'Zarif dantel çeşitleri' },
];

const categoryChips = [
  'Tümü',
  'İplik',
  'Aksesuar',
  'Düğme',
  'Kumaş',
  'Dantel',
];

const Home: React.FC = () => {
  const [clickedIdx, setClickedIdx] = React.useState<number | null>(null);
  return (
    <div className="products-page" style={{minHeight:'100vh', background:'linear-gradient(135deg, #fff0f7 0%, #f9f9fc 100%)', paddingBottom:48}}>
      {/* HERO SECTION */}
      <section style={{width:'100%', background:'linear-gradient(90deg, #ffb6e6 0%, #ff7eb9 100%)', borderRadius: '0 0 36px 36px', boxShadow:'0 6px 24px #f94f9c22', marginBottom: 36, padding:'48px 0 36px 0'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <h1 style={{fontSize:'2.8rem', fontWeight:900, color:'#c2185b', letterSpacing:'.5px', marginBottom:10, textShadow:'0 2px 12px #fff5'}}>CANHAN TUHAFİYE</h1>
          <div style={{fontSize:'1.25rem', color:'#5c0a49', fontWeight:600, marginBottom:10, letterSpacing:'.1px'}}>Farkı Hissedin!</div>
          <div style={{fontSize:'1.07rem', color:'#c2185b', fontWeight:500, marginBottom:0}}>Pastel dokunuş, modern tuhafiye!</div>
        </div>
      </section>

      {/* FARKI SECTION */}
      <section className="ct-farki-section farki-anim" style={{margin:'0 auto 40px auto', maxWidth:1100, padding:'0 20px'}}>
        <div className="farki-slogan-bar" style={{background:'linear-gradient(90deg,#f94f9c 0%,#4d1558 100%)', borderRadius:14, color:'#fff', fontWeight:800, fontSize:'1.18rem', letterSpacing:'.5px', textAlign:'center', marginBottom:18, padding:'14px 0 10px 0', boxShadow:'0 2px 12px #f94f9c22'}}>Canhan Tuhafiye ile Güvenli, Uygun ve Modern Alışveriş!</div>
        <h2 style={{fontSize:'1.45rem', fontWeight:800, color:'#4d1558', marginBottom:24, letterSpacing:'.2px', textAlign:'center'}}>Canhan Tuhafiye Farkı</h2>
        <div className="farki-feature-row" style={{display:'flex', flexWrap:'wrap', gap:24, justifyContent:'center'}}>
          <div className="farki-card" style={{background:'#fff', borderRadius:18, boxShadow:'0 2px 8px #ffb6e644', padding:'30px 22px', minWidth:210, maxWidth:260, flex:'1 1 210px', textAlign:'center', transition:'transform .22s, box-shadow .22s'}}>
            <FaGift size={32} color="#f94f9c" style={{marginBottom:10}} />
            <div style={{fontWeight:700, color:'#c2185b', marginBottom:6}}>Bol Çeşit</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem'}}>Her ihtiyaca uygun binlerce ürün.</div>
          </div>
          <div className="farki-card" style={{background:'#fff', borderRadius:18, boxShadow:'0 2px 8px #ffb6e644', padding:'30px 22px', minWidth:210, maxWidth:260, flex:'1 1 210px', textAlign:'center', transition:'transform .22s, box-shadow .22s'}}>
            <FaStar size={32} color="#f94f9c" style={{marginBottom:10}} />
            <div style={{fontWeight:700, color:'#c2185b', marginBottom:6}}>Kaliteli Hizmet</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem'}}>Güleryüzlü destek, hızlı teslimat.</div>
          </div>
          <div className="farki-card" style={{background:'#fff', borderRadius:18, boxShadow:'0 2px 8px #ffb6e644', padding:'30px 22px', minWidth:210, maxWidth:260, flex:'1 1 210px', textAlign:'center', transition:'transform .22s, box-shadow .22s'}}>
            <FaCut size={32} color="#f94f9c" style={{marginBottom:10}} />
            <div style={{fontWeight:700, color:'#c2185b', marginBottom:6}}>Uygun Fiyat</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem'}}>Her bütçeye uygun fiyatlar.</div>
          </div>
          <div className="farki-card" style={{background:'#fff', borderRadius:18, boxShadow:'0 2px 8px #ffb6e644', padding:'30px 22px', minWidth:210, maxWidth:260, flex:'1 1 210px', textAlign:'center', transition:'transform .22s, box-shadow .22s'}}>
            <FaSearch size={32} color="#f94f9c" style={{marginBottom:10}} />
            <div style={{fontWeight:700, color:'#c2185b', marginBottom:6}}>Güvenli Alışveriş</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem'}}>Kolay ve güvenli online sipariş.</div>
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <div className="container" style={{maxWidth:1100, margin:'auto', padding:'0 20px'}}>
        {/* Category Chips */}
        <div className="mb-6" style={{marginBottom:24}}>
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
            {categoryChips.map((cat, idx) => (
              <button
                key={cat}
                className={`product-category-chip${idx===0 ? ' selected' : ''}`}
                style={{padding:'7px 20px', borderRadius:999, fontSize:'0.97rem', fontWeight:500, border:'1.5px solid var(--main-border)', background:'#fff', color:'var(--main-pink-dark)', marginRight:8, marginBottom:7, cursor:'pointer'}}
                disabled
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:24, marginTop:24}}>
          {mainCategories.map((cat, idx) => (
            <div
              key={cat.name}
              className={`h-full category-card-alt${clickedIdx === idx ? ' clicked' : ''}`}
              style={{background:'linear-gradient(135deg, #ffb6e6 60%, #ff7eb9 100%)', border:'2.5px solid #f8bbd0', borderRadius:22, boxShadow:'0 1.5px 8px #f94f9c13', padding:'28px 16px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:170, cursor:'pointer'}}
              onClick={() => {
                setClickedIdx(idx);
                setTimeout(() => setClickedIdx(null), 850);
              }}
            >
              <div style={{marginBottom:14, background:'#fff', borderRadius:'50%', boxShadow:'0 2px 8px #f94f9c22', padding:12, display:'flex', alignItems:'center', justifyContent:'center', width:48, height:48}}>{cat.icon}</div>
              <div style={{fontWeight:800, fontSize:'1.08rem', color:'#c2185b', marginBottom:7, letterSpacing:'.2px'}}>{cat.name}</div>
              <div style={{color:'#5c0a49', fontSize:'0.97rem', textAlign:'center'}}>{cat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* İndirimdeki Ürünler - Animasyonlu Alan */}
      <section className="discount-product-section" style={{maxWidth: 600, margin: '48px auto 0 auto', padding: '0 20px', position: 'relative', borderRadius: 22, boxShadow: '0 6px 32px #ffb6e655', background: 'linear-gradient(100deg, #fff0f7 60%, #ffeaea 100%)', overflow: 'hidden', animation: 'discountPop 1.1s cubic-bezier(.22,1.2,.36,1)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '28px 16px', position: 'relative'}}>
          <div style={{position:'relative', minWidth:120, minHeight:120, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <img src="/pamuklu_kumas.jpeg" alt="Pamuklu Dantel Kumaş" style={{width: 110, height: 110, borderRadius: 18, objectFit: 'cover', boxShadow: '0 2px 16px #f94f9c22'}} />
            <span className="discount-badge" style={{position:'absolute', top: -16, left: -16, background:'linear-gradient(90deg,#f43f5e 60%,#be123c 100%)', color:'#fff', fontWeight:800, fontSize:'.99rem', padding:'7px 18px', borderRadius:18, boxShadow:'0 2px 10px #be123c44', letterSpacing:'.5px', animation:'badgePulse 1.5s infinite alternate', display:'flex', alignItems:'center', gap:6}}>
  İNDİRİM
  <span className="discount-exclaim-anim" style={{display:'inline-flex', alignItems:'center'}}>
    {/* Exclamation icon: FaExclamation */}
    <svg viewBox="0 0 16 16" width="20" height="20" style={{fill:'#fff', filter:'drop-shadow(0 0 8px #f43f5e)', stroke:'#be123c', strokeWidth:1.5}}>
      <circle cx="8" cy="12.5" r="1.5" fill="#fff" stroke="#f43f5e" strokeWidth="2"/>
      <rect x="7.1" y="3" width="1.8" height="7" rx="0.9" fill="#fff" stroke="#f43f5e" strokeWidth="2"/>
    </svg>
  </span>
</span>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:800, color:'#be123c', fontSize:'1.18rem', marginBottom:6, letterSpacing:'.1px'}}>Pamuklu Dantel Kumaş</div>
            <div style={{marginBottom:10, color:'#5c0a49', fontSize:'0.99rem'}}>Nefes alabilen, yumuşak ve kaliteli pamuklu dantel kumaş. Sınırlı stok!</div>
            <div style={{display:'flex', alignItems:'baseline', gap: 12}}>
              <span style={{fontWeight:700, fontSize:'1.09rem', color:'#f43f5e'}}>
                79,90 TL
              </span>
              <span style={{textDecoration:'line-through', color:'#b91c1c', fontWeight:600, fontSize:'.97rem', opacity:.75}}>
                109,90 TL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section style={{maxWidth:1100, margin:'56px auto 0 auto', padding:'0 20px'}}>
        <h2 style={{fontSize:'1.45rem', fontWeight:800, color:'#f94f9c', marginBottom:24, letterSpacing:'.2px', textAlign:'center'}}>Müşteri Yorumları</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:24}}>
          <div style={{background:'#fff', borderRadius:16, boxShadow:'0 2px 8px #ffb6e622', padding:'28px 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{fontWeight:700, color:'#c2185b', fontSize:'1.08rem', marginBottom:8}}>Ayşe K.</div>
            <div style={{color:'#fbbf24', fontSize:'1.1rem', marginBottom:6}}>★★★★★</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem', textAlign:'center'}}>Ürünler çok kaliteli ve kargo çok hızlıydı. Güvenle alışveriş yapabilirsiniz!</div>
          </div>
          <div style={{background:'#fff', borderRadius:16, boxShadow:'0 2px 8px #ffb6e622', padding:'28px 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{fontWeight:700, color:'#c2185b', fontSize:'1.08rem', marginBottom:8}}>Mehmet D.</div>
            <div style={{color:'#fbbf24', fontSize:'1.1rem', marginBottom:6}}>★★★★★</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem', textAlign:'center'}}>Her şey çok güzeldi, özellikle müşteri hizmetleri çok ilgili. Tavsiye ederim.</div>
          </div>
          <div style={{background:'#fff', borderRadius:16, boxShadow:'0 2px 8px #ffb6e622', padding:'28px 20px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{fontWeight:700, color:'#c2185b', fontSize:'1.08rem', marginBottom:8}}>Zeynep T.</div>
            <div style={{color:'#fbbf24', fontSize:'1.1rem', marginBottom:6}}>★★★★★</div>
            <div style={{color:'#4d1558', fontSize:'0.98rem', textAlign:'center'}}>Fiyatlar çok uygun ve ürün çeşitliliği harika. Tekrar alışveriş yapacağım.</div>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/905555555555" className="whatsapp-fab" target="_blank" rel="noopener noreferrer" title="WhatsApp ile Hızlı İletişim" style={{position:'fixed', right:24, bottom:24, zIndex:50, background:'var(--main-pink-dark)', borderRadius:'50%', width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 12px #f94f9c44'}}>
        <FaWhatsapp style={{color:'#fff',fontSize:32}} />
      </a>
    </div>
  );
};

export default Home;