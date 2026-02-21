export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto mix-blend-difference bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
            <div className="text-xl font-bold tracking-[0.3em] text-white">GARUDA<span className="text-white/50">_OS</span></div>
            <nav className="flex gap-8 text-xs tracking-widest uppercase text-white/70">
                <a href="#" className="hover:text-white transition-colors duration-300">Specs</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Mission</a>
                <a href="#" className="hover:text-white transition-colors duration-300">Fleet</a>
            </nav>
            <div className="flex items-center gap-3">
                <span className="text-xs text-white/50 tracking-widest font-mono">SYSTEM OPTIMAL</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            </div>
        </header>
    );
}
