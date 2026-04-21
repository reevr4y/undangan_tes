import { useState, useEffect, useRef } from 'react';
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
    'g1.jpeg',
    'g2.jpg',
    'g3.jpg',
    'g4.jpeg',
    'g5.jpeg',
    'g6.jpeg'
  ];

  if (!isOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #F5EDE3 0%, #EDE4D8 30%, #E8DDD0 60%, #F0E6DA 100%)' }}>
        {/* Soft warm ambient glows */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(184, 157, 120, 0.08)' }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(168, 140, 107, 0.08)' }}></div>
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(bg.jpeg)',
            opacity: 0.15
          }}
        />

        <div className="relative z-10 max-w-md w-full">
          <div className="rounded-t-[100px] p-8 text-center backdrop-blur-sm"
            style={{ border: '1px solid rgba(139, 111, 71, 0.25)', backgroundColor: 'rgba(245, 237, 227, 0.6)' }}>
            <div className="space-y-6">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden mb-6"
                style={{ border: '2px solid rgba(139, 111, 71, 0.35)' }}>
                <img
                  src="bg.jpeg"
                  alt="Agung & Mita"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive', color: '#6B5339' }}>
                The Wedding of
              </h1>
              <div className="text-7xl mb-8" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
                Agung & Mita
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="px-8 py-3 rounded-full transition-all hover:shadow-lg"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '2px',
                  border: '1px solid rgba(139, 111, 71, 0.4)',
                  color: '#6B5339',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(139, 111, 71, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                BUKA UNDANGAN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5EDE3 0%, #EDE4D8 20%, #E8DDD0 50%, #EDE4D8 80%, #F0E6DA 100%)' }}>
      {/* Soft warm ambient glows */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(184, 157, 120, 0.06)' }}></div>
        <div className="absolute top-96 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(168, 140, 107, 0.06)', animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ background: 'rgba(160, 135, 100, 0.06)', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 space-y-16">
        {/* Quote Section */}
        <section className="rounded-t-[80px] p-8 text-center backdrop-blur-sm"
          style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
          <FloralIcon />
          <p className="mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#8B6F47', fontSize: '0.9rem', letterSpacing: '1px' }}>
            BISMILLAHIRRAHMANIRRAHIM
          </p>
          <p className="italic text-lg leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <p className="mt-4" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47' }}>
            — QS. AR-RUM: 21
          </p>
        </section>

        {/* Mempelai Section */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-sm italic mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#8B6F47' }}>Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
            <p className="px-6 text-xs leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
            </p>
          </div>

          <div className="rounded-t-[80px] p-8 text-center backdrop-blur-sm"
            style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
            <FloralIcon />
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden"
              style={{ border: '2px solid rgba(139, 111, 71, 0.3)' }}>
              <img
                src="cowo.jpeg"
                alt="Agung Sucipto"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
              Agung Sucipto
            </h2>
            <p style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47' }}>
              PUTRA DARI
            </p>
            <p className="mt-2 px-4 text-xs" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
              Putra dari Alm. Bpk. Budi Santosa & Ibu Turiyah
            </p>
          </div>

          <div className="text-center">
            <span className="text-6xl" style={{ fontFamily: 'Great Vibes, cursive', color: '#8B6F47' }}>&</span>
          </div>

          <div className="rounded-t-[80px] p-8 text-center backdrop-blur-sm"
            style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
            <FloralIcon />
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden"
              style={{ border: '2px solid rgba(139, 111, 71, 0.3)' }}>
              <img
                src="cewe.jpeg"
                alt="Mita Handya Waltami"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
              Mita Handya Waltami
            </h2>
            <p style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47' }}>
              PUTRI DARI
            </p>
            <p className="mt-2 px-4 text-xs" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
              Putri dari Bpk. Mugi & Ibu Samiyah
            </p>
          </div>
        </section>

        {/* Perjalanan Asmara / Love Story Timeline */}
        <section className="rounded-t-[80px] p-8 backdrop-blur-sm"
          style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
          <FloralIcon />
          <h3 className="text-5xl mb-2 text-center" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
            Perjalanan Asmara
          </h3>
          <p className="text-center mb-10" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47', fontSize: '0.85rem' }}>
            OUR LOVE STORY
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: 'rgba(139, 111, 71, 0.2)' }} />

            {/* Stories Mapping */}
            {[
              {
                title: "Awal Bertemu",
                image: "z_pkl.jpeg",
                text: "Saat PKL di perusahaan yang sama, awalnya kami berada di divisi yang berbeda. Namun karena suatu alasan, kami dipindahkan ke satu divisi yang sama — dan di sinilah perjalanan kami dimulai. Awal yang sederhana, tapi penuh makna."
              },
              {
                title: "Mulai Tertarik",
                image: "z_awal.jpg",
                text: "Kami dapat tugas untuk mengurus dokumen di bank. Ria bertugas menunjukkan arah menggunakan Google Maps — tapi ternyata diam-diam dia malah foto-foto pakai HP-ku. Sejak saat itu, ada perasaan yang mulai tumbuh tanpa disadari."
              },
              {
                title: "First Date",
                image: "z_first.jpg",
                text: "Karena sering ditugaskan keluar bersama, kami semakin dekat. Suatu hari ada film bagus, dan kami memutuskan untuk nonton bareng — alibinya sih cuma teman, tapi ini sebenarnya first date kami. Pertama kalinya pergi bersama bukan karena tugas. 💛"
              },
              {
                title: "Menjalin Komitmen",
                image: "z_jadian.jpg",
                text: "Setelah perjalanan waktu dan kesamaan rasa, akhirnya kami memutuskan untuk berkomitmen satu sama lain dan melangkah bersama menuju masa depan yang lebih indah. 💍"
              }
            ].map((story, idx) => (
              <div key={idx} className="relative mb-16 flex items-center justify-between w-full">
                {/* Dot on Line */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                  style={{ backgroundColor: '#8B6F47', border: '3px solid #F5EDE3' }} />

                {/* Left Side Content */}
                <div className="w-[45%] pr-2">
                  {idx % 2 === 0 ? (
                    /* Photo Left */
                    <div className="rounded-2xl overflow-hidden shadow-sm"
                      style={{ border: '1px solid rgba(139, 111, 71, 0.15)' }}>
                      <img src={story.image} alt={story.title} className="w-full h-auto block" />
                    </div>
                  ) : (
                    /* Text Left */
                    <div className="text-right">
                      <h4 className="text-xl mb-1" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
                        {story.title}
                      </h4>
                      <p className="text-[0.65rem] leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                        {story.text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Side Content */}
                <div className="w-[45%] pl-2">
                  {idx % 2 === 0 ? (
                    /* Text Right */
                    <div className="text-left">
                      <h4 className="text-xl mb-1" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
                        {story.title}
                      </h4>
                      <p className="text-[0.65rem] leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                        {story.text}
                      </p>
                    </div>
                  ) : (
                    /* Photo Right */
                    <div className="rounded-2xl overflow-hidden shadow-sm"
                      style={{ border: '1px solid rgba(139, 111, 71, 0.15)' }}>
                      <img src={story.image} alt={story.title} className="w-full h-auto block" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="rounded-t-[80px] p-8 backdrop-blur-sm"
          style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
          <FloralIcon />
          <h3 className="text-5xl mb-6 text-center" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
            Our Moments
          </h3>
          <p className="text-center mb-8" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47' }}>
            PRE-WEDDING GALLERY
          </p>
          <Masonry columnsCount={2} gutter="12px">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden"
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
        <section className="rounded-t-[80px] p-8 backdrop-blur-sm"
          style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
          <FloralIcon />
          <div className="text-center mb-8">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { value: countdown.days, label: 'DAYS' },
                { value: countdown.hours, label: 'HOURS' },
                { value: countdown.minutes, label: 'MINS' },
                { value: countdown.seconds, label: 'SECS' }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl p-4 backdrop-blur-sm"
                  style={{ border: '1px solid rgba(139, 111, 71, 0.15)', backgroundColor: 'rgba(237, 228, 216, 0.6)' }}>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#4A3728' }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#8B6F47' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
              <h3 className="text-2xl mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px', color: '#4A3728' }}>
                TASYAKURAN
              </h3>
              <div className="text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>JUMAT - MINGGU</p>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>22 - 24 MEI 2026</p>
              </div>
            </div>

            <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
              <h3 className="text-2xl mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px', color: '#4A3728' }}>
                AKAD NIKAH
              </h3>
              <div className="text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>SENIN, 25 MEI 2026</p>
                <p>09:00 - 10:30 WIB</p>
              </div>
            </div>

            <div className="pt-6" style={{ borderTop: '1px solid rgba(139, 111, 71, 0.15)' }}>
              <h3 className="text-2xl mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px', color: '#4A3728' }}>
                RESEPSI
              </h3>
              <div className="text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>SENIN, 25 MEI 2026</p>
                <p>11:00 - SELESAI</p>
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
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '1px',
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
          <h3 className="text-4xl mb-6 text-center" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
            Konfirmasi Kehadiran
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#6B5339' }}>
                NAMA
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full rounded-lg px-4 py-3 focus:outline-none"
                placeholder="Masukkan nama Anda"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  backgroundColor: 'rgba(139, 111, 71, 0.05)',
                  border: '1px solid rgba(139, 111, 71, 0.25)',
                  color: '#4A3728',
                }}
              />
            </div>
            <div>
              <label className="block mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px', color: '#6B5339' }}>
                KEHADIRAN
              </label>
              <select
                required
                value={formData.kehadiran}
                onChange={(e) => setFormData({ ...formData, kehadiran: e.target.value })}
                className="w-full rounded-lg px-4 py-3 focus:outline-none"
                style={{
                  fontFamily: 'Playfair Display, serif',
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
              className="w-full py-3 rounded-full transition-all hover:shadow-lg"
              style={{
                fontFamily: 'Playfair Display, serif',
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

        {/* Footer / Closing */}
        <section className="rounded-t-[80px] p-8 text-center backdrop-blur-sm"
          style={{ border: '1px solid rgba(139, 111, 71, 0.2)', backgroundColor: 'rgba(245, 237, 227, 0.5)' }}>
          <FloralIcon />
          <p className="text-lg leading-relaxed mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#6B5339' }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>
          <p className="text-xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#4A3728' }}>
            Terima Kasih
          </p>
          <p className="text-sm italic mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#8B6F47' }}>Wassalamu'alaikum Warahmatullahi Wabarakatuh</p>
          <div className="text-5xl" style={{ fontFamily: 'Great Vibes, cursive', color: '#4A3728' }}>
            A & M
          </div>
        </section>
      </div>

      {/* Music Player / Rotating Disc */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className={`relative w-16 h-16 rounded-full overflow-hidden shadow-2xl transition-transform active:scale-95 ${
            isPlaying ? 'animate-spin-slow' : 'paused'
          }`}
          style={{ border: '2px solid rgba(139, 111, 71, 0.35)' }}
        >
          <img
            src="bg.jpeg"
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
    </div>
  );
}