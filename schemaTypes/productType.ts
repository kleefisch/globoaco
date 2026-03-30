import { defineType, defineField, defineArrayMember } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export const productType = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Imagens do Produto',
      type: 'array',
      of: [
        defineArrayMember({
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
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico',
      type: 'text',
      description: 'Breve descrição que aparece no card do produto na listagem e na parte superior da página.'
    }),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      description: 'Adicione características como Potência, Peso, Dimensões, etc.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'property',
              title: 'Característica',
              type: 'string',
              description: 'Ex: Potência do Motor'
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'Ex: 50 CV'
            })
          ],
          preview: {
            select: {
              title: 'property',
              subtitle: 'value'
            }
          }
        })
      ]
    }),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Manual)',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }),
    defineField({
      name: 'description',
      title: 'Texto Descritivo Principal',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
      ],
    }),
  ],
})
