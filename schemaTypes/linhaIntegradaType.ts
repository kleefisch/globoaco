import {defineType, defineField, defineArrayMember} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField, cardHighlightIcons} from './cardHighlights'
import {SETORES} from './sectors'

// Linha de produção integrada para setores não-agro (ensaque, dosagem, mistura...)
export const linhaIntegradaType = defineType({
  name: 'linhaIntegrada',
  title: 'Linha Integrada',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Linha',
      description: 'Ex: Linha de Ensaque e Selagem de Areia',
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
      name: 'setores',
      title: 'Setores atendidos',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SETORES, layout: 'grid'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      description: 'Ex: 600 sacos/h, 20 ton/h',
      type: 'string',
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
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
      type: 'text',
      rows: 3,
    }),
    cardHighlightsField('Destaques do card lateral, cada um com ícone.'),
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
    defineField({
      name: 'includedEquipment',
      title: 'O que está incluso (Equipamentos)',
      description: 'Equipamentos que compõem a linha. Vincule às soluções do catálogo quando existirem.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'solution',
              title: 'Solução do catálogo (opcional)',
              type: 'reference',
              to: [{type: 'solucaoIndustrial'}, {type: 'product'}],
            }),
            defineField({name: 'name', title: 'Nome (se não for do catálogo)', type: 'string'}),
            defineField({name: 'note', title: 'Observação', type: 'string'}),
          ],
          preview: {
            select: {refName: 'solution.name', name: 'name', note: 'note'},
            prepare({refName, name, note}) {
              return {title: refName || name || 'Equipamento', subtitle: note}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'processFlow',
      title: 'Fluxo de Produção (etapas)',
      description: 'Ex: Dosagem → Transporte → Pesagem → Ensaque → Selagem.',
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
      name: 'applications',
      title: 'Aplicações / Materiais',
      description: 'O que a linha processa/embala (ex: Areia, Pedras, Cimento).',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
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
    defineField({
      name: 'relatedProjects',
      title: 'Cases Relacionados (Projetos entregues)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
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
  orderings: [{title: 'Ordem', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', media: 'coverImage', capacity: 'capacity'},
    prepare({title, media, capacity}) {
      return {title, subtitle: capacity ? `Linha Integrada · ${capacity}` : 'Linha Integrada', media}
    },
  },
})
