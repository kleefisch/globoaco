import {defineArrayMember, defineField} from 'sanity'
import {tableBlock} from './tableBlock'

/**
 * Definição compartilhada de "texto rico" (Portable Text) usada em campos de
 * descrição (produto, projeto, etc.). Habilita: títulos H2/H3, citação, listas,
 * negrito/itálico/sublinhado, texto colorido (cores da marca), link e divisor.
 *
 * Uso:
 *   defineField({ name: 'overview', title: '...', type: 'array', of: richTextOf })
 */
export const richTextOf = [
  defineArrayMember({
    type: 'block',
    // Estilos de bloco (parágrafo, títulos, citação)
    styles: [
      {title: 'Parágrafo', value: 'normal'},
      {title: 'Título (H2)', value: 'h2'},
      {title: 'Subtítulo (H3)', value: 'h3'},
      {title: 'Citação', value: 'blockquote'},
    ],
    // Listas
    lists: [
      {title: 'Lista (bullets)', value: 'bullet'},
      {title: 'Lista numerada', value: 'number'},
    ],
    marks: {
      // Formatação inline
      decorators: [
        {title: 'Negrito', value: 'strong'},
        {title: 'Itálico', value: 'em'},
        {title: 'Sublinhado', value: 'underline'},
      ],
      // Anotações: cores da marca + link
      annotations: [
        {
          name: 'color',
          title: 'Cor do texto',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Cor',
              type: 'string',
              options: {
                list: [
                  {title: 'Laranja (destaque)', value: 'accent'},
                  {title: 'Azul (primária)', value: 'primary'},
                  {title: 'Verde (positivo)', value: 'green'},
                  {title: 'Vermelho (atenção)', value: 'red'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
          ],
        },
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
            }),
          ],
        },
      ],
    },
  }),
  // Divisor / linha separadora entre seções
  defineArrayMember({
    name: 'divider',
    title: 'Divisor (linha separadora)',
    type: 'object',
    fields: [
      defineField({
        name: 'style',
        title: 'Estilo',
        type: 'string',
        options: {
          list: [{title: 'Linha simples', value: 'line'}],
        },
        initialValue: 'line',
      }),
    ],
    preview: {
      prepare: () => ({title: '— Divisor —'}),
    },
  }),
  tableBlock,
]
