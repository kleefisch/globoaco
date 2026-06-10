import {defineArrayMember, defineField} from 'sanity'

/**
 * Texto rico COMPLETO para o corpo de artigos do blog.
 * Superconjunto do richText de produtos: adiciona H4, alinhamento, realce
 * (fundo), tamanho de fonte, paleta de cores ampliada, callout e imagem.
 */
export const articleBodyOf = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Parágrafo', value: 'normal'},
      {title: 'Título (H2)', value: 'h2'},
      {title: 'Subtítulo (H3)', value: 'h3'},
      {title: 'Sub-subtítulo (H4)', value: 'h4'},
      {title: 'Citação', value: 'blockquote'},
      {title: 'Centralizado', value: 'center'},
      {title: 'Alinhado à direita', value: 'right'},
    ],
    lists: [
      {title: 'Lista (bullets)', value: 'bullet'},
      {title: 'Lista numerada', value: 'number'},
    ],
    marks: {
      decorators: [
        {title: 'Negrito', value: 'strong'},
        {title: 'Itálico', value: 'em'},
        {title: 'Sublinhado', value: 'underline'},
      ],
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
                  {title: 'Azul escuro (primária)', value: 'primary'},
                  {title: 'Azul', value: 'blue'},
                  {title: 'Verde', value: 'green'},
                  {title: 'Vermelho', value: 'red'},
                  {title: 'Amarelo/Âmbar', value: 'amber'},
                  {title: 'Roxo', value: 'purple'},
                  {title: 'Cinza', value: 'gray'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
        },
        {
          name: 'highlight',
          title: 'Realce (fundo)',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Cor do fundo',
              type: 'string',
              options: {
                list: [
                  {title: 'Amarelo', value: 'yellow'},
                  {title: 'Laranja', value: 'orange'},
                  {title: 'Verde', value: 'green'},
                  {title: 'Azul', value: 'blue'},
                  {title: 'Rosa', value: 'pink'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
          ],
        },
        {
          name: 'fontSize',
          title: 'Tamanho da fonte',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Tamanho',
              type: 'string',
              options: {
                list: [
                  {title: 'Pequeno', value: 'small'},
                  {title: 'Normal', value: 'normal'},
                  {title: 'Grande', value: 'large'},
                ],
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

  // Imagem dentro do corpo
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
  }),

  // Divisor / linha separadora
  defineArrayMember({
    name: 'divider',
    title: 'Divisor (linha separadora)',
    type: 'object',
    fields: [
      defineField({
        name: 'style',
        title: 'Estilo',
        type: 'string',
        options: {list: [{title: 'Linha simples', value: 'line'}]},
        initialValue: 'line',
      }),
    ],
    preview: {prepare: () => ({title: '— Divisor —'})},
  }),

  // Caixa de destaque (callout)
  defineArrayMember({
    name: 'callout',
    title: 'Caixa de destaque',
    type: 'object',
    fields: [
      defineField({
        name: 'variant',
        title: 'Tipo',
        type: 'string',
        initialValue: 'info',
        options: {
          list: [
            {title: 'ℹ️ Informação', value: 'info'},
            {title: '💡 Dica', value: 'tip'},
            {title: '⚠️ Atenção', value: 'warning'},
            {title: '⭐ Importante', value: 'important'},
          ],
          layout: 'radio',
        },
      }),
      defineField({
        name: 'title',
        title: 'Título (opcional)',
        type: 'string',
      }),
      defineField({
        name: 'text',
        title: 'Texto',
        type: 'text',
        rows: 3,
        validation: (rule) => rule.required(),
      }),
    ],
    preview: {
      select: {variant: 'variant', title: 'title', text: 'text'},
      prepare({variant, title, text}) {
        return {title: title || text || 'Caixa de destaque', subtitle: `Callout · ${variant}`}
      },
    },
  }),
]
