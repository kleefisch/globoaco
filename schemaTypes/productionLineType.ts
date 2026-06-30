import {defineType, defineField, defineArrayMember} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField, cardHighlightIcons} from './cardHighlights'

export const productionLineType = defineType({
  name: 'productionLine',
  title: 'Linha de Produção (Fábrica Completa)',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Linha',
      description: 'Ex: Linha Compacta 5 ton/h, Mini-Fábrica Horizontal 500',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Nomes Alternativos / Regionalismos',
      description:
        'Outros nomes pelos quais esta fábrica completa ou linha de produção é conhecida. Tecle Enter para adicionar.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Ativo no site',
      description:
        'Desative para ocultar esta fábrica completa do catálogo público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
      description: 'Curta frase exibida no card da listagem.',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      description:
        'Categoria da linha/fábrica, usando a mesma lista dos produtos avulsos quando fizer sentido.',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto/sistema, usando a mesma lista controlada dos produtos avulsos.',
      type: 'reference',
      to: [{type: 'productLine'}],
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo da linha ou configuração. Ex: LF-500, Compacta 5T, Turn-key Pro.',
      type: 'string',
    }),
    defineField({
      name: 'scale',
      title: 'Escala / Porte',
      description: 'Nível da linha — define em qual seção aparece.',
      type: 'string',
      options: {
        list: [
          {title: 'Mini-Fábrica (pequeno produtor)', value: 'mini'},
          {title: 'Compacta (médio porte)', value: 'compact'},
          {title: 'Industrial (grande porte / turn-key)', value: 'industrial'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      description: 'Ex: 500 kg/h, 1,5 a 5 ton/h',
      type: 'string',
    }),
    defineField({
      name: 'segments',
      title: 'Segmentos atendidos',
      description: 'Para quais produções esta linha serve.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Aves', value: 'aves'},
          {title: 'Bovinos', value: 'bovino'},
          {title: 'Suínos', value: 'suino'},
          {title: 'Equinos', value: 'equino'},
          {title: 'Caprinos/Ovinos', value: 'caprino'},
          {title: 'Pets', value: 'pet'},
          {title: 'Sal Mineral / Proteinado', value: 'mineral'},
          {title: 'Indústria / Grande escala', value: 'industria'},
          {title: 'Outros', value: 'outros'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico',
      description:
        'Resumo que aparece abaixo das fotos na página da fábrica completa (com edição rica). ' +
        'O texto puro também alimenta o card na listagem e a meta description de SEO.',
      type: 'array',
      of: richTextOf,
    }),

    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      description: 'Adicione características como Capacidade, Potência, Área ocupada, Dimensões, etc.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'property', title: 'Característica', type: 'string'}),
            defineField({name: 'value', title: 'Valor', type: 'string'}),
          ],
          preview: {select: {title: 'property', subtitle: 'value'}},
        }),
      ],
    }),
    cardHighlightsField(
      'Destaques exibidos no card azul lateral, cada um com um ícone à escolha. Se vazio, o card fica sem destaques.',
    ),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Catálogo)',
      type: 'file',
      options: {accept: '.pdf'},
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações (Ideal para)',
      description:
        'Ex: Ração Animal, Sal Mineral, Concentrados, Grãos, Suplementos. Pressione Enter para adicionar.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'animalTypes',
      title: 'Tipos de Animais Atendidos',
      description: 'Selecione os tipos de animais para os quais esta fábrica completa pode produzir.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Bovinos', value: 'bovino'},
          {title: 'Suínos', value: 'suino'},
          {title: 'Aves', value: 'aves'},
          {title: 'Equinos', value: 'equino'},
          {title: 'Peixes', value: 'peixe'},
          {title: 'Pets', value: 'pet'},
          {title: 'Caprinos/Ovinos', value: 'caprino'},
          {title: 'Outros', value: 'outros'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'productionScales',
      title: 'Portes de Produção Atendidos',
      description:
        'Marque todos os portes que esta fábrica completa atende — pode servir do pequeno ao grande produtor.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Pequeno produtor', value: 'pequeno'},
          {title: 'Médio porte', value: 'medio'},
          {title: 'Grande porte', value: 'grande'},
          {title: 'Industrial', value: 'industrial'},
        ],
        layout: 'grid',
      },
    }),

    // O que está incluso (equipamentos da linha)
    defineField({
      name: 'includedEquipment',
      title: 'O que está incluso (Equipamentos)',
      description: 'Equipamentos que compõem a linha. Vincule aos produtos do catálogo quando existirem.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'product',
              title: 'Produto do catálogo (opcional)',
              type: 'reference',
              to: [{type: 'product'}],
            }),
            defineField({
              name: 'name',
              title: 'Nome (se não for do catálogo)',
              type: 'string',
            }),
            defineField({name: 'note', title: 'Observação', type: 'string'}),
          ],
          preview: {
            select: {refName: 'product.name', name: 'name', note: 'note'},
            prepare({refName, name, note}) {
              return {title: refName || name || 'Equipamento', subtitle: note}
            },
          },
        }),
      ],
    }),

    // Fluxo de produção (etapas)
    defineField({
      name: 'processFlow',
      title: 'Fluxo de Produção (etapas)',
      description: 'Etapas do processo (ex: Moagem → Dosagem → Mistura → Ensaque).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Etapa',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', title: 'Descrição', type: 'text', rows: 2}),
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              initialValue: 'gear',
              options: {list: cardHighlightIcons},
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

    defineField({
      name: 'description',
      title: 'Descrição Detalhada (texto rico)',
      type: 'array',
      of: richTextOf,
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      description:
        'Opcional. Se preenchido, substitui o FAQ padrão nesta página de fábrica completa.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Pergunta',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Resposta',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),

    // Prova social: cases entregues
    defineField({
      name: 'relatedProjects',
      title: 'Cases Relacionados (Projetos entregues)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
    }),
    defineField({
      name: 'relatedLines',
      title: 'Linhas Relacionadas',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'productionLine'}]})],
    }),

    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      description: 'Ordem dentro da escala (ex: 1, 2, 3...).',
      type: 'number',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Escala + Ordem',
      name: 'scaleOrder',
      by: [
        {field: 'scale', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      scale: 'scale',
      media: 'coverImage',
      capacity: 'capacity',
      isActive: 'isActive',
    },
    prepare({title, category, scale, media, capacity, isActive}) {
      const scaleLabel =
        {mini: 'Mini', compact: 'Compacta', industrial: 'Industrial'}[scale as string] || scale
      const subtitle = [category, scaleLabel, capacity].filter(Boolean).join(' · ')
      return {title, subtitle: isActive === false ? `INATIVO · ${subtitle}` : subtitle, media}
    },
  },
})
