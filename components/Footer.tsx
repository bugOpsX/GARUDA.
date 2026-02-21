export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto mix-blend-difference bg-gradient-to-t from-black/50 to-transparent backdrop-blur-[2px]">
            <div className="text-xs text-white/40 tracking-widest font-mono flex items-center gap-2">
                <span className="inline-block w-1 h-3 bg-white/20"></span>
                LAT: 35.6895° N | LON: 139.6917° E
            </div>
            <div className="text-xs text-white/40 tracking-[0.4em] font-mono flex items-center justify-center opacity-50">
                AEROSPACE DEFENSE INITIATIVE
            </div>
            <div className="flex gap-4 items-center">
                <div className="text-xs text-white/40 tracking-widest font-mono">PWR 89%</div>
                <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400/80 w-[89%] relative">
                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
