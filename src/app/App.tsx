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

  const weddingDate = new Date('2035-10-01T10:00:00');

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
    alert('Terima kasih atas konfirmasi Anda!');
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
      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(bg.jpeg)',
            opacity: 0.4
          }}
        />

        <div className="relative z-10 max-w-md w-full">
          <div className="border border-white/30 rounded-t-[100px] p-8 text-center backdrop-blur-sm bg-emerald-950/50">
            <div className="space-y-6">
              <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-2 border-white/40 mb-6">
                <img
                  src="bg.jpeg"
                  alt="Yoga & Ria"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-white/90 text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
                The Wedding of
              </h1>
              <div className="text-white text-7xl mb-8" style={{ fontFamily: 'Great Vibes, cursive' }}>
                Yoga & Ria
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-transparent border border-white/50 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 space-y-16">
        <section className="border border-white/30 rounded-t-[80px] p-8 text-center backdrop-blur-sm bg-emerald-950/30">
          <FloralIcon />
          <p className="text-white/80 italic text-lg leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."
          </p>
          <p className="text-white/60 mt-4" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
            — QS. AR-RUM: 21
          </p>
        </section>

        <section className="space-y-8">
          <div className="border border-white/30 rounded-t-[80px] p-8 text-center backdrop-blur-sm bg-emerald-950/30">
            <FloralIcon />
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30">
              <img
                src="cowo.jpeg"
                alt="Yoga"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Yoga
            </h2>
            <p className="text-white/70" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
              PUTRA DARI
            </p>
            <p className="text-white/90 mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              -
            </p>
          </div>

          <div className="text-center">
            <span className="text-white text-6xl" style={{ fontFamily: 'Great Vibes, cursive' }}>&</span>
          </div>

          <div className="border border-white/30 rounded-t-[80px] p-8 text-center backdrop-blur-sm bg-emerald-950/30">
            <FloralIcon />
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30">
              <img
                src="cewe.jpeg"
                alt="Ria"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-5xl mb-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
              Ria
            </h2>
            <p className="text-white/70" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
              PUTRI DARI
            </p>
            <p className="text-white/90 mt-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              -
            </p>
          </div>
        </section>

        <section className="border border-white/30 rounded-t-[80px] p-8 backdrop-blur-sm bg-emerald-950/30">
          <FloralIcon />
          <h3 className="text-white text-5xl mb-6 text-center" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Our Moments
          </h3>
          <p className="text-white/70 text-center mb-8" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
            PRE-WEDDING GALLERY
          </p>
          <Masonry columnsCount={2} gutter="12px">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="border border-white/30 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={photo}
                  alt={`Gallery photo ${idx + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </Masonry>
        </section>

        <section className="border border-white/30 rounded-t-[80px] p-8 backdrop-blur-sm bg-emerald-950/30">
          <FloralIcon />
          <div className="text-center mb-8">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {[
                { value: countdown.days, label: 'DAYS' },
                { value: countdown.hours, label: 'HOURS' },
                { value: countdown.minutes, label: 'MINS' },
                { value: countdown.seconds, label: 'SECS' }
              ].map((item, idx) => (
                <div key={idx} className="border border-white/20 rounded-2xl p-4 backdrop-blur-sm bg-emerald-950/20">
                  <div className="text-white text-3xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-white/60 text-xs" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-t border-white/20 pt-6">
              <h3 className="text-white text-2xl mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
                AKAD NIKAH
              </h3>
              <div className="text-white/80 text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>SENIN, 1 OKTOBER 2035</p>
                <p>10:00 - 11:00 WIB</p>
                <p className="text-white/70 mt-2">Alun Alun Kidul</p>
                <p className="text-white/70">Yogyakarta</p>
              </div>
              <button className="mt-4 w-full border border-white/50 text-white py-2 px-4 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
                <MapPin size={16} />
                LIHAT DI GOOGLE MAPS
              </button>
            </div>

            <div className="border-t border-white/20 pt-6">
              <h3 className="text-white text-2xl mb-3 text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}>
                RESEPSI
              </h3>
              <div className="text-white/80 text-center space-y-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                <p className="text-lg" style={{ letterSpacing: '1px' }}>SENIN, 1 OKTOBER 2035</p>
                <p>13:00 - 17:00 WIB</p>
                <p className="text-white/70 mt-2">Alun Alun Kidul</p>
                <p className="text-white/70">Yogyakarta</p>
              </div>
              <button className="mt-4 w-full border border-white/50 text-white py-2 px-4 rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
                <MapPin size={16} />
                LIHAT DI GOOGLE MAPS
              </button>
            </div>
          </div>
        </section>

        <section className="border border-white/30 rounded-t-[80px] p-8 backdrop-blur-sm bg-emerald-950/30">
          <FloralIcon />
          <h3 className="text-white text-4xl mb-6 text-center" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Konfirmasi Kehadiran
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
                NAMA
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                placeholder="Masukkan nama Anda"
                style={{ fontFamily: 'Playfair Display, serif' }}
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '1px' }}>
                KEHADIRAN
              </label>
              <select
                required
                value={formData.kehadiran}
                onChange={(e) => setFormData({ ...formData, kehadiran: e.target.value })}
                className="w-full bg-white/5 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <option value="" className="bg-emerald-900">Pilih kehadiran</option>
                <option value="hadir" className="bg-emerald-900">Hadir</option>
                <option value="tidak-hadir" className="bg-emerald-900">Tidak Hadir</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-white/10 border border-white/50 text-white py-3 rounded-full hover:bg-white/20 transition-all"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '2px' }}
            >
              KIRIM KONFIRMASI
            </button>
          </form>
        </section>

        <section className="border border-white/30 rounded-t-[80px] p-8 text-center backdrop-blur-sm bg-emerald-950/30">
          <FloralIcon />
          <p className="text-white/80 text-lg leading-relaxed mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>
          <p className="text-white/90 text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Terima Kasih
          </p>
          <div className="text-white text-5xl" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Y & R
          </div>
        </section>
      </div>

      {/* Music Player / Rotating Disc */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className={`relative w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden shadow-2xl transition-transform active:scale-95 ${
            isPlaying ? 'animate-spin-slow' : 'paused'
          }`}
        >
          <img
            src="bg.jpeg"
            alt="Music Disc"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-white/20 rounded-full border border-white/40 backdrop-blur-sm" />
          </div>
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Music className="text-white/80" size={20} />
            </div>
          )}
        </button>
        <audio ref={audioRef} src="lagu.mp3" loop />
      </div>
    </div>
  );
}