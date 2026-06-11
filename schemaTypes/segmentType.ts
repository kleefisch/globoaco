import {defineType, defineField, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightIcons} from './cardHighlights'

export const segmentType = defineType({
  name: 'segment',
  title: 'Segmento (Página por aplicação)',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      description: 'Ex: Fábrica de Ração para Aves',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      description: 'Vira /fabricas/<slug>. Ex: para-aves',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'segmentKeys',
      title: 'Segmentos vinculados',
      description:
        'Quais segmentos esta página representa. As linhas e equipamentos marcados com estes segmentos aparecem automaticamente.',
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
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'intro',
      title: 'Introdução (abaixo do título)',
      description: 'Texto curto de abertura.',
      type: 'text',
      rows: 3,
    }),

    // Fases / blocos (ex: Crescimento, Postura, Poedeiras)
    defineField({
      name: 'phases',
      title: 'Fases / Tópicos',
      description: 'Blocos com ícone (ex: fases de criação, necessidades nutricionais).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', title: 'Descrição', type: 'text', rows: 3}),
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              initialValue: 'check',
              options: {list: cardHighlightIcons},
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Conteúdo (texto rico)',
      type: 'array',
      of: richTextOf,
    }),

    defineField({
      name: 'ctaTitle',
      title: 'Título do CTA',
      type: 'string',
      initialValue: 'Vamos construir sua fábrica de ração?',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto do CTA',
      type: 'text',
      rows: 2,
      initialValue:
        'Conte sobre a sua operação e nossa equipe projeta a fábrica ideal — sem custo, sem compromisso.',
    }),

    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
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
    {title: 'Ordem', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'heroImage'},
  },
})
