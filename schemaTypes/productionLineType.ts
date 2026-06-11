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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
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
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
      description: 'Curta frase exibida no card da listagem.',
      type: 'string',
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
      title: 'Resumo (texto simples)',
      description: 'Breve resumo para card/SEO.',
      type: 'text',
      rows: 3,
    }),

    // Destaques do card + specs (reuso dos helpers compartilhados)
    cardHighlightsField(
      'Destaques exibidos no card lateral (ex: capacidade, área, potência), cada um com um ícone à escolha.',
    ),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
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
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Catálogo)',
      type: 'file',
      options: {accept: '.pdf'},
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
    select: {title: 'name', scale: 'scale', media: 'coverImage', capacity: 'capacity'},
    prepare({title, scale, media, capacity}) {
      const scaleLabel =
        {mini: 'Mini', compact: 'Compacta', industrial: 'Industrial'}[scale as string] || scale
      return {title, subtitle: `${scaleLabel}${capacity ? ' · ' + capacity : ''}`, media}
    },
  },
})
