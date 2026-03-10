export default function Footer() {
  return (
    <footer className="bg-sponge-bg border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl">🧽</span>
          <span className="font-bold text-white">Sponge Club</span>
        </div>
        <p className="text-sponge-muted text-sm mb-2">
          SELFISH CLUB presents
        </p>
        <p className="text-sponge-muted text-xs">
          냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sponge-muted text-xs">
          <a href="https://instagram.com/selfishclub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
          <a href="mailto:contact@selfishclub.xyz" className="hover:text-white transition">문의하기</a>
        </div>
        <p className="text-sponge-muted/50 text-xs mt-8">
          © 2025 Selfish Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
