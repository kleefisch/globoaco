import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const postType = defineType({
  name: 'post',
  title: 'Postagem (Blog)',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
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
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo',
        })
      ]
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags da Postagem',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string'
        })
      ],
      description: 'Pressione enter para adicionar uma nova tag (Ex: Mercado, Dicas)',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'body',
      title: 'Corpo do Texto (Rich Text)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true }
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `por ${author}` }
    },
  },
})
