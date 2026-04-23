import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Music } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { FloralIcon } from './components/FloralIcon';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const weddingDate = new Date('2026-05-25T10:00:00');

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isOpen]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Terima kasih banyak atas konfirmasi Anda. Semoga kita bisa bertemu di hari bahagia kami!');
  };

  const galleryPhotos = [
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg'
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -100,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
            className="relative w-full overflow-hidden flex flex-col"
            style={{ minHeight: '100dvh' }}
          >
            {/* Full-screen background image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat cover-bg-animate"
              style={{ backgroundImage: 'url(background.png)' }}
            />

            {/* Gradient overlay — transparent top, dark bottom */}
            <div className="absolute inset-0 cover-overlay-animate"
              style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.85) 100%)'
              }}
            />

            {/* Content overlay — positioned at the bottom */}
            <div className="relative z-10 flex flex-col justify-end flex-1 pb-12 px-6 cover-content-animate">
              <div className="text-center space-y-5">
                {/* THE WEDDING OF */}
                <p className="tracking-[4px] text-sm"
                  style={{
                    fontFamily: 'Alice, serif',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '5px',
                  }}>
                  THE WEDDING OF
                </p>

                {/* Couple Names */}
                <div className="flex flex-col items-center">
                  <span className="block"
                    style={{
                      fontFamily: 'Great Vibes, cursive',
                      fontSize: 'clamp(2.8rem, 10vw, 4.5rem)',
                      color: '#FFFFFF',
                      lineHeight: '1.1',
                      textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                    }}>
                    Agung & Mita
                  </span>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }} />
                  <div className="h-px w-12" style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} />
                </div>

                {/* BUKA UNDANGAN Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full transition-all duration-300 active:scale-95"
                    style={{
                      fontFamily: 'Alice, serif',
                      fontSize: '0.85rem',
                      letterSpacing: '3px',
                      border: '1px solid rgba(255,255,255,0.5)',
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    {/* Envelope icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    BUKA UNDANGAN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: 1,
              scale: 1,
              transition: { 
                duration: 1, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }
            }}
            className="min-h-screen relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #F5EDE3 0%, #EDE4D8 20%, #E8DDD0 50%, #EDE4D8 80%, #F0E6DA 100%)' }}
          >
            {/* Soft warm ambient glows */}
            <div className="absolute inset-0">
              <div className="absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(184, 157, 120, 0.06)' }}></div>
              <div className="absolute top-96 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(168, 140, 107, 0.06)', animationDelay: '1s' }}></div>
              <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(160, 135, 100, 0.06)', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10">
              {/* Video Hero Section */}
              <section className="hero-video-section animate-reveal">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="video-bg"
                >
                  <source src="bg2.mp4" type="video/mp4" />
                </video>
                
                <div className="video-overlay">
                  <motion.div 
                    className="pill-frame"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.8, 
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1] 
                      }
                    }}
                  >
                    <div className="space-y-4">
                      <motion.p 
                        className="text-[#8B6F47] text-sm tracking-[4px]" 
                        style={{ fontFamily: 'Alice, serif' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      >
                        THE WEDDING OF
                      </motion.p>
                      <div className="flex flex-col items-center">
                        <motion.span 
                          className="text-[#4A3728] text-5xl" 
                          style={{ fontFamily: 'Cinzel Decorative, serif' }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                        >
                          Agung
                        </motion.span>
                        <motion.span 
                          className="text-[#8B6F47] text-3xl my-1" 
                          style={{ fontFamily: 'Alice, serif' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.6, duration: 0.8 }}
                        >
                          &
                        </motion.span>
                        <motion.span 
                          className="text-[#4A3728] text-5xl" 
                          style={{ fontFamily: 'Cinzel Decorative, serif' }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                        >
                          Mita
                        </motion.span>
                      </div>
                      <motion.div 
                        className="pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2, duration: 1 }}
                      >
                        <div className="h-px w-20 bg-[#8B6F47]/30 mx-auto mb-4" />
                        <p className="text-[#6B5339] text-sm tracking-[2px]" style={{ fontFamily: 'Alice, serif' }}>
                          SENIN, 25 MEI 2026
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <div className="max-w-2xl mx-auto px-4 py-12 space-y-16">
                {/* Quote Section */}
                <section className="animate-reveal delay-1">
                  <div 
                    className="overflow-hidden backdrop-blur-sm"
                    style={{ 
                      borderRadius: '80px 80px 40px 40px',
                      border: '1px solid rgba(139, 111, 71, 0.2)', 
                      backgroundColor: 'rgba(245, 237, 227, 0.5)' 
                    }}
                  >
                    {/* Top Content: Verse */}
                    <div className="p-8 pb-4 text-center space-y-6">
                      <div className="flex justify-center">
                        <FloralIcon />
                      </div>
                      <p className="font-medium" style={{ fontFamily: 'Alice, serif', color: '#8B6F47', fontSize: '0.75rem', letterSpacing: '3px' }}>
                        BISMILLAHIRRAHMANIRRAHIM
                      </p>
                      <div dir="rtl" className="text-2xl leading-[1.8]" style={{ fontFamily: 'Amiri, serif', color: '#4A3728' }}>
                        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
                      </div>
                      <p className="italic text-sm leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
                      </p>
                      <p className="font-medium" style={{ fontFamily: 'Alice, serif', letterSpacing: '2px', color: '#8B6F47', fontSize: '0.75rem' }}>
                        — QS. AR-RUM: 21 —
                      </p>
                    </div>

                    {/* Bottom Content: Couple Photo */}
                    <div className="px-6 pb-6">
                      <div className="w-full">
                        <img 
                          src="pasangan.jpeg" 
                          alt="Pasangan" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mempelai Section */}
                <section className="space-y-10 animate-reveal delay-2">
                  <div className="p-8 text-center animate-reveal">
                    <p className="text-base italic mb-4 font-medium" style={{ fontFamily: 'Lora, serif', color: '#8B6F47' }}>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                    <p className="px-6 text-sm leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
                    </p>
                  </div>

                  <div className="p-8 text-center backdrop-blur-sm animate-left opacity-0"
                    style={{ 
                      borderRadius: '80px 80px 40px 40px',
                      border: '1px solid rgba(139, 111, 71, 0.2)', 
                      backgroundColor: 'rgba(245, 237, 227, 0.5)' 
                    }}
                  >
                    <div className="flex justify-center mb-6">
                      <FloralIcon />
                    </div>
                    <div className="w-full max-w-[280px] mx-auto mb-6">
                      <img
                        src="cowo.png"
                        alt="Agung Sucipto"
                        className="w-full h-auto block"
                      />
                    </div>
                    <h2 className="text-4xl mb-3" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Agung Sucipto
                    </h2>
                    <div className="h-px w-16 bg-[#8B6F47]/30 mx-auto mb-4" />
                    <p className="px-4 text-sm font-medium leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Putra dari Alm. Bpk. Budi Santosa<br/>& Ibu Turiyah
                    </p>
                  </div>

                  <div className="text-center">
                    <span className="text-6xl" style={{ fontFamily: 'Great Vibes, cursive', color: '#8B6F47' }}>&</span>
                  </div>

                  <div className="p-8 text-center backdrop-blur-sm animate-right opacity-0"
                    style={{ 
                      borderRadius: '80px 80px 40px 40px',
                      border: '1px solid rgba(139, 111, 71, 0.2)', 
                      backgroundColor: 'rgba(245, 237, 227, 0.5)' 
                    }}
                  >
                    <div className="flex justify-center mb-6">
                      <FloralIcon />
                    </div>
                    <div className="w-full max-w-[280px] mx-auto mb-6">
                      <img
                        src="cewe.png"
                        alt="Mita Handya Waltami"
                        className="w-full h-auto block"
                      />
                    </div>
                    <h2 className="text-4xl mb-3" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Mita Handya Waltami
                    </h2>
                    <div className="h-px w-16 bg-[#8B6F47]/30 mx-auto mb-4" />
                    <p className="px-4 text-sm font-medium leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Putri dari Bpk. Mugi<br/>& Ibu Samiyah
                    </p>
                  </div>
                </section>



                {/* Gallery Section */}
                <section className="rounded-t-[80px] p-8 backdrop-blur-sm animate-reveal delay-4"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
                  <FloralIcon />
                  <h3 className="text-4xl mb-3 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                    Our Moments
                  </h3>
                  <p className="text-center mb-8 font-bold" style={{ fontFamily: 'Lora, serif', letterSpacing: '2px', color: '#8B6F47', fontSize: '0.85rem' }}>
                    PRE-WEDDING GALLERY
                  </p>
                  <Masonry columnsCount={2} gutter="12px">
                    {galleryPhotos.map((photo, idx) => (
                      <div key={idx} className="rounded-lg overflow-hidden hover-scale"
                        style={{ border: '1px solid rgba(139, 111, 71, 0.2)' }}>
                        <ImageWithFallback
                          src={photo}
                          alt={`Gallery photo ${idx + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </Masonry>
                </section>

                {/* Event & Countdown Section */}
                <section className="rounded-t-[80px] p-6 backdrop-blur-sm animate-reveal delay-5"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
                  <FloralIcon />
                  <div className="text-center mb-10">
                    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                      {[
                        { value: countdown.days, label: 'DAYS' },
                        { value: countdown.hours, label: 'HOURS' },
                        { value: countdown.minutes, label: 'MINS' },
                        { value: countdown.seconds, label: 'SECS' }
                      ].map((item, idx) => (
                        <div key={idx} className="rounded-2xl py-3 px-1 backdrop-blur-sm"
                          style={{ border: '1px solid rgba(139, 111, 71, 0.15)', backgroundColor: 'rgba(237, 228, 216, 0.6)' }}>
                          <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Alice, serif', color: '#4A3728' }}>
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-[10px] font-medium" style={{ fontFamily: 'Lora, serif', letterSpacing: '1px', color: '#8B6F47' }}>
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-10">
                    <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
                      <h3 className="text-xl mb-4 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', letterSpacing: '2px', color: '#4A3728' }}>
                        TASYAKURAN
                      </h3>
                      <div className="text-center space-y-1" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                        <p className="text-sm font-medium" style={{ letterSpacing: '1px' }}>JUMAT - MINGGU</p>
                        <p className="text-sm font-medium" style={{ letterSpacing: '1px' }}>22 - 24 MEI 2026</p>
                      </div>
                    </div>

                    <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
                      <h3 className="text-xl mb-4 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', letterSpacing: '2px', color: '#4A3728' }}>
                        AKAD NIKAH
                      </h3>
                      <div className="text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                        <p className="text-sm font-medium" style={{ letterSpacing: '1px' }}>SENIN, 25 MEI 2026</p>
                        <p className="text-sm">09:00 - 10:30 WIB</p>
                      </div>
                    </div>

                    <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
                      <h3 className="text-xl mb-4 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', letterSpacing: '2px', color: '#4A3728' }}>
                        RESEPSI
                      </h3>
                      <div className="text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                        <p className="text-sm font-medium" style={{ letterSpacing: '1px' }}>SENIN, 25 MEI 2026</p>
                        <p className="text-sm">11:00 - SELESAI</p>
                      </div>
                    </div>

                    <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
                       <div className="rounded-2xl overflow-hidden shadow-md mb-4" style={{ height: '300px' }}>
                        <iframe 
                          src="https://maps.google.com/maps?q=-7.351643,109.550218&hl=id&z=17&output=embed"
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                      <button className="w-full py-2 px-4 rounded-full transition-all flex items-center justify-center gap-2 hover:shadow-md"
                        onClick={() => window.open(`https://www.google.com/maps/place/7%C2%B021'05.9"S+109%C2%B033'00.8"E/@-7.351643,109.550218,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-7.351643!4d109.550218`, '_blank')}
                        style={{
                          fontFamily: 'Alice, serif',
                          letterSpacing: '2px',
                          border: '1px solid rgba(139, 111, 71, 0.35)',
                          color: '#6B5339',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <MapPin size={16} />
                        BUKA DI GOOGLE MAPS
                      </button>
                    </div>
                  </div>
                </section>

                {/* RSVP Section */}
                <section className="rounded-t-[80px] p-8 backdrop-blur-sm"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
                  <FloralIcon />
                  <h3 className="text-4xl mb-6 text-center" style={{ fontFamily: 'Alice, serif', color: '#4A3728' }}>
                    Konfirmasi Kehadiran
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block mb-2 font-bold" style={{ fontFamily: 'Alice, serif', letterSpacing: '1px', color: '#6B5339' }}>
                        NAMA
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full rounded-lg px-4 py-3 focus:outline-none text-sm"
                        placeholder="Masukkan nama Anda"
                        style={{
                          fontFamily: 'Lora, serif',
                          backgroundColor: 'rgba(139, 111, 71, 0.05)',
                          border: '1px solid rgba(139, 111, 71, 0.25)',
                          color: '#4A3728',
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold" style={{ fontFamily: 'Alice, serif', letterSpacing: '1px', color: '#6B5339' }}>
                        KEHADIRAN
                      </label>
                      <select
                        required
                        value={formData.kehadiran}
                        onChange={(e) => setFormData({ ...formData, kehadiran: e.target.value })}
                        className="w-full rounded-lg px-4 py-3 focus:outline-none text-sm"
                        style={{
                          fontFamily: 'Lora, serif',
                          backgroundColor: 'rgba(139, 111, 71, 0.05)',
                          border: '1px solid rgba(139, 111, 71, 0.25)',
                          color: '#4A3728',
                        }}
                      >
                        <option value="" style={{ backgroundColor: '#F5EDE3' }}>Pilih kehadiran</option>
                        <option value="hadir" style={{ backgroundColor: '#F5EDE3' }}>Hadir</option>
                        <option value="tidak-hadir" style={{ backgroundColor: '#F5EDE3' }}>Tidak Hadir</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full transition-all hover:shadow-lg font-bold"
                      style={{
                        fontFamily: 'Alice, serif',
                        letterSpacing: '2px',
                        border: '1px solid rgba(139, 111, 71, 0.35)',
                        color: '#6B5339',
                        backgroundColor: 'rgba(139, 111, 71, 0.08)',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.08)'}
                    >
                      KIRIM KONFIRMASI
                    </button>
                  </form>
                </section>

                {/* Wedding Gift Section */}
                <section className="rounded-t-[80px] p-8 backdrop-blur-sm animate-reveal"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
                  <FloralIcon />
                  <h3 className="text-4xl mb-4 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                    Wedding Gift
                  </h3>
                  <p className="text-center mb-10 text-sm leading-relaxed px-4" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                    Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
                  </p>

                  <div className="space-y-6">
                    {/* Bank 1 */}
                    <div className="p-6 rounded-2xl text-center relative overflow-hidden"
                      style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                      <div className="text-lg font-bold mb-2" style={{ fontFamily: 'Alice, serif', color: '#4A3728', letterSpacing: '2px' }}>BCA</div>
                      <div className="text-xl mb-1 font-medium" style={{ fontFamily: 'Alice, serif', color: '#8B6F47' }}>1234567890</div>
                      <div className="text-sm mb-4" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>a.n Agung Sucipto</div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('1234567890');
                          alert('Nomor rekening BCA berhasil disalin!');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all"
                        style={{
                          border: '1px solid rgba(139, 111, 71, 0.4)',
                          color: '#8B6F47',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        SALIN REKENING
                      </button>
                    </div>

                    {/* Bank 2 */}
                    <div className="p-6 rounded-2xl text-center relative overflow-hidden"
                      style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                      <div className="text-lg font-bold mb-2" style={{ fontFamily: 'Alice, serif', color: '#4A3728', letterSpacing: '2px' }}>BRI</div>
                      <div className="text-xl mb-1 font-medium" style={{ fontFamily: 'Alice, serif', color: '#8B6F47' }}>0987654321</div>
                      <div className="text-sm mb-4" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>a.n Mita Handya Waltami</div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('0987654321');
                          alert('Nomor rekening BRI berhasil disalin!');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all"
                        style={{
                          border: '1px solid rgba(139, 111, 71, 0.4)',
                          color: '#8B6F47',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        SALIN REKENING
                      </button>
                    </div>
                  </div>
                </section>

                {/* Footer / Closing */}
                <section className="rounded-t-[80px] p-8 text-center backdrop-blur-sm"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
                  <FloralIcon />
                  <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                    Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
                  </p>
                  <p className="text-xl mb-2 font-medium" style={{ fontFamily: 'Alice, serif', color: '#4A3728' }}>
                    Terima Kasih
                  </p>
                  <p className="text-xs italic mb-8 font-medium" style={{ fontFamily: 'Lora, serif', color: '#8B6F47' }}>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
                  <div className="text-5xl" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                    A & M
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player / Rotating Disc */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className={`relative w-16 h-16 rounded-full overflow-hidden shadow-2xl transition-transform active:scale-95 ${
            isPlaying ? 'animate-spin-slow' : 'paused'
          }`}
        >
          <img
            src="pasangan.jpeg"
            alt="Music Disc"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(139, 111, 71, 0.2)', border: '1px solid rgba(139, 111, 71, 0.4)' }} />
          </div>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(74, 55, 40, 0.4)' }}>
              <Music className="text-white/80" size={20} />
            </div>
          )}
        </button>
        <audio ref={audioRef} src="lagu.mp3" loop />
      </div>
    </>
  );
}