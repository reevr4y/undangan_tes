import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { MapPin, Music, Home, Users, Image as ImageIcon, Gift, MessageSquareQuote } from 'lucide-react';
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
  
  // Overall scroll progress for global parallax
  const { scrollYProgress: globalScroll } = useScroll();
  const backgroundY = useTransform(globalScroll, [0, 1], ["0%", "20%"]);

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

  const [wishes, setWishes] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingWishes, setIsLoadingWishes] = useState(true);

  // URL dari Google Apps Script kamu
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwh74YsYUtXrMNParzCS3m-4vvCaou-5rWA1gu4def-7F5UhN6yhGxcJSG9ODrnqUPdzQ/exec';

  const fetchWishes = async () => {
    try {
      setIsLoadingWishes(true);
      // Tambahkan timestamp agar browser tidak mengambil data lama dari cache
      const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      console.log('Fetched wishes:', data);
      setWishes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setIsLoadingWishes(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWishes();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Menggunakan GET dengan query parameters agar terhindar dari masalah CORS
      const params = new URLSearchParams({
        nama: formData.nama,
        kehadiran: formData.kehadiran,
        ucapan: formData.ucapan
      });

      const response = await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors' // Gunakan no-cors untuk bypass CORS preflight
      });

      // Karena menggunakan no-cors, kita tidak bisa baca response.ok
      // Tapi data biasanya tetap masuk ke Google Sheets
      alert('Terima kasih banyak atas konfirmasi dan doanya!');
      setFormData({ nama: '', kehadiran: '', ucapan: '' });
      
      // Tunggu sebentar sebelum refresh list agar Google Sheet sempat memproses
      setTimeout(() => fetchWishes(), 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terima kasih! Doa Anda telah kami terima.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [formData, setFormData] = useState({
    nama: '',
    kehadiran: '',
    ucapan: ''
  });

  const storyRef = useRef(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start 70%", "end 50%"]
  });
  const lineScaleY = useSpring(storyProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const galleryPhotos = [
    '1.webp',
    '2.webp',
    '3.webp',
    '4.webp',
    '5.webp',
    '6.webp'
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
              style={{ backgroundImage: 'url(background.webp)' }}
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
                      fontFamily: 'Cinzel Decorative, serif',
                      fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                      color: '#FFFFFF',
                      lineHeight: '1.2',
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
                    className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full transition-all duration-300 active:scale-95 shadow-lg"
                    style={{
                      fontFamily: 'Alice, serif',
                      fontSize: '0.85rem',
                      letterSpacing: '3px',
                      border: '1px solid rgba(255,255,255,0.5)',
                      color: '#FFFFFF',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
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
              {/* Soft warm ambient glows with parallax */}
              <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: backgroundY }}>
                <div className="absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(184, 157, 120, 0.06)' }}></div>
                <div className="absolute top-96 right-10 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(168, 140, 107, 0.06)' }}></div>
                <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(160, 135, 100, 0.06)' }}></div>
              </motion.div>

            <div className="relative z-10">
              {/* Video Hero Section */}
              <motion.section 
                id="home"
                className="hero-video-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 1 }}
              >
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
                        <p className="text-[#8B6F47] text-[10px] mt-2 tracking-[1px] font-medium" style={{ fontFamily: 'Lora, serif' }}>
                          Jl Raya Kecepit, Siluwing RT04/03,<br/>Kec Punggelan, Kab Banjarnegara
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
                {/* Quote Section */}
                <motion.section 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div 
                    className="overflow-hidden glass-effect"
                    style={{ borderRadius: '60px 60px 30px 30px' }}
                  >
                    {/* Top Content: Verse */}
                    <div className="p-6 md:p-8 pb-4 text-center space-y-6">
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
                          src="pasangan1.png" 
                          alt="Pasangan" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Mempelai Section */}
                <motion.section 
                  id="couple"
                  className="space-y-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.4 }
                    }
                  }}
                >
                  <motion.div 
                    className="p-8 text-center"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                  >
                    <p className="text-base italic mb-4 font-medium" style={{ fontFamily: 'Lora, serif', color: '#8B6F47' }}>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
                    <p className="px-6 text-sm leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
                    </p>
                  </motion.div>


                  <motion.div 
                    className="p-6 md:p-8 text-center glass-effect"
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 30 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
                      }
                    }}
                    style={{ borderRadius: '60px 60px 30px 30px' }}
                  >
                    <div className="flex justify-center mb-6">
                      <FloralIcon />
                    </div>
                    <div className="w-full max-w-[280px] mx-auto mb-6">
                      <img
                        src="cowo.png"
                        alt="Agung Sucipto"
                        className="w-full h-auto block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h2 className="text-4xl mb-3" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Agung Sucito
                    </h2>
                    <div className="h-px w-16 bg-[#8B6F47]/30 mx-auto mb-4" />
                    <p className="px-4 text-sm font-medium leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Putra dari Bpk. Budi Santosa (Alm)<br/>& Ibu Turiyah
                    </p>
                  </motion.div>

                  <motion.div 
                    className="text-center"
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                  >
                    <span className="text-6xl" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#8B6F47' }}>&</span>
                  </motion.div>

                  <motion.div 
                    className="p-6 md:p-8 text-center glass-effect"
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, y: 30 },
                      visible: { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
                      }
                    }}
                    style={{ borderRadius: '60px 60px 30px 30px' }}
                  >
                    <div className="flex justify-center mb-6">
                      <FloralIcon />
                    </div>
                    <div className="w-full max-w-[280px] mx-auto mb-6">
                      <img
                        src="cewe.png"
                        alt="Mita Handya Waltami"
                        className="w-full h-auto block"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h2 className="text-4xl mb-3" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Mita Handya Waltami
                    </h2>
                    <div className="h-px w-16 bg-[#8B6F47]/30 mx-auto mb-4" />
                    <p className="px-4 text-sm font-medium leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Putri dari Bpk. Ugi Prasetyo<br/>& Ibu Samiyah
                    </p>
                  </motion.div>
                </motion.section>



                {/* Our Story Section */}
                <motion.section 
                  id="story"
                  ref={storyRef}
                  className="rounded-[40px] md:rounded-t-[80px] p-6 md:p-8 glass-effect"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-8">
                    <FloralIcon />
                    <h3 className="text-4xl" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Our Story
                    </h3>
                  </div>
                  
                    <div className="space-y-12 relative">
                      {/* Garis Dasar (Background) */}
                      <div className="absolute left-[11px] top-3 bottom-6 w-px bg-[#8B6F47]/10" />
                      
                      {/* Garis Animasi (Progress) */}
                      <motion.div 
                        className="absolute left-[11px] top-3 bottom-6 w-px bg-[#8B6F47]/60"
                        style={{ scaleY: lineScaleY, originY: 0 }}
                      />
                    
                    {[
                      {
                        title: "Awal Kenal",
                        date: "November 2023",
                        content: "Awal kenal sama Agung itu bulan November 2023 di kenalin sama sahabat aku. Kita sepakat mau serius tapi kita LDR Jakarta sama Banjarnegara, jadi jarang ketemu. Sampai akhirnya tahun 2025 Agung memutuskan kerja di Banjarnegara agar bisa lebih dekat."
                      },
                      {
                        title: "Tunangan",
                        date: "8 Februari 2026",
                        content: "Kita memutuskan melangkah ke jenjang yang lebih serius pada tanggal 8 Februari 2026. Pertemuan kedua keluarga besar dilaksanakan dan alhamdulillah semuanya berjalan dengan lancar."
                      },
                      {
                        title: "Menikah",
                        date: "25 Mei 2026",
                        content: "Alhamdulillah waktu yang kita nanti-nantikan tiba. Semoga kita menjadi keluarga yang sakinah mawaddah warahmah sampai tua nantinya bersama keluarga kecil kita. Mohon doanya teman-teman semua agar acaranya berjalan dengan lancar, Amin."
                      }
                    ].map((item, idx) => (
                        <motion.div 
                          key={idx}
                          className="relative pl-10"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: false, amount: 0.2, margin: "-50px" }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        >
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full glass-effect flex items-center justify-center border border-[#8B6F47]/30">
                          <motion.div 
                            className="w-2 h-2 rounded-full bg-[#8B6F47]"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: 0.4 + (idx * 0.2), type: "spring" }}
                          />
                        </div>
                        <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'Alice, serif', color: '#4A3728' }}>{item.title}</h4>
                        <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ fontFamily: 'Lora, serif', color: '#8B6F47' }}>{item.date}</p>
                        <p className="text-sm leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>{item.content}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>

                {/* Gallery Section */}
                <motion.section 
                  id="gallery"
                  className="rounded-[40px] md:rounded-t-[80px] p-6 md:p-8 glass-effect"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-8">
                    <FloralIcon />
                    <h3 className="text-4xl mb-2" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Our Moments
                    </h3>
                    <p className="font-bold" style={{ fontFamily: 'Lora, serif', letterSpacing: '2px', color: '#8B6F47', fontSize: '0.85rem' }}>
                      PRE-WEDDING GALLERY
                    </p>
                  </div>
                  <Masonry columnsCount={2} gutter="12px">
                    {galleryPhotos.map((photo, idx) => (
                      <motion.div 
                        key={idx} 
                        className="rounded-lg overflow-hidden hover-scale shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: (idx % 2) * 0.2 }}
                        style={{ border: '1px solid rgba(139, 111, 71, 0.2)' }}
                      >
                        <ImageWithFallback
                          src={photo}
                          alt={`Gallery photo ${idx + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </motion.div>
                    ))}
                  </Masonry>
                </motion.section>

                {/* Event & Countdown Section */}
                <motion.section 
                  id="event"
                  className="rounded-[40px] md:rounded-t-[80px] p-6 glass-effect"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FloralIcon />
                  <div className="text-center mb-10">
                    <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
                      {[
                        { value: countdown.days, label: 'DAYS' },
                        { value: countdown.hours, label: 'HOURS' },
                        { value: countdown.minutes, label: 'MINS' },
                        { value: countdown.seconds, label: 'SECS' }
                      ].map((item, idx) => (
                        <div key={idx} className="rounded-2xl py-3 px-1 glass-effect">
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

                  <div className="space-y-8">
                    {[
                      { title: 'TASYAKURAN', details: ['SABTU - MINGGU', '23 - 24 MEI 2026'], font: 'Lora' },
                      { title: 'AKAD NIKAH', details: ['SENIN, 25 MEI 2026', '09:00 - 10:30 WIB'], font: 'Playfair Display' },
                      { title: 'RESEPSI', details: ['SENIN, 25 MEI 2026', '11:00 - SELESAI'], font: 'Playfair Display' }
                    ].map((event, idx) => (
                      <motion.div 
                        key={idx}
                        className="pt-6" 
                        style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: idx * 0.2 }}
                      >
                        <h3 className="text-xl mb-4 text-center" style={{ fontFamily: 'Cinzel Decorative, serif', letterSpacing: '2px', color: '#4A3728' }}>
                          {event.title}
                        </h3>
                        <div className="text-center space-y-1" style={{ fontFamily: `${event.font}, serif`, color: '#6B5339' }}>
                          {event.details.map((detail, dIdx) => (
                            <p key={dIdx} className="text-sm font-medium" style={{ letterSpacing: '1px' }}>{detail}</p>
                          ))}
                        </div>
                      </motion.div>
                    ))}

                    <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
                       <p className="text-center text-sm mb-6 font-medium leading-relaxed" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                         Jl Raya Kecepit, Siluwing RT04/03,<br/>Kec Punggelan, Kab Banjarnegara
                       </p>
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
                </motion.section>


                {/* Tanda Kasih Section */}
                <motion.section 
                  id="gift"
                  className="rounded-[40px] md:rounded-t-[80px] p-6 md:p-8 glass-effect"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="text-center mb-4">
                    <FloralIcon />
                    <h3 className="text-4xl mb-4" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Wedding Gift
                    </h3>
                  </div>
                  <motion.p 
                    className="text-center mb-10 text-sm leading-relaxed px-4" 
                    style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
                  </motion.p>

                  <div className="space-y-6">
                    {/* ATM Card Design */}
                    <motion.div 
                      className="relative w-full aspect-[1.6/1] rounded-xl overflow-hidden p-4 md:p-6 shadow-xl"
                      style={{ 
                        background: 'linear-gradient(135deg, #4A3728 0%, #2D1F16 100%)',
                        border: '1px solid rgba(139, 111, 71, 0.3)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B6F47]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8B6F47]/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
                      
                      <div className="relative h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div className="text-white/40 text-xs tracking-widest font-bold" style={{ fontFamily: 'Alice, serif' }}>WEDDING GIFT</div>
                          <div className="text-white text-xl italic font-serif tracking-tighter">BRI</div>
                        </div>

                        {/* Card Chip */}
                        <div className="w-10 h-7 rounded bg-gradient-to-br from-[#D4AF37] to-[#8B6F47] opacity-60 mb-2"></div>

                        <div className="space-y-1">
                          <div className="text-white text-2xl tracking-[4px] font-mono" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            6622 0103 2653 0
                          </div>
                          <div className="flex justify-between items-end pt-2">
                            <div>
                              <div className="text-white/40 text-[8px] uppercase tracking-widest mb-1" style={{ fontFamily: 'Lora, serif' }}>Account Holder</div>
                              <div className="text-white text-sm tracking-wider font-medium" style={{ fontFamily: 'Alice, serif' }}>MITA HANDYA WALTAMI</div>
                            </div>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText('6622010326530');
                                alert('Nomor rekening BRI berhasil disalin!');
                              }}
                              className="px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all bg-white/10 border border-white/20 text-white hover:bg-white/20"
                            >
                              SALIN
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.section>

                {/* RSVP & Wishes Section */}
                <motion.section 
                  id="rsvp"
                  className="rounded-[60px] p-8 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ 
                    background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.7) 0%, rgba(245, 237, 227, 0.6) 100%)',
                    boxShadow: '0 10px 40px -10px rgba(74, 55, 40, 0.1)',
                    border: '1px solid rgba(139, 111, 71, 0.15)'
                  }}
                >
                  {/* Decorative corner element */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10 rotate-12">
                    <FloralIcon />
                  </div>

                  <div className="text-center mb-8 relative z-10">
                    <FloralIcon />
                    <h3 className="text-4xl mb-2" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      RSVP
                    </h3>
                    <p className="text-xs uppercase tracking-[3px] font-bold" style={{ fontFamily: 'Lora, serif', color: '#8B6F47' }}>
                      & DOA RESTU
                    </p>
                    <p className="mt-4 text-[11px] italic" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                      Kehadiran Bapak/Ibu/Saudara/i adalah kado terindah bagi kami
                    </p>
                  </div>

                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-5 relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
                    }}
                  >
                    <motion.div variants={itemVariants}>
                      <label className="block mb-2 text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: 'Alice, serif', color: '#6B5339' }}>
                        Nama Bapak/Ibu/Saudara/i
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        className="w-full rounded-xl px-4 py-3.5 focus:outline-none text-sm transition-all shadow-sm"
                        placeholder="Tuliskan nama Anda di sini"
                        style={{
                          fontFamily: 'Lora, serif',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(139, 111, 71, 0.2)',
                          color: '#4A3728',
                        }}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block mb-2 text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: 'Alice, serif', color: '#6B5339' }}>
                        Konfirmasi Kehadiran
                      </label>
                      <select
                        required
                        value={formData.kehadiran}
                        onChange={(e) => setFormData({ ...formData, kehadiran: e.target.value })}
                        className="w-full rounded-xl px-4 py-3.5 focus:outline-none text-sm transition-all shadow-sm"
                        style={{
                          fontFamily: 'Lora, serif',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(139, 111, 71, 0.2)',
                          color: '#4A3728',
                        }}
                      >
                        <option value="" style={{ backgroundColor: '#F5EDE3' }}>Konfirmasi kehadiran Anda</option>
                        <option value="hadir" style={{ backgroundColor: '#F5EDE3' }}>Insya Allah, Dapat Hadir</option>
                        <option value="tidak-hadir" style={{ backgroundColor: '#F5EDE3' }}>Mohon Maaf, Belum Bisa Hadir</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block mb-2 text-[10px] font-bold tracking-widest uppercase" style={{ fontFamily: 'Alice, serif', color: '#6B5339' }}>
                        Pesan & Doa Restu
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.ucapan}
                        onChange={(e) => setFormData({ ...formData, ucapan: e.target.value })}
                        className="w-full rounded-xl px-4 py-3.5 focus:outline-none text-sm transition-all shadow-sm resize-none"
                        placeholder="Berikan pesan atau doa restu Bapak/Ibu/Saudara/i..."
                        style={{
                          fontFamily: 'Lora, serif',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          border: '1px solid rgba(139, 111, 71, 0.2)',
                          color: '#4A3728',
                        }}
                      />
                    </motion.div>

                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full transition-all font-bold mt-4 shadow-md disabled:opacity-50"
                      style={{
                        fontFamily: 'Cinzel Decorative, serif',
                        fontSize: '0.9rem',
                        letterSpacing: '2px',
                        background: 'linear-gradient(135deg, #8B6F47 0%, #6B5339 100%)',
                        color: '#FFFFFF',
                      }}
                    >
                      {isSubmitting ? 'MENGIRIM...' : 'KIRIM DOA & RESTU'}
                    </motion.button>
                  </motion.form>

                  {/* Wishes Wall */}
                  <div className="mt-12 space-y-6">
                    <div className="h-px w-full bg-[#8B6F47]/20" />
                    <h4 className="text-center text-xl" style={{ fontFamily: 'Cinzel Decorative, serif', color: '#4A3728' }}>
                      Ucapan & Doa
                    </h4>
                    
                    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {isLoadingWishes ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B6F47]" />
                          <p className="mt-2 text-sm italic" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>Memuat ucapan...</p>
                        </div>
                      ) : wishes.length === 0 ? (
                        <p className="text-center text-sm italic py-8" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                          Belum ada ucapan. Jadilah yang pertama memberikan doa!
                        </p>
                      ) : (
                        wishes.map((wish, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-4 rounded-2xl bg-white/40 border border-[#8B6F47]/10"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-bold text-sm" style={{ fontFamily: 'Alice, serif', color: '#4A3728' }}>{wish.nama}</h5>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#8B6F47]/10 text-[#8B6F47] uppercase font-bold tracking-tighter">
                                {wish.kehadiran === 'hadir' ? 'Hadir' : 'Berhalangan'}
                              </span>
                            </div>
                            <p className="text-xs leading-relaxed italic" style={{ fontFamily: 'Lora, serif', color: '#6B5339' }}>
                              "{wish.ucapan}"
                            </p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.section>

                {/* Footer / Closing */}
                <motion.section 
                  className="rounded-t-[80px] p-8 text-center glass-effect"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
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
                </motion.section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: 100, x: '-50%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-[400px]"
          >
            <div 
              className="flex items-center justify-around p-1.5 rounded-full backdrop-blur-xl shadow-2xl border border-white/20 px-3"
              style={{ backgroundColor: 'rgba(74, 55, 40, 0.9)', paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
            >
              {[
                { id: 'home', icon: Home, label: 'Home' },
                { id: 'couple', icon: Users, label: 'Mempelai' },
                { id: 'gallery', icon: ImageIcon, label: 'Momen' },
                { id: 'event', icon: MapPin, label: 'Acara' },
                { id: 'gift', icon: Gift, label: 'Kado' },
                { id: 'rsvp', icon: MessageSquareQuote, label: 'Doa' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-90"
                >
                  <item.icon size={18} className="text-white/90" />
                  <span className="text-[7px] mt-0.5 text-white/50 font-medium uppercase tracking-tight" style={{ fontSize: '7px' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Music Player / Rotating Disc (Restored) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-6 right-6 z-50"
          >
            <button
              onClick={toggleMusic}
              className={`relative w-14 h-14 rounded-full overflow-hidden shadow-2xl transition-all active:scale-90 border-2 border-white/30 ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
            >
              <img
                src="pasangan1.png"
                alt="Music Disc"
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EDE4D8] border border-[#8B6F47]/30 shadow-inner" />
              </div>
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                  <Music className="text-white/80" size={16} />
                </div>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="lagu.mp3" loop />
    </>
  );
}