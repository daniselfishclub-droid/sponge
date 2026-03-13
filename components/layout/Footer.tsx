export default function Footer() {
  return (
    <footer className="relative bg-sponge-bg border-t border-white/5 py-16">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-sponge-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl">🧽</span>
          <span className="font-display font-bold text-white">Sponge Club</span>
        </div>
        <p className="text-sponge-muted text-xs tracking-[0.15em] uppercase font-mono mb-2">
          Selfish Club presents
        </p>
        <p className="text-sponge-muted/60 text-xs">
          냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다
        </p>
        <div className="mt-8 flex justify-center gap-8 text-sponge-muted text-xs">
          <a
            href="https://instagram.com/selfishclub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sponge-cyan transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="mailto:contact@selfishclub.xyz"
            className="hover:text-sponge-cyan transition-colors duration-200"
          >
            문의하기
          </a>
        </div>
        <p className="text-sponge-muted/30 text-xs mt-10 font-mono">
          © 2025 Selfish Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
