import {defineArrayMember, defineField} from 'sanity'

/**
 * Lista compartilhada de ícones para os "Destaques do Card" (produto e projeto).
 * Os valores casam com o mapa de ícones no front (ICON_MAP).
 */
export const cardHighlightIcons = [
  // Técnicos / mecânicos
  {title: '⚡ Potência / Motor', value: 'power'},
  {title: '🔧 Manutenção / Chave', value: 'wrench'},
  {title: '⚙️ Engrenagem / Config', value: 'gear'},
  {title: '🛠️ Ferramentas', value: 'tools'},
  {title: '🔩 Parafuso / Peça', value: 'bolt'},
  {title: '🛡️ Garantia', value: 'warranty'},
  {title: '🚀 Velocidade', value: 'speed'},
  {title: '🎯 Precisão', value: 'target'},
  {title: '📈 Desempenho', value: 'trend'},
  {title: '🔁 Ciclo / Rotação', value: 'cycle'},
  {title: '🧲 Magnético', value: 'magnet'},
  {title: '🔊 Ruído / Som', value: 'sound'},

  // Medidas / dimensões
  {title: '📦 Capacidade', value: 'capacity'},
  {title: '⚖️ Peso', value: 'weight'},
  {title: '📏 Dimensões', value: 'dimensions'},
  {title: '📐 Medidas / Régua', value: 'ruler'},
  {title: '↔️ Largura', value: 'width'},
  {title: '↕️ Altura', value: 'height'},
  {title: '🧊 Volume', value: 'volume'},
  {title: '🌡️ Temperatura', value: 'temperature'},
  {title: '💨 Pressão / Ar', value: 'pressure'},

  // Energia / produção
  {title: '🔌 Energia', value: 'energy'},
  {title: '🔋 Voltagem / Bateria', value: 'voltage'},
  {title: '⏱️ Produção/hora', value: 'throughput'},
  {title: '⏰ Tempo / Período', value: 'clock'},
  {title: '🧱 Material', value: 'material'},
  {title: '🔥 Combustão / Calor', value: 'flame'},
  {title: '💧 Líquidos / Umidade', value: 'drop'},
  {title: '♻️ Eficiência / Sustentável', value: 'recycle'},
  {title: '🔆 Eficiência energética', value: 'efficiency'},

  // Projeto / contexto / negócio
  {title: '🏷️ Tipo / Categoria', value: 'type'},
  {title: '📍 Localização', value: 'location'},
  {title: '📅 Data / Período', value: 'calendar'},
  {title: '📊 Escala / Porte', value: 'scale'},
  {title: '🏭 Indústria / Fábrica', value: 'factory'},
  {title: '🏢 Empresa / Prédio', value: 'building'},
  {title: '👥 Equipe / Pessoas', value: 'users'},
  {title: '🚚 Transporte / Entrega', value: 'truck'},
  {title: '🌎 Alcance / Brasil', value: 'globe'},
  {title: '🤝 Parceria / Suporte', value: 'handshake'},
  {title: '🏆 Prêmio / Qualidade', value: 'award'},
  {title: '⭐ Destaque', value: 'star'},

  // Genéricos úteis
  {title: '✅ Check / Confirmado', value: 'check'},
  {title: '➕ Adicional', value: 'plus'},
  {title: 'ℹ️ Informação', value: 'info'},
  {title: '📋 Lista / Specs', value: 'list'},
  {title: '🔒 Segurança', value: 'lock'},
  {title: '💡 Inovação', value: 'idea'},
  {title: '📞 Contato', value: 'phone'},
]

/**
 * Campo "Destaques do Card" reutilizável.
 * @param description Texto de ajuda específico do contexto (produto/projeto).
 */
export function cardHighlightsField(description: string, group?: string) {
  return defineField({
    name: 'cardHighlights',
    title: 'Destaques do Card (lateral)',
    description,
    type: 'array',
    group,
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({
            name: 'property',
            title: 'Rótulo',
            type: 'string',
            description: 'Ex: Potência, Capacidade, Localização',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'value',
            title: 'Valor',
            type: 'string',
            description: 'Ex: 50 CV, 40 ton/h, Rio Verde - GO',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'icon',
            title: 'Ícone',
            type: 'string',
            initialValue: 'check',
            options: {list: cardHighlightIcons},
            validation: (rule) => rule.required(),
          }),
        ],
        preview: {
          select: {title: 'property', subtitle: 'value'},
        },
      }),
    ],
  })
}
