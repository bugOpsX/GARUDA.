"use client";

import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 40;

export default function GarudaScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress 0 -> 1
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll 0..1 to frame index 0..119
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Using the actual images found in /frames/frames/
            img.src = `/frames/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
            };
            // Fallback for missing frames or errors to prevent stalling
            img.onerror = () => {
                console.error(`Failed to load frame ${i}`);
                loadedCount++; // Count error as loaded to finish process
                if (loadedCount === FRAME_COUNT) {
                    setImagesLoaded(true);
                }
            }
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Rendering Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imagesLoaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle high-DPI scaling
        let lastFrameIndex = -1;

        const render = () => {
            // Get current frame index from motion value
            const currentFrameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.round(frameIndex.get()))
            );

            if (currentFrameIndex === lastFrameIndex) {
                requestAnimationFrame(render);
                return;
            }

            lastFrameIndex = currentFrameIndex;
            const img = images[currentFrameIndex];

            if (!img) {
                requestAnimationFrame(render);
                return;
            }

            // Aspect Ratio Logic: Contain
            const canvasWidth = canvas.clientWidth;
            const canvasHeight = canvas.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            // Set actual canvas size (internal resolution)
            // Checking this every frame is cheap, but resizing clears canvas
            if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
                canvas.width = canvasWidth * dpr;
                canvas.height = canvasHeight * dpr;
                ctx.scale(dpr, dpr);
            } else {
                // Only clear if we didn't resize (resize clears auto)
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            }

            // Aspect Ratio Logic: Cover with slight zoom
            const imgAspect = img.width / img.height;
            const canvasAspect = canvasWidth / canvasHeight;
            const ZOOM = 1.1; // 10% zoom to ensure frames completely fill and pop

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasAspect > imgAspect) {
                // Canvas is wider than image -> match width (cover)
                drawWidth = canvasWidth * ZOOM;
                drawHeight = (canvasWidth / imgAspect) * ZOOM;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                // Canvas is taller than image -> match height (cover)
                drawHeight = canvasHeight * ZOOM;
                drawWidth = (canvasHeight * imgAspect) * ZOOM;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            // Draw with smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [imagesLoaded, images, frameIndex]);

    // Text Animations
    const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

    const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [50, 0, 0]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-50">
                        <div className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase">
                            Initializing System... {loadProgress}%
                        </div>
                    </div>
                )}

                <canvas ref={canvasRef} className="w-full h-full block object-contain" />

                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none z-10">

                    {/* Frame 1: Hero */}
                    <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                            GARUDA.
                        </h1>
                        <p className="text-sm md:text-xl text-white/80 tracking-[0.4em] uppercase font-medium bg-black/20 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
                            Autonomous • Tactical • Unstoppable
                        </p>
                    </motion.div>

                    {/* Frame 2: Precision */}
                    <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute text-center bg-black/40 backdrop-blur-md px-12 py-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-lg">
                            Designed for Precision.
                        </h2>
                        <div className="w-16 h-1 bg-cyan-400 mx-auto mt-6 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                    </motion.div>

                    {/* Frame 3: Intelligence */}
                    <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center bg-black/40 backdrop-blur-md px-12 py-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 drop-shadow-lg">
                            Intelligence Inside.
                        </h2>
                        <p className="text-white/90 text-xl max-w-lg mx-auto leading-relaxed font-light">
                            Next-gen AI sensors merged with aerospace-grade avionics for unprecedented tactical awareness.
                        </p>
                    </motion.div>

                    {/* Frame 4: Final */}
                    <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 drop-shadow-xl">
                            Command the Sky.
                        </h2>
                        <button className="pointer-events-auto px-10 py-4 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] font-semibold tracking-[0.3em] uppercase transition-all duration-500 rounded-sm">
                            INITIALIZE SEQUENCE
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
