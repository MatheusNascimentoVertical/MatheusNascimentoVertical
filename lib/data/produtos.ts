export type Tamanho = "PP" | "P" | "M" | "G" | "GG" | "XG";

export interface Variante {
  tamanho: Tamanho;
  cor?: string;
  estoque: number;
}

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  categoria: string;
  categoriaSlug: string;
  precoVarejo: number;
  precoAtacado: number;
  precoPromocional?: number;
  imagens: string[];
  variantes: Variante[];
  destaque: boolean;
  novo: boolean;
  copa: boolean;
  tags: string[];
}

export interface Categoria {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  icone: string;
  cor: string;
}

export const categorias: Categoria[] = [
  { id: "1", slug: "camisetas", nome: "Camisetas", descricao: "Básicas e estampadas", icone: "👕", cor: "#1a2654" },
  { id: "2", slug: "times", nome: "Times", descricao: "Camisas de time oficiais e réplicas", icone: "⚽", cor: "#009c3b" },
  { id: "3", slug: "conjuntos", nome: "Conjuntos", descricao: "Sets completos esportivos", icone: "🤸", cor: "#d4a93a" },
  { id: "4", slug: "bermudas", nome: "Bermudas", descricao: "Shorts e bermudas casuais", icone: "🩳", cor: "#1a2654" },
  { id: "5", slug: "polos", nome: "Polos", descricao: "Polo lisa e texturizada", icone: "👔", cor: "#0f1424" },
  { id: "6", slug: "tenis", nome: "Tênis", descricao: "Calçados e acessórios", icone: "👟", cor: "#161b2e" },
];

export const produtos: Produto[] = [
  {
    id: "1",
    slug: "polo-texturizada-branca",
    nome: "Polo Texturizada Premium",
    descricao: "Camisa polo texturizada de alta qualidade. Tecido premium com toque suave, ideal para looks casuais e semi-formais. Disponível em várias cores.",
    categoria: "Polos",
    categoriaSlug: "polos",
    precoVarejo: 89.90,
    precoAtacado: 54.00,
    imagens: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 8 },
      { tamanho: "G", estoque: 6 },
      { tamanho: "GG", estoque: 3 },
      { tamanho: "XG", estoque: 2 },
    ],
    destaque: true,
    novo: true,
    copa: false,
    tags: ["polo", "premium", "casual"],
  },
  {
    id: "2",
    slug: "conjunto-esportivo-verde-preto",
    nome: "Conjunto Esportivo Verde/Preto",
    descricao: "Conjunto completo com camiseta e bermuda esportiva. Material dry-fit respirável, perfeito para treinos ou looks casuais.",
    categoria: "Conjuntos",
    categoriaSlug: "conjuntos",
    precoVarejo: 129.90,
    precoAtacado: 78.00,
    imagens: [
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 4, cor: "Verde/Preto" },
      { tamanho: "M", estoque: 7, cor: "Verde/Preto" },
      { tamanho: "G", estoque: 5, cor: "Verde/Preto" },
      { tamanho: "GG", estoque: 3, cor: "Verde/Preto" },
    ],
    destaque: true,
    novo: false,
    copa: false,
    tags: ["conjunto", "esportivo", "dry-fit"],
  },
  {
    id: "3",
    slug: "camisa-brasil-copa-2026",
    nome: "Camisa Brasil Copa 2026",
    descricao: "Vista a seleção! Camisa verde e amarela estilo Copa do Mundo 2026. Material premium, bordado detalhado, perfeito para torcer pelo Brasil.",
    categoria: "Times",
    categoriaSlug: "times",
    precoVarejo: 149.90,
    precoAtacado: 90.00,
    imagens: [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
    ],
    variantes: [
      { tamanho: "PP", estoque: 2 },
      { tamanho: "P", estoque: 6 },
      { tamanho: "M", estoque: 10 },
      { tamanho: "G", estoque: 8 },
      { tamanho: "GG", estoque: 5 },
      { tamanho: "XG", estoque: 3 },
    ],
    destaque: true,
    novo: true,
    copa: true,
    tags: ["brasil", "copa", "seleção", "futebol"],
  },
  {
    id: "4",
    slug: "camiseta-basica-branca",
    nome: "Camiseta Básica Over Branca",
    descricao: "Camiseta básica oversized em algodão premium. Corte moderno, caimento perfeito. A base de qualquer look masculino.",
    categoria: "Camisetas",
    categoriaSlug: "camisetas",
    precoVarejo: 59.90,
    precoAtacado: 36.00,
    imagens: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 10 },
      { tamanho: "M", estoque: 15 },
      { tamanho: "G", estoque: 12 },
      { tamanho: "GG", estoque: 8 },
      { tamanho: "XG", estoque: 4 },
    ],
    destaque: true,
    novo: false,
    copa: false,
    tags: ["básica", "oversized", "algodão"],
  },
  {
    id: "5",
    slug: "bermuda-cargo-preta",
    nome: "Bermuda Cargo Preta",
    descricao: "Bermuda cargo com bolsos laterais. Tecido resistente e confortável, estilo urbano autêntico.",
    categoria: "Bermudas",
    categoriaSlug: "bermudas",
    precoVarejo: 89.90,
    precoAtacado: 54.00,
    imagens: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 4 },
      { tamanho: "M", estoque: 8 },
      { tamanho: "G", estoque: 6 },
      { tamanho: "GG", estoque: 4 },
    ],
    destaque: false,
    novo: false,
    copa: false,
    tags: ["cargo", "bermuda", "urbano"],
  },
  {
    id: "6",
    slug: "conjunto-bege-short",
    nome: "Conjunto Casual Bege",
    descricao: "Set camiseta + short em tom bege terroso. Visual minimalista e sofisticado para o dia a dia.",
    categoria: "Conjuntos",
    categoriaSlug: "conjuntos",
    precoVarejo: 119.90,
    precoAtacado: 72.00,
    imagens: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 5 },
      { tamanho: "M", estoque: 9 },
      { tamanho: "G", estoque: 7 },
      { tamanho: "GG", estoque: 3 },
    ],
    destaque: true,
    novo: false,
    copa: false,
    tags: ["casual", "minimalista", "conjunto"],
  },
  {
    id: "7",
    slug: "camiseta-preta-ringer",
    nome: "Camiseta Ringer Preta/Branca",
    descricao: "Camiseta ringer style com gola e mangas com frisos brancos. Estilo retrô com toque moderno.",
    categoria: "Camisetas",
    categoriaSlug: "camisetas",
    precoVarejo: 69.90,
    precoAtacado: 42.00,
    imagens: [
      "https://images.unsplash.com/photo-1503341338985-95a1421ec3b5?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 6 },
      { tamanho: "M", estoque: 10 },
      { tamanho: "G", estoque: 8 },
      { tamanho: "GG", estoque: 5 },
    ],
    destaque: false,
    novo: true,
    copa: false,
    tags: ["ringer", "retrô", "camiseta"],
  },
  {
    id: "8",
    slug: "polo-verde-musgo",
    nome: "Polo Verde Musgo",
    descricao: "Camisa polo na cor verde musgo. Elegância casual que nunca sai de moda.",
    categoria: "Polos",
    categoriaSlug: "polos",
    precoVarejo: 89.90,
    precoAtacado: 54.00,
    imagens: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    ],
    variantes: [
      { tamanho: "P", estoque: 3 },
      { tamanho: "M", estoque: 6 },
      { tamanho: "G", estoque: 5 },
      { tamanho: "GG", estoque: 2 },
    ],
    destaque: false,
    novo: false,
    copa: false,
    tags: ["polo", "verde", "casual"],
  },
];

export function getProdutoBySlug(slug: string): Produto | undefined {
  return produtos.find((p) => p.slug === slug);
}

export function getProdutosByCategoria(categoriaSlug: string): Produto[] {
  return produtos.filter((p) => p.categoriaSlug === categoriaSlug);
}

export function getProdutosDestaque(): Produto[] {
  return produtos.filter((p) => p.destaque);
}

export function getProdutosCopa(): Produto[] {
  return produtos.filter((p) => p.copa);
}
