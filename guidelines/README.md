  ## Running the code (cara menjalankan code)

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ================================================================
  TDR — TRI DHARMA RECOVERY
  Referensi Brand & Aset
  Terakhir diperbarui: 09 Juni 2026
================================================================

TENTANG
-------
Tri Dharma Recovery (TDR) adalah perusahaan ekonomi sirkular berbasis
di Bali yang mengolah limbah organik dan anorganik menjadi kompos,
produk plastik daur ulang, dan furnitur reklamasi. Nama "Tri Dharma"
mengacu pada filosofi Bali tentang tiga hubungan suci:
  - Parahyangan : manusia ↔ Tuhan
  - Pawongan    : manusia ↔ sesama manusia
  - Palemahan   : manusia ↔ alam

Identitas brand dibangun di atas tiga pilar ini: tiga kelopak, tiga
fase ekonomi sirkular, tiga komitmen.


================================================================
  1. LOGO
================================================================

FILE
  src/app/components/Logo.tsx          (Komponen React, SVG)
  Dibuat ulang dari awal sebagai SVG inline — tidak perlu ekspor raster.

VARIAN ANIMASI PEMBUKA
  src/app/components/OpeningAnimation.tsx
  Digunakan pada overlay intro layar penuh.

MOTIF
  Tiga kelopak yang saling terkait, diputar 120° mengelilingi benih
  di tengah, dibingkai oleh tiga busur cincin terputus.

SIMBOLISME
  - Tiga kelopak  → Tri Dharma (Parahyangan, Pawongan, Palemahan)
  - Cincin terputus → Ekosistem terbuka dan terus berkembang (tidak tertutup)
  - Benih di tengah → Regenerasi, pertumbuhan baru
  - Aliran gradien  → Sawah Bali (hijau zamrud) → lautan (biru cyan)

ATURAN PENGGUNAAN
  - Ukuran minimum     : 24 px
  - Ruang kosong       : 8 px di semua sisi
  - Jangan mengubah warna gradien — gunakan hanya file SVG sumber
  - Jangan letakkan di atas foto yang ramai tanpa overlay penggelapan
  - Latar belakang yang diizinkan: putih, hampir hitam (#000–#0a0a0a),
    dan gradien radial hijau zamrud/cyan brand

INTERAKSI
  - Hover (di navbar)  : Rotasi 120°, easing ditekankan
  - Klik (di navbar)   : Navigasi ke "/" dan memutar ulang animasi
                         pembuka melalui replayOpening() (custom event
                         "tdr:replay-opening")


================================================================
  2. PALET WARNA
================================================================

PRIMER — Sawah hijau zamrud Bali
  Emerald 50    #ECFDF5
  Emerald 100   #D1FAE5
  Emerald 300   #6EE7B7
  Emerald 400   #34D399
  Emerald 500   #10B981   ← warna primer brand
  Emerald 600   #059669
  Emerald 700   #047857

AKSEN — Lautan Bali
  Cyan 300      #67E8F9
  Cyan 400      #22D3EE
  Cyan 500      #0EA5E9   ← aksen brand
  Cyan 600      #0284C7

PENDUKUNG
  Amber 500     #F59E0B   (Parahyangan — persembahan, kehangatan)
  Rose 500      #F43F5E   (destruktif, peringatan)
  Teal 500      #14B8A6   (warna tengah kelopak B logo)

NETRAL (tema gelap — default)
  Latar belakang   #000000
  Permukaan        #0a0a0a
  Kartu            var(--card)
  Border           rgba(255, 255, 255, 0.14)
  Teks             #FAFAFA
  Teks redup       #A1A1AA  (#717182 di tema terang)

GRADIEN KHAS
  linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)

  Digunakan pada:
  - Teks judul hero    (bg-clip-text)
  - Tombol CTA utama
  - Ubin latar ikon
  - Kelopak & cincin logo
  - Indikator nav aktif (overlay 12% opacity)


================================================================
  3. TIPOGRAFI
================================================================

JENIS FONT
  "Inter", system-ui, -apple-system, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif

  Tidak ada file font eksternal yang dimuat — situs menggunakan
  font sistem untuk kecepatan. Jika ingin menambahkan web font,
  deklarasikan di:
    src/styles/fonts.css   (font-face / @import di bagian atas)

KETEBALAN YANG DIGUNAKAN
  400  regular    teks isi, paragraf
  500  medium     label, gaya dasar h1–h4
  600  semibold   judul kartu, statistik dashboard
  700  bold       judul hero, teks gradien, angka KPI

SKALA TIPE
  Display (hero h1)   clamp(2rem, 4.5vw, 3.5rem)   lh 1.1  ls -0.03em
  Judul seksi h2      clamp(1.75rem, 3.5vw, 2.5rem) lh 1.2  ls -0.02em
  Judul kartu h3      1.35rem                       lh 1.4
  Isi                 1rem                          lh 1.6
  Kecil / meta        0.88rem                       lh 1.5
  Mikro / kapital     0.7rem                        ls 0.3em

TOKEN DASAR
  --font-size           : 16px       (src/styles/theme.css)
  --font-weight-normal  : 400
  --font-weight-medium  : 500


================================================================
  4. ANIMASI & GERAKAN
================================================================

LIBRARY
  motion/react (import { motion } from "motion/react")

EASING
  emphasized   [0.22, 1, 0.36, 1]    transisi halaman, FadeIn
  standard     [0.4, 0, 0.2, 1]      nav, pergeseran layout
  decelerate   [0, 0, 0.2, 1]        elemen masuk
  exit-blur    [0.7, 0, 0.3, 1]      keluar overlay pembuka

DURASI
  mikro        0.2 dtk    hover, pergeseran warna
  standar      0.6 dtk    fade-in, transisi kartu
  halaman      0.8 dtk    PageWrap masuk/keluar
  pembuka      2.6 dtk    urutan intro penuh

URUTAN ANIMASI PEMBUKA (src/app/components/OpeningAnimation.tsx)
  0.0 dtk   Latar belakang + orb ambient muncul perlahan
  0.2 dtk   Cincin partikel mengembang ke luar
  0.2 dtk   Busur cincin tergambar dengan pathLength
  0.9 dtk   Kelopak muncul satu per satu (spring)
  1.4 dtk   Benih muncul (spring)
  1.5 dtk   Wordmark + tagline muncul perlahan
  1.9 dtk   Kilap garis bawah
  2.6 dtk   Overlay skala 1.04, blur, memudar → halaman terlihat
  → Putar ulang kapan saja melalui replayOpening()


================================================================
  5. IKONOGRAFI & GAMBAR
================================================================

LIBRARY IKON
  lucide-react      ikon stroke 24px, stroke default 2
  Selalu tampilkan di dalam ubin bergradien saat digunakan sebagai
  ikon fitur (12×12 → 14×14 rounded-xl, gradien hijau zamrud→cyan,
  ikon putih).

FOTOGRAFI
  Bersumber dari Unsplash melalui plugin make:unsplash.
  Selalu tampilkan melalui <ImageWithFallback> (bukan <img> biasa)
  dan sertakan teks alt yang nyata.

GRAFIK / CHART
  recharts          Line + Bar untuk dashboard korporat.
                    Gradien brand diterapkan melalui
                    <linearGradient id="tdrBarGrad">.


================================================================
  6. RADIUS, ELEVASI, & BORDER
================================================================

RADIUS
  pill          9999px        pil navigasi, toggle bahasa, CTA
  kartu         1rem (16px)   Tailwind rounded-2xl default
  permukaan     1.5rem        bingkai dashboard
  hero          2rem          panel gradien hero

BAYANGAN / GLOW
  kartu          0 4px 24px -8px rgba(0, 0, 0, 0.3)
  glow hijau     0 10px 40px -10px rgba(16, 185, 129, 0.4)
  glow cyan      0 10px 40px -10px rgba(14, 165, 233, 0.4)

BORDER
  --border (gelap)    rgba(255, 255, 255, 0.14)
  --border (terang)   rgba(0, 0, 0, 0.1)

  Semua kartu grid menggunakan border 1px dengan nilai ini agar
  tetap terbaca di atas latar belakang hampir hitam.


================================================================
  7. PETA FILE
================================================================

src/
├─ app/
│  ├─ App.tsx                       Shell aplikasi + rute + overlay pembuka
│  ├─ lib/
│  │   ├─ brand.ts                  Token brand programatik (impor dari sini)
│  │   ├─ AppContext.tsx            Konteks bahasa + tema
│  │   └─ i18n.ts                   Terjemahan (id / en)
│  ├─ components/
│  │   ├─ Logo.tsx                  Tanda brand (SVG, animasi, bisa diklik)
│  │   ├─ OpeningAnimation.tsx      Overlay intro + replayOpening()
│  │   ├─ Navbar.tsx                Navigasi atas (logo memicu replay)
│  │   ├─ Footer.tsx
│  │   ├─ Section.tsx               Primitif FadeIn + PageWrap
│  │   ├─ GlowCard.tsx              Kartu grid dengan glow mengikuti kursor
│  │   └─ AnimatedCounter.tsx
│  └─ pages/
│      ├─ Home.tsx
│      ├─ About.tsx
│      ├─ Products.tsx
│      ├─ Ecosystem.tsx
│      └─ Corporate.tsx
└─ styles/
   ├─ theme.css                     Variabel CSS, tipografi dasar
   └─ fonts.css                     Dikhususkan untuk impor @font-face


================================================================
  8. REFERENSI CEPAT — SALIN/TEMPEL
================================================================

Gradien primer (CSS):
  background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);

Gradien primer (Tailwind):
  bg-gradient-to-r from-emerald-500 to-cyan-500

Teks gradien:
  bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent

Tint lembut (12% hijau zamrud, transparan di tema gelap):
  background: color-mix(in oklab, #10B981 12%, transparent);

Putar ulang animasi pembuka dari komponen mana pun:
  import { replayOpening } from "./components/OpeningAnimation";
  replayOpening();

================================================================
  SELESAI
================================================================