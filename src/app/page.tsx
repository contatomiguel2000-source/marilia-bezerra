import Image from "next/image";
import { Cursor, RevealImage, SmoothScroll, Split } from "@/components/FX";
import { BackButton } from "@/components/Nav";
import { Counter, Reveal } from "@/components/Reveal";
import { Contact, Faq, Header, Hero, Highlights, Overlays, Partners, Process, Projects, Reels, Services, Testimonials, Tilt, VideoBanner } from "@/components/Site";
import { nav, stats, studio } from "@/lib/data";
import { asset } from "@/lib/base-path";
import { wrap } from "@/lib/ui";

/** Cabeçalho centralizado da referência: pílula, título em versalete e texto curto. */
function Head({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-[40rem] text-center md:mb-16">
      <span className="pill">{label}</span>
      <Split text={title} className="t-display t-h1 mx-auto mt-5" />
      {text && <p className="mx-auto mt-4 max-w-[32rem] leading-relaxed text-sand">{text}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <BackButton />
      <Header />
      <Overlays />
      <main>
        <Hero />

        <section className="relative z-10 bg-paper pb-14 pt-24 md:pt-28">
          <p className="mb-6 text-center text-[0.85rem] text-sand">Parceiros que assinam os projetos com o escritório</p>
          <Partners />
        </section>

        <section id="escritorio" data-title="O escritório" className="py-16 md:py-24">
          <div className={`${wrap} grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16`}>
            <Tilt max={5}>
              <RevealImage className="relative aspect-[4/5] overflow-hidden rounded-[22px]">
                <Image src={asset("/img/tbt-0.webp")} alt="Living integrado com vista, projeto Marília Bezerra" fill quality={92} sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
              </RevealImage>
            </Tilt>
            <div>
              <span className="pill">O escritório</span>
              <Split text="Um escritório de *escuta, detalhe e alma.*" className="t-display t-h1 mt-5" />
              <p className="mt-5 leading-relaxed text-sand">
                Em Natal, a arquiteta Marília Bezerra projeta casas, apartamentos e espaços comerciais que traduzem o estilo de vida de quem vai viver ali. Uma base neutra e atemporal, madeira, pedra e pontos de cor que trazem personalidade, sem excessos.
              </p>
              <figure className="glass mt-8 flex items-center gap-4 p-4">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image src={asset("/img/marilia.webp")} alt="A arquiteta Marília Bezerra" fill quality={85} sizes="64px" className="object-cover" />
                </span>
                <blockquote className="text-[0.95rem] leading-relaxed">
                  “Respiro a minha profissão 24 horas. Sou encantada com o que ela faz na vida das pessoas, criando lugares acolhedores e espaços funcionais.”
                  <span className="mt-1 block text-[0.78rem] text-sand">Marília Bezerra</span>
                </blockquote>
              </figure>
            </div>
          </div>
        </section>

        <section id="servicos" data-title="Serviços" className="tone-dark py-20 md:py-28">
          <div className={wrap}>
            <div className="mx-auto mb-12 max-w-[40rem] text-center md:mb-16">
              <span className="pill">O que fazemos</span>
              <Split text="Onde o *cuidado* encontra o projeto" className="t-display t-h1 mx-auto mt-5" />
              <p className="mx-auto mt-4 max-w-[30rem] leading-relaxed text-sand">Da casa inteira ao móvel que entra nela. Passe o mouse para ver cada frente do escritório.</p>
            </div>
            <Services />
          </div>
        </section>

        <section id="projetos" data-title="Projetos" className="overflow-hidden py-20 md:py-28">
          <div className={wrap}>
            <Head label="Projetos" title="Espaços com *alma e história*" text="Arraste, use as setas ou clique nas laterais. Abra o projeto para ver todas as imagens e os vídeos." />
          </div>
          <Projects />
        </section>

        <section className="py-10 md:py-14">
          <div className={`${wrap} glass grid grid-cols-2 gap-y-8 py-8 md:grid-cols-4`}>
            {stats.map((s) => (
              <Reveal key={s.label} className="text-center">
                <p className="t-display text-[clamp(2.4rem,4.5vw,3.6rem)] text-wood">
                  <Counter value={s.value} decimals={s.decimals ?? 0} />
                  {s.suffix}
                </p>
                <p className="mt-1 text-[0.8rem] text-sand">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="processo" data-title="Processo" className="py-20 md:py-28">
          <div className={wrap}>
            <Head label="Como trabalhamos" title="Do primeiro café *à entrega*" text="Um processo próximo e cuidadoso, do briefing à obra pronta." />
            <Process />
            <div className="mt-16">
              <VideoBanner />
            </div>
          </div>
        </section>

        <section id="bastidores" data-title="Bastidores" className="py-16 md:py-24">
          <div className={wrap}>
            <Head label="Destaques" title="Bastidores, obras *e viagens*" text="Os destaques do Instagram: obras em andamento, projetos entregues e a Design Week de Milão. Toque para abrir." />
            <Highlights />
          </div>
        </section>

        <section id="videos" data-title="Vídeos" className="overflow-hidden py-16 md:py-24">
          <div className={wrap}>
            <Head label="Vídeos" title="Percorra os *projetos*" text="Tours, detalhes de marcenaria e o depoimento de quem já vive o projeto. Toque para assistir com som." />
            <Reels />
          </div>
        </section>

        <section id="depoimentos" data-title="Clientes" className="overflow-hidden py-20 md:py-28">
          <div className={wrap}>
            <Head label="Clientes" title="O que dizem *de nós*" text={`Comentários no Instagram e avaliações no Google, onde o escritório tem nota ${studio.rating}.`} />
          </div>
          <Testimonials />
        </section>

        <section id="perguntas" data-title="Perguntas" className="py-16 md:py-24">
          <div className={wrap}>
            <Head label="Perguntas" title="Perguntas *frequentes*" text="O que mais nos perguntam antes de começar um projeto." />
            <Faq />
          </div>
        </section>

        <section id="contato" data-title="Contato" className="relative py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(234,203,168,0.4),transparent_70%)]" />
          <div className={`${wrap} relative`}>
            <Head label="Comece seu projeto" title="Todo grande espaço começa com *uma conversa*" text="Conte sobre o seu apartamento, casa ou loja. Estamos prontos para ouvir." />
            <Contact />
          </div>
        </section>
      </main>

      <footer className="tone-dark">
        <div className={`${wrap} grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]`}>
          <div>
            <p className="font-display text-[1.5rem] uppercase">Marília Bezerra</p>
            <p className="mt-1 text-[0.7rem] tracking-[0.22em] text-sand uppercase">Arquitetura e Interiores</p>
            <p className="mt-4 max-w-[22rem] text-[0.9rem] leading-relaxed text-sand">
              {studio.slogan} {studio.sub}
            </p>
          </div>
          <nav aria-label="Rodapé">
            <p className="text-[0.75rem] text-sand">Navegue</p>
            <ul className="mt-3 space-y-1.5 text-[0.92rem]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-woodlight">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[0.92rem]">
            <p className="text-[0.75rem] text-sand">Contato</p>
            <p className="mt-3">
              <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-woodlight">
                {studio.phone}
              </a>
            </p>
            <p className="mt-1 text-sand">
              {studio.address}
              <br />
              {studio.city}
            </p>
            <p className="mt-1">
              <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-woodlight">
                Instagram
              </a>
            </p>
          </div>
        </div>
        <div className={`${wrap} flex flex-wrap justify-between gap-3 border-t border-line py-5 text-[0.78rem] text-sand`}>
          <p>© 2026 {studio.full}</p>
          <a href="#inicio" className="hover:text-cream">
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </>
  );
}
