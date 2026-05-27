const WHATSAPP_PAIZAO = "5561999999999";

export interface ItemCarrinho {
  nome: string;
  tamanho: string;
  cor?: string;
  quantidade: number;
  preco: number;
}

export function gerarLinkWhatsApp(itens: ItemCarrinho[], observacoes?: string): string {
  const total = itens.reduce((s, i) => s + i.preco * i.quantidade, 0);

  const linhas = [
    "🛍️ *NOVO PEDIDO — PAIZÃO MODAS*",
    "",
    ...itens.map(
      (item, i) =>
        `${i + 1}. ${item.nome}\n   Tamanho: ${item.tamanho}${item.cor ? ` | Cor: ${item.cor}` : ""} | Qtd: ${item.quantidade}\n   R$ ${item.preco.toFixed(2)}`
    ),
    "",
    `*Total: R$ ${total.toFixed(2)}*`,
    "",
    observacoes ? `📝 Observações: ${observacoes}` : "",
    "",
    "Quero finalizar o pedido!",
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  return `https://wa.me/${WHATSAPP_PAIZAO}?text=${encodeURIComponent(linhas)}`;
}

export function gerarLinkProduto(nome: string, preco: number): string {
  const msg = `Olá! Tenho interesse no produto:\n\n*${nome}*\nR$ ${preco.toFixed(2)}\n\nPode me passar mais informações?`;
  return `https://wa.me/${WHATSAPP_PAIZAO}?text=${encodeURIComponent(msg)}`;
}

export function gerarLinkAtacado(
  itens: Array<{ nome: string; grade: Record<string, number>; preco: number }>
): string {
  const totalPecas = itens.reduce(
    (sum, item) => sum + Object.values(item.grade).reduce((a, b) => a + b, 0),
    0
  );

  const linhas = [
    "📦 *PEDIDO ATACADO — PAIZÃO MODAS*",
    "",
    ...itens.map((item) => {
      const gradeStr = Object.entries(item.grade)
        .filter(([, qty]) => qty > 0)
        .map(([tam, qty]) => `${tam}:${qty}`)
        .join(" | ");
      const subtotal = Object.values(item.grade).reduce((a, b) => a + b, 0) * item.preco;
      return `• ${item.nome}\n  Grade: ${gradeStr}\n  Preço unit: R$ ${item.preco.toFixed(2)} | Subtotal: R$ ${subtotal.toFixed(2)}`;
    }),
    "",
    `*Total de peças: ${totalPecas}*`,
    "",
    "Quero fechar esse pedido!",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_PAIZAO}?text=${encodeURIComponent(linhas)}`;
}
