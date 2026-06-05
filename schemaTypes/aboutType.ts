import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'Página Sobre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Página',
      type: 'string',
      initialValue: 'Nascemos no coração do agro. Crescemos com quem produz.',
    }),
    defineField({
      name: 'history',
      title: 'História (Quem Somos)',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Missão',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'vision',
      title: 'Visão',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'founderName',
      title: 'Nome do Fundador',
      type: 'string',
    }),
    defineField({
      name: 'founderRole',
      title: 'Cargo do Fundador',
      type: 'string',
    }),
    defineField({
      name: 'founderQuote',
      title: 'Citação do Fundador',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'founderImage',
      title: 'Foto do Fundador',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
