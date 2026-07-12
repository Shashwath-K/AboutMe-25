import React, { useEffect, useRef } from 'react';

const AboutHero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize) + 1;
    const drops = Array(columns).fill(1);

    // Mouse coordinates tracking
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    // Attach mouse listeners to the section parent
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(14, 14, 20, 0.08)'; // Matches background color and leaves trail fading
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const dx = x - mouseX;
        const dy = y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isNearMouse = distance < 90;

        if (isNearMouse) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ff99';
        } else {
          ctx.fillStyle = '#00ff99';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    const startTimeout = setTimeout(() => {
      draw();
    }, 100);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="hero-section-about relative overflow-hidden" style={{ minHeight: '50vh' }}>
      {/* Canvas Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
      <div className="hero-bg-overlay absolute inset-0 z-1 bg-gradient-to-b from-transparent to-[#0e0e14]" />
      
      {/* Inner Content */}
      <div className="hero-about-inner text-center flex flex-col items-center justify-center relative z-10 w-full px-4">
        <h1 className="hero-about-title text-4xl sm:text-5xl font-extrabold mb-4">About</h1>
        <p className="hero-about-content text-justify max-w-2xl lg:max-w-3xl space-y-4 mt-6 text-gray-300">
          I’m <strong>Shashwath KS</strong>, a passionate full-stack and mobile developer. I love crafting seamless digital experiences, solving complex problems, and building tools that create impact.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;