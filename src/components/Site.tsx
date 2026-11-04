"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { byId, faq, heroCards, mosaic, nav, partners, projects, reels, services, steps, studio, testimonials } from "@/lib/data";
import { stories, type Story } from "@/lib/stories";
import { asset } from "@/lib/base-path";
import { sizes } from "@/lib/sizes";
import { wrap } from "@/lib/ui";
import { IconInstagram, IconPhone, IconPin, IconPlus, IconRight, IconWhatsapp } from "./Icons";
import { Magnetic } from "./FX";
import { useHistoryLayer } from "./Nav";

/* ---------- utilitários ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const whatsappLink = (msg: string) => `${studio.whatsapp}?text=${encodeURIComponent(msg)}`;

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

/** Vídeo de prévia: só toca enquanto está na tela. */
function usePlayInView(threshold = 0.5) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Esc fecha, trava a rolagem e liga a janela ao histórico (voltar do celular fecha). */
function useLayer(open: boolean, close: () => void, extra?: (e: KeyboardEvent) => void) {
  useHistoryLayer(open, close);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      extra?.(e);
    };
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", k);
    };
  }, [open, close, extra]);
}

/** Cartão que inclina em 3D com o mouse. */
export function Tilt({ children, className = "", max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduced() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform = `perspective(1000px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      }}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
    >
      {children}
    </div>
  );
}

/* abre o visualizador de projeto ou um vídeo de qualquer lugar da página */
export const openProject = (id: string, start = 0) => window.dispatchEvent(new CustomEvent("mb:project", { detail: { id, start } }));
export const openVideo = (id: string, title: string) => window.dispatchEvent(new CustomEvent("mb:video", { detail: { id, title } }));

/* ---------- cabeçalho: menu em pílula que vira vidro ao rolar ---------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useLayer(open, close);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className={`mx-auto flex h-14 max-w-[calc(1160px+2rem)] items-center justify-between gap-4 rounded-full px-4 transition-[background-color,box-shadow,backdrop-filter] duration-500 md:px-5 ${solid || open ? "bg-paper/85 shadow-[0_10px_40px_-20px_rgba(122,86,54,0.45)] backdrop-blur-md" : ""}`}>
          <a href="#inicio" data-no-back onClick={close} className="flex items-baseline gap-2" aria-label="Marília Bezerra, início">
            <span className="font-display text-[1.2rem] tracking-[0.04em] uppercase">Marília Bezerra</span>
            <span className="hidden text-[0.62rem] tracking-[0.2em] text-sand uppercase sm:inline">Arquitetura</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu principal">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-[0.84rem] text-cream/75 transition-colors hover:text-cream">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Magnetic strength={0.2}>
              <a href={whatsappLink("Olá, Marília! Vim pelo site e gostaria de conversar sobre um projeto.")} target="_blank" rel="noopener noreferrer" className="btn btn-dark py-2 text-[0.8rem] max-sm:hidden">
                Agendar conversa
              </a>
            </Magnetic>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"}>
              <span className="flex w-5 flex-col gap-[5px]">
                <span className={`h-px w-5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-px w-5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] lg:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`} aria-hidden={!open}>
        <nav className={`${wrap} flex h-full flex-col justify-center gap-1 pt-16`} aria-label="Menu do celular">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} tabIndex={open ? 0 : -1} onClick={close} className="t-display border-b border-line py-3 text-[2rem]" style={{ transition: `opacity .5s ${0.15 + i * 0.05}s, transform .5s ${0.15 + i * 0.05}s`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(16px)" }}>
              {n.label}
            </a>
          ))}
          <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-dark mt-6 justify-center">
            <IconWhatsapp className="h-4 w-4" /> {studio.phone}
          </a>
        </nav>
      </div>
    </>
  );
}

/* ---------- topo: título central e leque 3D de fotos que segue o mouse e se abre com a rolagem ---------- */
export function Hero() {
  const fan = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced()) return;
    let mx = 0, tx = 0, s = 0, raf = 0;
    const onMove = (e: PointerEvent) => (tx = e.clientX / innerWidth - 0.5);
    const loop = () => {
      mx += (tx - mx) * 0.06;
      const target = Math.min(1, scrollY / (innerHeight * 0.8));
      s += (target - s) * 0.1;
      const el = fan.current;
      if (el) {
        el.style.transform = `rotateY(${mx * 14}deg)`;
        el.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
          const k = Number(c.dataset.card) - 2;
          const spread = 1 + s * 0.6;
          c.style.transform = `translateX(${k * 13 * spread}vw) translateY(${Math.abs(k) * (2.2 - s * 4)}rem) translateZ(${-Math.abs(k) * 90 + s * 40}px) rotateZ(${k * (6 - s * 4)}deg) rotateY(${-k * (10 + s * 8)}deg)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);
  return (
    <section id="inicio" className="relative overflow-hidden pb-0 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,rgba(234,203,168,0.55),transparent_70%),radial-gradient(40%_40%_at_80%_60%,rgba(110,117,80,0.08),transparent_70%)]" />
      <div className={`${wrap} relative text-center`}>
        <p className="pill animate-[fadeUp_1s_0.1s_both]">Natal · Brasil</p>
        <h1 className="t-display t-hero mx-auto mt-6 max-w-[16ch] text-wood" aria-label={studio.slogan}>
          {["Arquitetura que traduz", "estilo de vida"].map((l, k) => (
            <span key={l} className="block overflow-hidden pb-[0.06em] pt-[0.1em]">
              <span className={`block animate-[riseIn_1.2s_cubic-bezier(0.16,1,0.3,1)_both] ${k === 1 ? "text-ink" : ""}`} style={{ animationDelay: `${0.2 + k * 0.14}s` }}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-5 max-w-[30rem] animate-[fadeUp_1s_0.6s_both] text-[1.02rem] leading-relaxed text-sand">
          {studio.sub} Casas, apartamentos, espaços comerciais e mobiliário autoral, assinados por Marília Bezerra.
        </p>
        <div className="mt-7 flex animate-[fadeUp_1s_0.75s_both] flex-wrap justify-center gap-3">
          <a href={whatsappLink("Olá, Marília! Vim pelo site e gostaria de conversar sobre um projeto.")} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Agendar conversa
          </a>
          <a href="#projetos" className="btn btn-wood">
            Ver projetos
          </a>
        </div>
      </div>
      <div className="relative mt-10 h-[17rem] [perspective:1600px] sm:h-[22rem] md:mt-12 md:h-[26rem]">
        <div ref={fan} className="absolute inset-x-0 bottom-0 mx-auto h-full [transform-style:preserve-3d]">
          {heroCards.map((src, i) => (
            <a
              key={src}
              href="#projetos"
              data-card={i}
              className="group absolute bottom-0 left-1/2 -ml-[5.5rem] h-[14rem] w-[11rem] overflow-hidden rounded-[18px] shadow-[0_30px_60px_-25px_rgba(60,40,20,0.55)] will-change-transform sm:-ml-[7.5rem] sm:h-[19rem] sm:w-[15rem] md:-ml-[8.5rem] md:h-[23rem] md:w-[17rem]"
              style={{ zIndex: 10 - Math.abs(i - 2), transform: `translateX(${(i - 2) * 13}vw) translateY(${Math.abs(i - 2) * 2.2}rem) rotateZ(${(i - 2) * 6}deg)` }}
              aria-label="Ver projetos"
              data-cursor="Projetos"
            >
              <Image src={asset(src)} alt="" fill priority={i === 2} quality={92} sizes="(min-width: 768px) 304px, 208px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- faixa de parceiros (marcas que assinam os projetos junto) ---------- */
export function Partners() {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]" aria-label="Parceiros dos projetos">
      <div className="flex w-max animate-[marquee_45s_linear_infinite]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {partners.map((p) => (
              <span key={p} className="font-display px-8 text-[1.35rem] tracking-[0.04em] whitespace-nowrap text-cream/65 uppercase">
                {p}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- serviços: quatro quadros escuros que acendem a foto no hover ---------- */
export function Services() {
  return (
    <div className="grid border-t border-line md:grid-cols-2">
      {services.map((s, i) => (
        <Tilt key={s.n} max={5}>
          <a href="#projetos" className={`group relative flex min-h-[20rem] flex-col justify-end overflow-hidden border-b border-line p-6 md:min-h-[24rem] md:p-9 ${i % 2 === 0 ? "md:border-r" : ""}`}>
            <Image src={asset(s.img)} alt="" fill quality={75} sizes="(min-width: 768px) 580px, 100vw" className="object-cover opacity-40 grayscale-[0.6] transition-[opacity,filter,transform] duration-[1.1s] group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,22,0.2),rgba(28,25,22,0.9))]" />
            <span className="relative font-mono text-[0.75rem] text-woodlight">— {s.n}</span>
            <span className="t-display relative mt-3 text-[clamp(1.5rem,2.6vw,2.1rem)]">{s.t}</span>
            <span className="relative mt-2 max-w-[24rem] text-[0.92rem] leading-relaxed text-cream/75">{s.d}</span>
          </a>
        </Tilt>
      ))}
    </div>
  );
}

/* ---------- projetos: carrossel 3D (o da frente grande, os vizinhos girando para trás) ---------- */
export function Projects() {
  const [i, setI] = useState(0);
  const n = projects.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  const drag = useRef<number | null>(null);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  /*
    Gira sozinho a cada 4,5 s, sempre (pedido do cliente): só pausa enquanto a pessoa arrasta.
    Não pausa no hover nem no foco: o carrossel ocupa quase a tela e o foco ficava preso depois de clicar nas setas.
    Clicar ou arrastar muda o índice, e isso reinicia a contagem.
  */
  useEffect(() => {
    if (hold || !inView) return;
    const id = setTimeout(() => go(1), 4500);
    return () => clearTimeout(id);
  }, [i, hold, inView, go]);
  const p = projects[i];
  return (
    <div ref={ref}>
      <div
        className="relative h-[24rem] touch-pan-y select-none [perspective:1800px] sm:h-[28rem] md:h-[34rem]"
        onPointerDown={(e) => {
          drag.current = e.clientX;
          setHold(true);
        }}
        onPointerCancel={() => setHold(false)}
        onPointerUp={(e) => {
          setHold(false);
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onKeyDown={(e) => (e.key === "ArrowRight" ? go(1) : e.key === "ArrowLeft" ? go(-1) : null)}
        tabIndex={0}
        aria-roledescription="carrossel"
        aria-label="Projetos"
      >
        {projects.map((x, k) => {
          let d = k - i;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const ad = Math.abs(d);
          const hidden = ad > 3;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => (d === 0 ? openProject(x.id) : setI(k))}
              tabIndex={d === 0 ? 0 : -1}
              aria-label={d === 0 ? `Abrir ${x.title}` : `Mostrar ${x.title}`}
              data-cursor={d === 0 ? "Abrir" : "Ver"}
              className="absolute left-1/2 top-0 h-full w-[68vw] max-w-[26rem] overflow-hidden rounded-[20px] bg-coal shadow-[0_40px_80px_-40px_rgba(60,40,20,0.6)] transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateX(calc(-50% + ${d * 58}%)) translateZ(${-ad * 160}px) rotateY(${-d * 28}deg)`,
                zIndex: 20 - ad,
                opacity: hidden ? 0 : 1 - ad * 0.18,
                filter: d === 0 ? "none" : "saturate(0.7) brightness(0.92)",
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <Image src={asset(x.cover)} alt={`${x.title}: ${x.kind}`} fill quality={92} sizes="(min-width: 768px) 416px, 68vw" className="pointer-events-none object-cover" draggable={false} />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(28,25,22,0.75)_100%)]" />
              <span className="absolute bottom-4 left-5 right-5 text-left text-paper">
                <span className="block text-[0.7rem] tracking-[0.14em] uppercase opacity-80">{x.kind}</span>
                <span className="t-display mt-1 block text-[1.4rem]">{x.title}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-10 flex max-w-[calc(40rem+2rem)] flex-col items-center gap-6 px-4 text-center">
        <div key={p.id} className="animate-[fadeUp_0.6s_both]">
          <p className="text-[0.8rem] text-sand">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {p.kind} · {p.place}
          </p>
          <h3 className="t-display t-h3 mt-2">{p.title}</h3>
          <p className="mx-auto mt-2 max-w-[36rem] leading-relaxed text-sand">{p.text}</p>
          <button type="button" onClick={() => openProject(p.id)} className="btn btn-dark mt-5">
            Ver {p.shots.length > 1 ? `${p.shots.length} imagens` : "o projeto"}
            {p.videos?.length ? " e vídeo" : ""} <IconRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2 hidden gap-1 sm:flex" aria-hidden>
            {projects.map((x, k) => (
              <span key={x.id} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-6 bg-wood" : "w-1.5 bg-cream/20"}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(-1)} className="flex h-12 w-12 rotate-180 items-center justify-center rounded-full border border-line hover:border-cream" aria-label="Projeto anterior">
            <IconRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper" aria-label="Próximo projeto">
            <IconRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- visualizador de projeto (fotos grandes + vídeos) ---------- */
type Media = { t: "img"; src: string } | { t: "video"; id: string };

export function Overlays() {
  const [proj, setProj] = useState<{ id: string; start: number } | null>(null);
  const [vid, setVid] = useState<{ id: string; title: string } | null>(null);
  useEffect(() => {
    const a = (e: Event) => setProj((e as CustomEvent<{ id: string; start: number }>).detail);
    const b = (e: Event) => setVid((e as CustomEvent<{ id: string; title: string }>).detail);
    window.addEventListener("mb:project", a);
    window.addEventListener("mb:video", b);
    return () => {
      window.removeEventListener("mb:project", a);
      window.removeEventListener("mb:video", b);
    };
  }, []);
  const closeP = useCallback(() => setProj(null), []);
  const closeV = useCallback(() => setVid(null), []);
  return (
    <>
      {proj && <ProjectViewer key={proj.id} id={proj.id} start={proj.start} onClose={closeP} />}
      {vid && <VideoModal id={vid.id} title={vid.title} onClose={closeV} />}
    </>
  );
}

function ProjectViewer({ id, start, onClose }: { id: string; start: number; onClose: () => void }) {
  const p = byId(id);
  const media: Media[] = [...p.shots.map((src) => ({ t: "img" as const, src })), ...(p.videos ?? []).map((v) => ({ t: "video" as const, id: v }))];
  const [i, setI] = useState(start);
  const [info, setInfo] = useState(false);
  const total = media.length;
  const go = useCallback((d: number) => setI((v) => (v + d + total) % total), [total]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );
  useLayer(true, onClose, keys);
  const swipe = useRef<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-k="${i}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [i]);
  const cur = media[i];
  return (
    <div className="fixed inset-0 z-[70] flex animate-[fadeUp_0.4s_both] flex-col bg-ink text-paper" role="dialog" aria-modal="true" aria-label={p.title}>
      <div className="flex items-center justify-between gap-3 p-3 md:p-4">
        <button type="button" onClick={onClose} className="btn border border-paper/25 py-2 text-[0.8rem]">
          ← Voltar
        </button>
        <p className="min-w-0 truncate text-center text-[0.9rem]">
          <span className="font-display uppercase">{p.title}</span>
          <span className="text-paper/65">
            {" "}
            · {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </p>
        <button type="button" onClick={() => setInfo((v) => !v)} className="btn border border-paper/25 py-2 text-[0.8rem]" aria-expanded={info}>
          {info ? "Fechar" : "Sobre"}
        </button>
      </div>
      <div
        className="relative flex-1 touch-pan-y"
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 50 && cur.t === "img") go(dx < 0 ? 1 : -1);
        }}
      >
        {cur.t === "img" ? (
          <div key={cur.src} className="absolute inset-0 flex animate-[fadeUp_0.4s_both] items-center justify-center">
            {/* tamanho real como teto: foto menor aparece menor, mas nítida, em vez de esticada */}
            <Image src={asset(cur.src)} alt={`${p.title}: imagem ${i + 1}`} width={sizes[cur.src]?.[0] ?? 1440} height={sizes[cur.src]?.[1] ?? 1800} unoptimized className="h-auto max-h-full w-auto max-w-full object-contain" />
          </div>
        ) : (
          <video key={cur.id} className="absolute inset-0 m-auto max-h-full max-w-full animate-[fadeUp_0.4s_both]" src={asset(`/vid/${cur.id}.mp4`)} poster={asset(`/vid/${cur.id}.webp`)} autoPlay controls playsInline />
        )}
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 rotate-180 items-center justify-center rounded-full border border-paper/30 bg-ink/70 hover:bg-paper hover:text-ink" aria-label="Anterior">
              <IconRight />
            </button>
            <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 bg-ink/70 hover:bg-paper hover:text-ink" aria-label="Próxima">
              <IconRight />
            </button>
          </>
        )}
        <aside className={`absolute bottom-0 right-0 top-0 w-full max-w-[24rem] overflow-y-auto border-l border-paper/10 bg-[#26221e]/97 p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${info ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!info}>
          <p className="text-[0.8rem] text-woodlight">
            {p.kind} · {p.place}
          </p>
          <h3 className="t-display mt-2 text-[2rem]">{p.title}</h3>
          <p className="mt-5 leading-relaxed text-paper/90">{p.text}</p>
          <a href={whatsappLink(`Olá, Marília! Vi o projeto ${p.title} no site e gostaria de conversar sobre o meu.`)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6">
            Quero um projeto assim
          </a>
        </aside>
      </div>
      {total > 1 && (
        <div ref={strip} className="no-scrollbar flex gap-2 overflow-x-auto p-3 md:p-4 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
          {media.map((m, k) => (
            <button key={k} data-k={k} type="button" onClick={() => setI(k)} className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] transition-opacity ${k === i ? "opacity-100 ring-2 ring-paper" : "opacity-45 hover:opacity-90"}`} aria-label={m.t === "img" ? `Imagem ${k + 1}` : "Vídeo"}>
              <Image src={asset(m.t === "img" ? m.src : `/vid/${m.id}.webp`)} alt="" fill quality={60} sizes="56px" className="object-cover" />
              {m.t === "video" && <span className="absolute inset-0 flex items-center justify-center bg-ink/40 text-[0.8rem]">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  useLayer(true, onClose);
  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-ink/97 p-4 text-paper" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <button type="button" onClick={onClose} className="btn border border-paper/25 py-2 text-[0.8rem]">
          ← Voltar
        </button>
      </div>
      <video className="max-h-[82vh] w-auto max-w-full animate-[fadeUp_0.5s_both] rounded-[12px]" src={asset(`/vid/${id}.mp4`)} poster={asset(`/vid/${id}.webp`)} autoPlay controls playsInline />
      <p className="font-display text-[1.1rem] uppercase">{title}</p>
    </div>
  );
}

/* ---------- processo: três cartões de vidro ---------- */
export function Process() {
  const [ref, v] = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <Tilt key={s.n} className="h-full">
          <div className="glass relative h-full p-6 pt-10 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:p-7 md:pt-11" style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(40px)", transitionDelay: `${i * 150}ms` }}>
            <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[0.85rem] shadow-[0_8px_20px_-8px_rgba(122,86,54,0.5)]">{s.n}</span>
            <h3 className="t-display text-[1.6rem] text-wood">{s.t}</h3>
            <p className="mt-3 text-[0.93rem] leading-relaxed text-sand">{s.d}</p>
          </div>
        </Tilt>
      ))}
    </div>
  );
}

/* ---------- faixa de vídeo: a entrega com chá da tarde ---------- */
export function VideoBanner() {
  const ref = usePlayInView(0.4);
  return (
    <div className="relative overflow-hidden rounded-[22px] bg-ink text-paper">
      <video ref={ref} className="h-[24rem] w-full object-cover md:h-[34rem]" src={asset("/vid/cha-p.mp4")} poster={asset("/vid/cha.webp")} muted loop playsInline preload="none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,22,0.75),rgba(28,25,22,0.15))]" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        <h2 className="t-display max-w-[14ch] text-[clamp(2rem,4.6vw,3.8rem)]">Seu espaço dos sonhos começa aqui.</h2>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.95rem] text-paper/85">Um chá da tarde para celebrar a entrega de um apartamento.</p>
            <a href="#contato" className="btn btn-light mt-4">
              Agendar conversa
            </a>
          </div>
          <button type="button" onClick={() => openVideo("cha", "Entrega com chá da tarde")} className="group flex h-20 w-20 items-center justify-center rounded-full border border-paper/50 backdrop-blur-sm transition-transform hover:scale-110" aria-label="Assistir ao vídeo da entrega" data-cursor="Assistir">
            <span className="ml-1 text-[1.4rem]">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- destaques do Instagram como stories ---------- */
export function Highlights() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:gap-7 md:px-0">
        {stories.map((s, k) => (
          <button key={s.slug} type="button" onClick={() => setOpen(k)} className="group flex w-[5.6rem] shrink-0 flex-col items-center gap-2" data-cursor="Ver">
            <span className="relative flex h-[5.4rem] w-[5.4rem] items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-[conic-gradient(#8b6240,#c89c72,#6e7550,#8b6240)] transition-transform duration-700 group-hover:animate-[ringSpin_3s_linear_infinite]" />
              <span className="absolute inset-[3px] rounded-full bg-paper" />
              <span className="relative h-[4.6rem] w-[4.6rem] overflow-hidden rounded-full">
                <Image src={asset(s.cover)} alt="" fill quality={75} sizes="74px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </span>
            </span>
            <span className="text-center text-[0.78rem] leading-tight">{s.title}</span>
          </button>
        ))}
      </div>
      {open !== null && <StoryViewer start={open} onClose={close} />}
    </>
  );
}

function StoryViewer({ start, onClose }: { start: number; onClose: () => void }) {
  const [g, setG] = useState(start);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const s: Story = stories[g];
  const item = s.items[i];
  const next = useCallback(() => {
    if (i < s.items.length - 1) setI(i + 1);
    else if (g < stories.length - 1) {
      setG(g + 1);
      setI(0);
    }
    else onClose();
  }, [i, g, s.items.length, onClose]);
  const prev = useCallback(() => {
    if (i > 0) setI(i - 1);
    else if (g > 0) {
      setG(g - 1);
      setI(0);
    }
  }, [i, g]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    },
    [next, prev],
  );
  useLayer(true, onClose, keys);
  // fotos avançam sozinhas em 5 s; vídeos avançam quando terminam
  useEffect(() => {
    if (item.t !== "i" || paused) return;
    const id = setTimeout(next, 5000);
    return () => clearTimeout(id);
  }, [item, paused, next]);
  return (
    <div className="fixed inset-0 z-[80] flex animate-[fadeUp_0.35s_both] items-center justify-center bg-ink/96 text-paper" role="dialog" aria-modal="true" aria-label={`Destaque ${s.title}`}>
      <button type="button" onClick={onClose} className="btn absolute left-4 top-4 z-10 border border-paper/25 py-2 text-[0.8rem] md:left-8 md:top-8">
        ← Voltar
      </button>
      <div className="relative aspect-[9/16] h-[min(88vh,calc(100vw*16/9))] max-w-full overflow-hidden rounded-[16px] bg-[#000]" onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)} onPointerLeave={() => setPaused(false)}>
        <div className="absolute inset-x-3 top-3 z-10 flex gap-1">
          {s.items.map((_, k) => (
            <span key={k} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-paper/30">
              {k < i && <span className="absolute inset-0 bg-paper" />}
              {k === i && item.t === "i" && <span key={`${g}-${i}`} className="absolute inset-0 origin-left animate-[fill_5s_linear_both] bg-paper" style={{ animationPlayState: paused ? "paused" : "running" }} />}
              {k === i && item.t === "v" && <span className="absolute inset-0 bg-paper/70" />}
            </span>
          ))}
        </div>
        <p className="absolute left-4 top-7 z-10 flex items-center gap-2 text-[0.82rem] drop-shadow">
          <span className="relative h-7 w-7 overflow-hidden rounded-full">
            <Image src={asset(s.cover)} alt="" fill sizes="28px" quality={60} className="object-cover" />
          </span>
          {s.title}
        </p>
        {item.t === "i" ? (
          <Image key={item.src} src={asset(item.src)} alt={`${s.title}: story ${i + 1}`} fill unoptimized className="animate-[fadeUp_0.3s_both] object-cover" />
        ) : (
          <video key={item.src} className="absolute inset-0 h-full w-full object-cover" src={asset(item.src)} poster={asset(item.poster)} autoPlay muted playsInline onEnded={next} />
        )}
        <button type="button" onClick={prev} className="absolute inset-y-0 left-0 w-1/3" aria-label="Story anterior" />
        <button type="button" onClick={next} className="absolute inset-y-0 right-0 w-2/3" aria-label="Próximo story" />
      </div>
    </div>
  );
}

/* ---------- reels ---------- */
export function Reels() {
  const row = useRef<HTMLDivElement>(null);
  const scrollBy = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className="flex h-11 w-11 rotate-180 items-center justify-center rounded-full border border-line hover:border-cream" aria-label="Vídeos anteriores">
          <IconRight className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper" aria-label="Próximos vídeos">
          <IconRight className="h-4 w-4" />
        </button>
      </div>
      <div ref={row} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {reels.map((x) => (
          <ReelCard key={x.id} x={x} />
        ))}
      </div>
    </>
  );
}

function ReelCard({ x }: { x: (typeof reels)[number] }) {
  const ref = usePlayInView(0.6);
  return (
    <Tilt className="shrink-0 snap-start">
      <button type="button" onClick={() => openVideo(x.id, x.title)} data-cursor="Assistir" className="group relative block aspect-[9/16] w-[62vw] max-w-[16rem] overflow-hidden rounded-[18px] bg-coal text-left text-paper sm:w-[14.5rem]">
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={asset(`/vid/${x.id}-p.mp4`)} poster={asset(`/vid/${x.id}.webp`)} muted loop playsInline preload="none" />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(28,25,22,0.88)_100%)]" />
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-[0.7rem] text-ink">▶</span>
        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="block text-[0.7rem] text-paper/75">{x.tag}</span>
          <span className="font-display mt-0.5 block text-[1.15rem] uppercase leading-tight">{x.title}</span>
        </span>
      </button>
    </Tilt>
  );
}

/* ---------- depoimentos: cartões de vidro em faixa corrida ---------- */
export function Testimonials() {
  return (
    <div className="overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" aria-label="Depoimentos de clientes">
      <div className="flex w-max animate-[marquee_45s_linear_infinite] gap-5 hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 gap-5" aria-hidden={k === 1}>
            {testimonials.map((t, j) => (
              <figure key={j} className="glass w-[20rem] shrink-0 p-6 md:w-[23rem]">
                <div className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image src={asset(t.img)} alt="" fill quality={60} sizes="44px" className="object-cover" />
                  </span>
                  <span>
                    <span className="font-display block text-[1.1rem] uppercase leading-none">{t.name}</span>
                    <span className="mt-1 block text-[0.75rem] text-sand">{t.about}</span>
                  </span>
                </div>
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[#3d3731]">“{t.text}”</blockquote>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- perguntas ---------- */
export function Faq() {
  const [open, setOpen] = useState(-1);
  return (
    <div className="mx-auto max-w-[40rem] space-y-3">
      {faq.map((f, i) => (
        <div key={f.q} className="glass overflow-hidden">
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left">
            <span className="text-[0.98rem]">{f.q}</span>
            <IconPlus className={`h-4 w-4 shrink-0 transition-transform duration-500 ${open === i ? "rotate-45" : ""}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-500 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <p className="overflow-hidden px-5 text-[0.93rem] leading-relaxed text-sand">
              <span className="block pb-5">{f.a}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- contato: três cartões e formulário que abre o WhatsApp ---------- */
const kinds = ["Apartamento", "Casa", "Espaço comercial", "Retrofit", "Mobiliário"];
export function Contact() {
  const [f, setF] = useState({ nome: "", tipo: kinds[0], msg: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));
  const field = "mt-1.5 w-full rounded-[12px] border border-line bg-white/70 px-4 py-3 text-[0.95rem] outline-none transition-colors placeholder:text-[#7a7168] focus:border-wood";
  const cards = [
    { icon: <IconPhone className="h-5 w-5" />, t: "Telefone", v: studio.phone, href: studio.whatsapp },
    { icon: <IconPin className="h-5 w-5" />, t: "Escritório", v: `${studio.address}, ${studio.city}`, href: studio.maps },
    { icon: <IconInstagram className="h-5 w-5" />, t: "Instagram", v: studio.handle, href: studio.instagram },
  ];
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <Tilt key={c.t}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="glass flex flex-col items-center px-5 py-7 text-center transition-colors hover:bg-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-wood shadow-[0_8px_20px_-8px_rgba(122,86,54,0.5)]">{c.icon}</span>
              <span className="t-display mt-4 text-[1.25rem] text-wood">{c.t}</span>
              <span className="mt-1 text-[0.95rem]">{c.v}</span>
            </a>
          </Tilt>
        ))}
      </div>
      <form
        className="glass mx-auto mt-8 grid max-w-[44rem] gap-4 p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          window.open(whatsappLink(`Olá, Marília! Vim pelo site.\nNome: ${f.nome}\nProjeto: ${f.tipo}\n${f.msg}`), "_blank", "noopener");
        }}
      >
        <label className="text-[0.8rem] text-sand">
          Nome
          <input required value={f.nome} onChange={set("nome")} placeholder="Seu nome" className={field} />
        </label>
        <fieldset>
          <legend className="text-[0.8rem] text-sand">Tipo de projeto</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button key={k} type="button" onClick={() => setF((v) => ({ ...v, tipo: k }))} aria-pressed={f.tipo === k} className={`rounded-full border px-3.5 py-1.5 text-[0.84rem] transition-colors ${f.tipo === k ? "border-ink bg-ink text-paper" : "border-line bg-white/60 hover:border-ink"}`}>
                {k}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="text-[0.8rem] text-sand">
          Conte sobre o seu espaço
          <textarea value={f.msg} onChange={set("msg")} rows={4} placeholder="Bairro, metragem, prazo, o que você sonha..." className={`${field} resize-none`} />
        </label>
        <button type="submit" className="btn btn-dark justify-center">
          <IconWhatsapp className="h-4 w-4" /> Enviar pelo WhatsApp
        </button>
      </form>
    </div>
  );
}

/* ---------- galeria em mosaico: quadros de vários projetos, lado a lado e em colunas de alturas diferentes ---------- */
export function Mosaic() {
  const [all, setAll] = useState(false);
  const list = all ? mosaic : mosaic.slice(0, 16);
  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {list.map((m, k) => (
          <MosaicTile key={m.src} m={m} k={k} />
        ))}
      </div>
      {!all && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={() => setAll(true)} className="btn btn-dark">
            Ver mais fotos <IconPlus className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </>
  );
}

function MosaicTile({ m, k }: { m: (typeof mosaic)[number]; k: number }) {
  const [ref, v] = useInView<HTMLButtonElement>(0.15);
  const p = byId(m.project);
  const [w, h] = sizes[m.src] ?? [1440, 1800];
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => (m.video ? openVideo(m.video[0], m.video[1]) : openProject(m.project, m.k))}
      data-cursor={m.video ? "Assistir" : "Ampliar"}
      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[14px] bg-coal text-left transition-[opacity,transform] duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] md:mb-4"
      style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(40px) scale(0.97)", transitionDelay: `${(k % 4) * 90}ms` }}
    >
      <Image src={asset(m.src)} alt={`${p.title}: foto do projeto`} width={w} height={h} quality={92} sizes="(min-width: 1024px) 290px, (min-width: 768px) 33vw, 50vw" className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
      <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(28,25,22,0.75)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-3 bottom-3 translate-y-2 text-paper opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block text-[0.65rem] tracking-[0.14em] uppercase opacity-80">{m.video ? "Vídeo" : p.kind}</span>
        <span className="font-display block text-[1.05rem] uppercase leading-tight">{p.title}</span>
      </span>
      {m.video && <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-[0.65rem] text-ink">▶</span>}
    </button>
  );
}
