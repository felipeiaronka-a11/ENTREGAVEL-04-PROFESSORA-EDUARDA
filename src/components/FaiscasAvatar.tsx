import React, { useEffect, useRef } from "react";

export function FaiscasAvatar({
  src,
  alt,
  fallback,
  sizeClass = "w-11 h-11",
}: {
  src: string;
  alt: string;
  fallback: string;
  sizeClass?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let anguloPortal = 0;

    const faiscas: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      vida: number;
      maxVida: number;
      tamanho: number;
    }[] = [];

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const raio = w * 0.34;

      ctx.clearRect(0, 0, w, h);
      anguloPortal += 0.14;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(anguloPortal);
      ctx.beginPath();
      ctx.arc(0, 0, raio, 0, Math.PI * 1.65);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      for (let i = 0; i < 4; i++) {
        const theta = Math.random() * Math.PI * 2;
        const px = cx + Math.cos(theta) * raio;
        const py = cy + Math.sin(theta) * raio;

        const vel = 1.6 + Math.random() * 2.4;
        const vx = -Math.sin(theta) * vel + Math.cos(theta) * 0.65;
        const vy = Math.cos(theta) * vel + Math.sin(theta) * 0.65;

        faiscas.push({
          x: px,
          y: py,
          vx,
          vy,
          vida: 0,
          maxVida: 14 + Math.random() * 14,
          tamanho: 1.2 + Math.random() * 1.4,
        });
      }

      for (let i = faiscas.length - 1; i >= 0; i--) {
        const f = faiscas[i];
        const xAnt = f.x;
        const yAnt = f.y;

        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.05;
        f.vida++;

        const alpha = 1 - f.vida / f.maxVida;
        if (alpha <= 0) {
          faiscas.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(xAnt, yAnt);
        ctx.lineTo(f.x, f.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = f.tamanho;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 8;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center shrink-0">
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className="absolute pointer-events-none z-20"
        style={{ width: "145%", height: "145%" }}
      />
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          e.currentTarget.src = fallback;
        }}
        className={`${sizeClass} rounded-full object-cover border-2 border-white relative z-10 shadow-[0_0_16px_rgba(255,255,255,0.85)]`}
      />
    </div>
  );
}
