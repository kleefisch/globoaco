import {defineArrayMember, defineField} from 'sanity'
import {cardHighlightIcons} from './cardHighlights'

export function applicationSectionsField(group = 'applications') {
  return defineField({
    name: 'applicationSections',
    title: 'Blocos de Aplicações',
    description:
      'Crie seções visuais flexíveis para cenários como produtos processados, rações produzidas, segmentos atendidos, granulometrias e materiais.',
    type: 'array',
    group,
    of: [
      defineArrayMember({
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Título do bloco',
            description: 'Ex: Produtos processados, Segmentos atendidos, Granulometrias.',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'displayStyle',
            title: 'Formato visual',
            type: 'string',
            initialValue: 'cards',
            options: {
              list: [
                {title: 'Cards com ícone', value: 'cards'},
                {title: 'Tags compactas', value: 'tags'},
                {title: 'Lista compacta', value: 'list'},
                {title: 'Lista com descrição', value: 'detailedList'},
              ],
              layout: 'radio',
            },
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'items',
            title: 'Itens',
            type: 'array',
            of: [
              defineArrayMember({
                type: 'object',
                fields: [
                  defineField({
                    name: 'title',
                    title: 'Título',
                    description: 'Ex: Milho em grão, Malha fina, Produtores rurais.',
                    type: 'string',
                    validation: (rule) => rule.required(),
                  }),
                  defineField({
                    name: 'description',
                    title: 'Descrição curta',
                    description: 'Opcional. Use quando o item precisar de uma explicação breve.',
                    type: 'text',
                    rows: 2,
                  }),
                  defineField({
                    name: 'icon',
                    title: 'Ícone',
                    description: 'Opcional. Usado principalmente nos formatos com cards/listas.',
                    type: 'string',
                    options: {list: cardHighlightIcons},
                  }),
                ],
                preview: {
                  select: {title: 'title', subtitle: 'description'},
                },
              }),
            ],
            validation: (rule) => rule.required().min(1),
          }),
        ],
        preview: {
          select: {title: 'title', style: 'displayStyle', items: 'items'},
          prepare({title, style, items}) {
            const count = Array.isArray(items) ? items.length : 0
            const styleLabel =
              {
                cards: 'Cards',
                tags: 'Tags',
                list: 'Lista',
                detailedList: 'Lista com descrição',
              }[style as string] || style
            return {title, subtitle: [styleLabel, `${count} item(ns)`].filter(Boolean).join(' · ')}
          },
        },
      }),
    ],
  })
}
