import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Depoimentos',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Cliente',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo/Empresa',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localização (Cidade, UF)',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Texto do Depoimento',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    // ATENÇÃO: Os documentos existentes (importados de testimonials.ndjson) armazenam
    // este campo como uma string de URL (ex: pexels). Após esta mudança para type 'image',
    // essas imagens precisam ser re-enviadas (upload) como assets de imagem do Sanity,
    // caso contrário o valor antigo (URL) ficará inválido e não será exibido.
    defineField({
      name: 'image',
      title: 'Foto do Produto/Cliente',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      description: 'Define a ordem de exibição no site (ex: 1, 2, 3...)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
})
