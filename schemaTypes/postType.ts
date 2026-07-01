import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'
import {articleBodyOf} from './articleBody'

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
      name: 'isActive',
      title: 'Ativo no site',
      description: 'Desative para ocultar este artigo do blog público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo / Linha Fina (Excerpt)',
      type: 'text',
      description:
        'Breve parágrafo que aparece logo abaixo do título do artigo e nos cards de listagem.',
    }),
    defineField({
      name: 'category',
      title: 'Categoria do Blog',
      type: 'reference',
      to: [{type: 'postCategory'}],
      description: 'Pasta/Categoria em que a notícia se enquadra',
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
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Legenda / Descrição da Imagem',
          description: 'Aparecerá logo abaixo da foto principal no artigo.',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'},
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
          type: 'string',
        }),
      ],
      description: 'Pressione enter para adicionar uma nova tag (Ex: Mercado, Dicas)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'body',
      title: 'Corpo do Texto (Rich Text)',
      type: 'array',
      of: articleBodyOf,
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
          description: 'Recomendado até 60 caracteres',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
          rows: 2,
          description: 'Recomendado até 160 caracteres',
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {author, isActive} = selection
      const subtitle = author ? `por ${author}` : undefined
      return {
        ...selection,
        subtitle: isActive === false ? `INATIVO · ${subtitle || 'Artigo oculto'}` : subtitle,
      }
    },
  },
})
