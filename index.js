// pages/index.js
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

const Globe = dynamic(() => import('../components/Globe'), { ssr: false });
const Timeline = dynamic(() => import('../components/Timeline'), { ssr: false });
const GrokWidget = dynamic(() => import('../components/GrokWidget'), { ssr: false });

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 150 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
      });
      requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <>
      <Head>
        <title>Nephelis</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }} />
      <main style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'white', padding: '2rem', background: 'linear-gradient(to bottom, #000011, #0a0a1f)' }}>
        <header style={{ textAlign: 'center' }}>
          <img src="/logo.jpg" alt="Nephelis Logo" style={{ maxWidth: 160, marginBottom: '1rem' }} />
        </header>
        <section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', color: '#0ff', textShadow: '0 0 15px #0ff, 0 0 30px #0ff' }}>Pierce the Veil</h1>
          <p style={{ fontSize: '1.3rem', maxWidth: 700, margin: '1rem auto 2rem' }}>Join Project Nephelis as we launch Cloudseeker into the Venusian sky. Explore, mine, and awaken a new planetary market.</p>
          <button style={{ background: '#ff3366', padding: '1rem 2rem', border: 'none', color: 'white', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px #ff3366', cursor: 'pointer' }}>Join the Quest</button>
        </section>

        <section style={{ textAlign: 'center', margin: '4rem 0' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0ff', marginBottom: '1rem' }}>Planetary Systems Overview</h2>
          <Globe />
        </section>

        <section style={{ maxWidth: 800, margin: '4rem auto', background: 'rgba(0,0,20,0.4)', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 20px #0ff' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0ff', marginBottom: '1rem' }}>Mission Timeline</h2>
          <Timeline />
        </section>

        <section style={{ maxWidth: 800, margin: '4rem auto', background: 'rgba(0,0,20,0.4)', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 20px #0ff' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0ff', marginBottom: '1rem' }}>Ask Grok</h2>
          <GrokWidget />
        </section>
      </main>
    </>
  );
}