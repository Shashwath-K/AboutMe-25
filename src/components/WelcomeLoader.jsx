import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
import logo from "../assets/header/favicon.ico"; // TODO: Replace with your actual logo path

// --- Configuration ---
const LOADER_VISIBLE_DURATION_MS = 4500; // Total time before fade starts
const FADE_OUT_DURATION_MS = 500;      // Fade out time
const MATRIX_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝabcdefghijklmnopqrstuvwxyz<>/?!@#$%^&*()-+=~[]{}|;:,.";
const FONT_SIZE = 16;
const RAIN_SPEED = 50; // Milliseconds per character update

// --- Background Grid Component (Matrix Themed) ---
const AnimatedMatrixGrid = () => {
  const time = useTime();
  const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false }); // Slower rotation

  return (
    <motion.div
      className="absolute inset-0 w-full h-full overflow-hidden opacity-15" // Matrix grid opacity
      style={{ perspective: '1000px' }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%', // Larger grid
          height: '200%',
          translateX: '-50%',
          translateY: '-50%',
          rotateX: '70deg', // Tilt
          rotateZ: rotate,
          // Green grid lines
          backgroundImage: `linear-gradient(to right, rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(34, 197, 94, 0.2) 1px, transparent 1px)`,
          backgroundSize: '35px 35px', // Grid size
          maskImage: 'radial-gradient(ellipse at center, white 10%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white 10%, transparent 60%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      />
    </motion.div>
  );
};

// --- Matrix Rain Component ---
const MatrixRain = () => {
  const [columns, setColumns] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const numCols = Math.floor(width / FONT_SIZE);
      setColumns(Array.from({ length: numCols }).map((_, i) => ({
        id: i,
        // Start drops at different times/positions
        initialDelay: Math.random() * 5000,
        yPosition: Math.random() * -window.innerHeight * 1.5,
      })));
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden opacity-40 pointer-events-none" // Rain opacity
      style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: FONT_SIZE }}
    >
      {columns.map(col => (
        <MatrixColumn key={col.id} initialDelay={col.initialDelay} initialY={col.yPosition} />
      ))}
    </div>
  );
};

// --- Single Column for Matrix Rain ---
const MatrixColumn = ({ initialDelay, initialY }) => {
  const [chars, setChars] = useState([]);
  const columnRef = useRef(null);
  const intervalRef = useRef(null);
  const yPosition = useRef(initialY);

  useEffect(() => {
    // Delay the start of the rain effect for this column
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (!columnRef.current) return;

        const newChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const isHighlight = Math.random() > 0.9; // 10% chance to be highlighted

        setChars(prevChars => {
          // Add new char at the current yPosition
          const updatedChars = [
            ...prevChars,
            { char: newChar, y: yPosition.current, highlight: isHighlight, id: Date.now() + Math.random() }
          ];

          // Fade out older characters gradually and remove if too far off screen
          const screenHeight = window.innerHeight;
          const fadedChars = updatedChars.map(c => ({
            ...c,
            // Fade logic can be added here if needed (e.g., based on time or position)
          })).filter(c => c.y < yPosition.current + screenHeight * 1.2); // Remove chars far below

          return fadedChars;
        });

        // Move the "head" of the rain drop down
        yPosition.current += FONT_SIZE;

        // Reset if it goes way off screen
        if (yPosition.current > window.innerHeight * 1.5) {
          yPosition.current = Math.random() * -window.innerHeight; // Restart from top
          setChars([]); // Clear old chars for this drop
        }

      }, RAIN_SPEED);
    }, initialDelay);

    // Cleanup interval on unmount
    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [initialDelay]);

  return (
    <div
      ref={columnRef}
      className="absolute top-0 h-full"
      style={{ left: `${columnRef.current ? columnRef.current.offsetLeft : 0}px`, writingMode: 'vertical-rl', textOrientation: 'upright' }}
    >
      {chars.map((c, index) => (
        <span
          key={c.id}
          style={{
            position: 'absolute',
            top: c.y,
            color: c.highlight ? '#ccffdd' : '#22c55e', // Highlight vs standard green
            textShadow: c.highlight ? '0 0 8px #5ee4a3' : 'none',
            opacity: 1 - (yPosition.current - c.y) / (window.innerHeight * 0.5), // Fade out as it gets older
            transform: `translateY(${FONT_SIZE * index}px)`, // Position characters vertically
          }}
        >
          {c.char}
        </span>
      ))}
    </div>
  );
};


// --- Animated Text Component (Matrix Themed) ---
const GlitchText = ({ text, delay }) => {
  const characters = text.split("");
  return (
    <motion.div
      className="flex justify-center overflow-hidden font-mono tracking-widest" // Use monospace font
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: delay } }
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block" // Needed for transform
          variants={{
            // Glitchy reveal
            hidden: { opacity: 0, y: "50%", filter: "blur(3px) contrast(3)", scale: 1.5 },
            visible: { opacity: 1, y: "0%", filter: "blur(0px) contrast(1)", scale: 1 }
          }}
          transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.5 }}
          style={{
             // Add subtle random color shifts and glows
            color: `hsl(${120 + (Math.random() - 0.5) * 20}, 70%, ${60 + Math.random() * 20}%)`,
            textShadow: `0 0 ${Math.random() * 5 + 2}px rgba(34, 197, 94, 0.5)`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Main Loader Component ---
const WelcomeLoader = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setIsVisible(false), LOADER_VISIBLE_DURATION_MS);
    const completionTimer = setTimeout(onAnimationComplete, LOADER_VISIBLE_DURATION_MS + FADE_OUT_DURATION_MS);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completionTimer);
    };
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="matrix-loader"
          className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[2500] overflow-hidden bg-black" // Black background
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_DURATION_MS / 1000, ease: "easeInOut" }}
        >
          {/* Background Elements */}
          <AnimatedMatrixGrid />
          <MatrixRain />

          {/* Foreground Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
            {/* Logo (Optional) */}
            <motion.img
              src={logo} // Use your favicon or a dedicated logo
              alt="Loading Portfolio"
              initial={{ opacity: 0, scale: 0.7, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="w-[80px] sm:w-[100px] mb-8" // Adjusted size
              style={{ filter: "drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))" }} // Green glow
            />

            {/* Animated Text */}
            <div className="text-xl sm:text-2xl text-green-400">
              <GlitchText text="LOADING ASSETS..." delay={1.2} />
            </div>
            <div className="mt-2 text-lg sm:text-xl text-green-500 opacity-80">
              <GlitchText text="SHASHWATH K S" delay={1.8} />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: LOADER_VISIBLE_DURATION_MS / 1000,
                ease: 'linear',
                delay: 0.2,
              }}
              style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.7)'}} // Green glow
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Need to import useRef for MatrixRain ---
import { useRef } from 'react';

export default WelcomeLoader;