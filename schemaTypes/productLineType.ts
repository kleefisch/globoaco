import {defineType, defineField} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

export const productLineType = defineType({
  name: 'productLine',
  title: 'Linha de Produto',
  type: 'document',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome da Linha',
      description: 'Ex: Linha Industrial, Linha Compacta, Linha Pro.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
  ],
})
