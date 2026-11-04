/*
  Conteúdo real da Marília Bezerra: Instagram @mariliabezerraarquiteta (154 posts recentes lidos, 14 destaques),
  comentários dos posts, post do cliente Thalyson Salvino e ficha "Marília Bezerra Interiores" no Google Maps.
  Fotos em public/img (resolução original), reels em public/vid, destaques em public/st (ver stories.ts).
*/

export const studio = {
  name: "Marília Bezerra",
  full: "Marília Bezerra Arquitetura e Interiores",
  slogan: "Arquitetura que traduz estilo de vida.",
  sub: "Interiores com alma e história.",
  instagram: "https://www.instagram.com/mariliabezerraarquiteta/",
  handle: "@mariliabezerraarquiteta",
  phone: "(84) 99900-8534",
  whatsapp: "https://wa.me/5584999008534",
  office: "(84) 3222-2449",
  address: "Av. Rodrigues Alves, 1268 · Petrópolis",
  city: "Natal · RN",
  maps: "https://www.google.com/maps/place/Mar%C3%ADlia+Bezerra+Interiores/@-5.7986229,-35.2027689,17z",
  rating: "4,5",
  reviews: 14,
};

export const nav = [
  { href: "#escritorio", label: "O escritório" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#depoimentos", label: "Clientes" },
  { href: "#contato", label: "Contato" },
];

export type Project = {
  id: string;
  title: string;
  kind: string;
  place: string;
  text: string;
  cover: string;
  shots: string[];
  videos?: string[];
};

const seq = (name: string, n: number) => Array.from({ length: n }, (_, i) => `/img/${name}-${i}.webp`);

export const projects: Project[] = [
  {
    id: "mar",
    title: "Apê da cor do mar",
    kind: "Interiores",
    place: "Natal",
    text: "Detalhes, funcionalidade e a personalidade dos clientes numa sala de frente para o mar: estofados orgânicos, madeira clara e telas em tons de verde e azul.",
    cover: "/img/mar-0.webp",
    shots: seq("mar", 11),
    videos: ["sonhos"],
  },
  {
    id: "tbt",
    title: "Apartamento com vista",
    kind: "Interiores",
    place: "Natal",
    text: "Um apartamento que une modernidade e atemporalidade, com vista privilegiada e ambientes totalmente integrados. Um daqueles projetos que marcam.",
    cover: "/img/tbt-0.webp",
    shots: seq("tbt", 18),
  },
  {
    id: "entrelinhas",
    title: "Coleção Entrelinhas",
    kind: "Mobiliário autoral · B&S Conforto",
    place: "Natal",
    text: "Móveis criados pelo escritório: o estofado Elo, em módulos que se combinam de várias maneiras; as mesas Orvalho, do encontro da leveza com a pedra bruta; e a cama Horizonte.",
    cover: "/img/elo-0.webp",
    shots: [...seq("elo", 10), ...seq("elo-living", 4), ...seq("vitrine", 3)],
    videos: ["entrelinhas"],
  },
  {
    id: "sierra",
    title: "Loja Sierra Móveis Natal",
    kind: "Arquitetura comercial",
    place: "Natal",
    text: "Meses de planejamento, escolhas e curadoria para criar uma loja atemporal e cheia de personalidade, com identidade criada pelo escritório e inaugurada em 2026.",
    cover: "/img/sierra-0.webp",
    shots: seq("sierra", 5),
    videos: ["sierra"],
  },
  {
    id: "amigos",
    title: "Retrofit para amigos",
    kind: "Interiores · retrofit",
    place: "Natal",
    text: "O apartamento de amigos de longa data. Um retrofit que preserva boas escolhas e materiais atemporais, com uma nova leitura para deixar os ambientes mais atuais.",
    cover: "/img/c-amigos.webp",
    shots: ["/img/c-amigos.webp"],
    videos: ["amigos"],
  },
  {
    id: "casa",
    title: "Casa contemporânea",
    kind: "Arquitetura",
    place: "Natal",
    text: "Volumes bem definidos, madeira, pedra e grandes panos de vidro. Uma casa de muitos ângulos, emoldurada pelo paisagismo.",
    cover: "/img/casa-0.webp",
    shots: seq("casa", 6),
  },
  {
    id: "living45",
    title: "Living de 45 m²",
    kind: "Interiores",
    place: "Natal",
    text: "Integração, conforto e funcionalidade em 45 m². Quando o projeto é bem resolvido, cada metro é aproveitado de forma inteligente, sem excessos e sem perder personalidade.",
    cover: "/img/c-living45.webp",
    shots: ["/img/c-living45.webp"],
    videos: ["living45"],
  },
  {
    id: "residencia",
    title: "Residência pedra e vidro",
    kind: "Arquitetura",
    place: "Natal",
    text: "Linhas puras, luz, ventilação e conexão com a natureza. Pedra natural, madeira e grandes panos de vidro, com a área de lazer integrada aos ambientes internos.",
    cover: "/img/residencia-0.webp",
    shots: seq("residencia", 4),
  },
  {
    id: "gourmet",
    title: "Espaço gourmet Issa Hazbun",
    kind: "Área comum de residencial",
    place: "Natal",
    text: "Um espaço pensado além da estética: durabilidade, funcionalidade, conforto acústico e uma linguagem visual bem resolvida, para receber e ser vivido pelos condôminos.",
    cover: "/img/c-gourmet.webp",
    shots: ["/img/c-gourmet.webp"],
    videos: ["gourmet"],
  },
  {
    id: "fluido",
    title: "Apartamento fluido",
    kind: "Interiores",
    place: "Natal",
    text: "Fluido, leve e aconchegante, concebido para receber a família e os amigos.",
    cover: "/img/fluido-0.webp",
    shots: [...seq("fluido", 4), ...seq("varanda", 3), ...seq("detalhes", 2)],
  },
  {
    id: "musica",
    title: "Sala da música",
    kind: "Interiores",
    place: "Natal",
    text: "Para um cliente apaixonado por música e tecnologia: som de altíssima qualidade, TVs bem posicionadas e um lugar especial para os vinis e a vitrola.",
    cover: "/img/c-musica.webp",
    shots: ["/img/c-musica.webp"],
    videos: ["musica"],
  },
  {
    id: "treze",
    title: "Treze anos depois",
    kind: "Interiores · atualização",
    place: "Natal",
    text: "Um apartamento feito há 13 anos e atualizado, conservando piso, teto, móveis, quadros e adornos que fazem parte da história de vida dos clientes.",
    cover: "/img/treze-0.webp",
    shots: seq("treze", 4),
  },
  {
    id: "areia",
    title: "Apartamento em Areia Preta",
    kind: "Interiores",
    place: "Areia Preta · Natal",
    text: "Voltar ao projeto e ver cada ambiente refletir a essência de quem mora ali: madeira, mesa posta e o mar de Natal pela janela.",
    cover: "/img/c-areia.webp",
    shots: ["/img/c-areia.webp"],
    videos: ["areia"],
  },
];

export const byId = (id: string) => projects.find((p) => p.id === id)!;

export const heroCards = ["/img/c-muxarabi.webp", "/img/c-estantes.webp", "/img/c-sonhos.webp", "/img/c-mesa.webp", "/img/mar-1.webp"];

export const partners = ["Officina Interiores", "B&S Conforto", "Bontempo", "Florense", "Todeschini", "Lyra Móveis", "Martex Home", "Sierra Móveis", "Quanta Iluminação", "Companhia do Mármore"];

export const services = [
  { n: "01", t: "Arquitetura residencial", d: "Casas em condomínio, de praia e de campo, do partido às fachadas.", img: "/img/residencia-1.webp" },
  { n: "02", t: "Interiores", d: "Apartamentos e retrofits com base atemporal, pontos de cor e marcenaria sob medida.", img: "/img/mar-3.webp" },
  { n: "03", t: "Espaços comerciais", d: "Lojas, salões, clínicas e consultórios que viram experiência para quem entra.", img: "/img/sierra-0.webp" },
  { n: "04", t: "Mobiliário autoral", d: "A coleção Entrelinhas: sofá Elo, mesas Orvalho e cama Horizonte, na B&S Conforto.", img: "/img/elo-2.webp" },
];

export const steps = [
  { n: "1", t: "Escuta e briefing", d: "Cada projeto nasce de muitas conversas, escuta atenta e respeito à personalidade, ao estilo e aos desejos de quem vai viver o espaço." },
  { n: "2", t: "Conceito e escolhas", d: "Um processo de escolhas e ajustes alinhados entre o que o escritório idealiza e o que o cliente sonha: materiais, luz, cor e marcenaria." },
  { n: "3", t: "Obra e entrega", d: "Acompanhamos do início ao fim, com visitas de obra, até chegar exatamente ao resultado planejado. E a entrega vira celebração." },
];

export const stats = [
  { value: 19, suffix: "+", label: "Anos de projetos" },
  { value: 52.8, suffix: " mil", label: "Seguidores", decimals: 1 },
  { value: 4.5, suffix: "", label: `No Google (${studio.reviews} avaliações)`, decimals: 1 },
  { value: 3, suffix: "", label: "Edições da Design Week de Milão" },
];

export const testimonials = [
  { name: "Thalyson Salvino", about: "Thalyson Salvino Cabeleireiros", text: "Mais do que minha arquiteta, ela se tornou parte da minha história, alguém que caminhou ao meu lado em cada fase do crescimento, sempre com sensibilidade, excelência e amor pelo que faz.", img: "/vid/salao.webp" },
  { name: "Cliente do apartamento", about: "Na entrega, comentário no Instagram", text: "Marília, seria redundante eu agradecer e dizer o quanto você já faz parte das nossas vidas, pois em cada projeto deixa muito de você!", img: "/vid/cha.webp" },
  { name: "Lucas", about: "Avaliação no Google", text: "Ótimo serviço. A melhor que já conheci. Muito bom gosto!", img: "/img/mar-2.webp" },
  { name: "Lúcia", about: "Comentário no Instagram", text: "Tudo que ela faz satisfaz, geralmente excede nossas expectativas.", img: "/img/c-izabelle.webp" },
  { name: "Mary", about: "Avaliação no Google", text: "Uma excelente profissional, trabalho maravilhoso.", img: "/img/tbt-2.webp" },
  { name: "Gabriel", about: "Corretor do imóvel, no Instagram", text: "O apartamento ficou simplesmente sensacional!", img: "/img/fluido-0.webp" },
  { name: "Hellu", about: "Avaliação no Google", text: "Excelente profissional, com muito bom gosto.", img: "/img/treze-0.webp" },
];

export const reels = [
  { id: "izabelle", title: "Depoimento da Izabelle", tag: "Cliente" },
  { id: "estantes", title: "Estantes com memória", tag: "Detalhes" },
  { id: "muxarabi", title: "Porta em muxarabi", tag: "Detalhes" },
  { id: "backstage", title: "Backstage de obra", tag: "Obra" },
  { id: "cristaleira", title: "Cristaleira vazada", tag: "Detalhes" },
  { id: "retrofit", title: "Retrofit com cor", tag: "Antes e depois" },
  { id: "alegria", title: "Um lar que foge do óbvio", tag: "Interiores" },
  { id: "salao", title: "Salão Thalyson Salvino", tag: "Comercial" },
  { id: "mesa", title: "Mesa posta", tag: "Ambientação" },
  { id: "sonhos", title: "Um apê de sonhos", tag: "Interiores" },
];

export const faq = [
  { q: "Vocês fazem arquitetura e interiores?", a: "Sim. Casas em condomínio, de praia e de campo, apartamentos, retrofits e espaços comerciais como lojas, salões, clínicas e consultórios." },
  { q: "Fazem retrofit de apartamento?", a: "Sim. Atualizamos os espaços preservando o que segue atemporal, como pisos de mármore, móveis e peças com história, e trazemos uma nova leitura para os ambientes." },
  { q: "O escritório acompanha a obra?", a: "Sim. Acompanhamos do início ao fim, com visitas de obra e a definição dos últimos detalhes e da decoração, até a entrega." },
  { q: "Atendem casas de praia?", a: "Sim. Já projetamos em Pirangi, Tibau do Sul e Areia Preta, entre outros lugares do litoral potiguar." },
  { q: "O escritório tem móveis próprios?", a: "Sim. A coleção Entrelinhas, criada pela Marília e vendida na B&S Conforto: sofá Elo, mesas Orvalho e cama Horizonte." },
  { q: "Como agendo uma conversa?", a: `Pelo telefone ou WhatsApp ${studio.phone}, ou pelo formulário desta página, que abre a mensagem pronta.` },
];

/* galeria em mosaico: fotos de vários projetos; "k" é a posição da foto dentro do projeto (abre o visualizador nela).
   Capas de reel abrem o vídeo ("video": [id, título]). */
export const mosaic: { src: string; project: string; k: number; video?: [string, string] }[] = [
  { src: "/img/mar-1.webp", project: "mar", k: 1 },
  { src: "/img/c-estantes.webp", project: "fluido", k: 0, video: ["estantes", "Estantes com memória"] },
  { src: "/img/tbt-3.webp", project: "tbt", k: 3 },
  { src: "/img/elo-1.webp", project: "entrelinhas", k: 1 },
  { src: "/img/casa-1.webp", project: "casa", k: 1 },
  { src: "/img/mar-5.webp", project: "mar", k: 5 },
  { src: "/img/c-muxarabi.webp", project: "amigos", k: 0, video: ["muxarabi", "Porta em muxarabi"] },
  { src: "/img/tbt-7.webp", project: "tbt", k: 7 },
  { src: "/img/sierra-1.webp", project: "sierra", k: 1 },
  { src: "/img/residencia-2.webp", project: "residencia", k: 2 },
  { src: "/img/elo-living-0.webp", project: "entrelinhas", k: 10 },
  { src: "/img/varanda-1.webp", project: "fluido", k: 5 },
  { src: "/img/mar-8.webp", project: "mar", k: 8 },
  { src: "/img/c-mesa.webp", project: "areia", k: 0, video: ["mesa", "Mesa posta"] },
  { src: "/img/tbt-11.webp", project: "tbt", k: 11 },
  { src: "/img/treze-1.webp", project: "treze", k: 1 },
  { src: "/img/casa-3.webp", project: "casa", k: 3 },
  { src: "/img/elo-5.webp", project: "entrelinhas", k: 5 },
  { src: "/img/fluido-2.webp", project: "fluido", k: 2 },
  { src: "/img/mar-9.webp", project: "mar", k: 9 },
  { src: "/img/sierra-2.webp", project: "sierra", k: 2 },
  { src: "/img/tbt-15.webp", project: "tbt", k: 15 },
  { src: "/img/vitrine-0.webp", project: "entrelinhas", k: 14 },
  { src: "/img/c-cristaleira.webp", project: "fluido", k: 0, video: ["cristaleira", "Cristaleira vazada"] },
  { src: "/img/residencia-0.webp", project: "residencia", k: 0 },
  { src: "/img/detalhes-0.webp", project: "fluido", k: 7 },
  { src: "/img/tbt-5.webp", project: "tbt", k: 5 },
  { src: "/img/mar-10.webp", project: "mar", k: 10 },
  { src: "/img/treze-3.webp", project: "treze", k: 3 },
  { src: "/img/elo-8.webp", project: "entrelinhas", k: 8 },
  { src: "/img/casa-5.webp", project: "casa", k: 5 },
  { src: "/img/tbt-17.webp", project: "tbt", k: 17 },
];
