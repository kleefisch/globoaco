import { defineType, defineField, defineArrayMember } from 'sanity'
import { CheckmarkIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Nome do Projeto',
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
      name: 'location',
      title: 'Localização',
      type: 'string',
      description: 'Ex: Rio Verde, GO',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Segmentos',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Ex: Pequeno porte, Mistura, Armazenagem, Turn-key',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria do Projeto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          }
        }),
      ],
    }),
    defineField({
      name: 'projectType',
      title: 'Tipo (Resumo)',
      type: 'string',
      description: 'Ex: Fábrica Completa, Retrofit, Automação, etc.',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      type: 'string',
      description: 'Ex: 40 ton/h, 500 kg/lote',
    }),
    defineField({
      name: 'deliveryDate',
      title: 'Entregue Em (Data/Ano)',
      type: 'string',
      description: 'Ex: Outubro/2023 ou 2023',
    }),
    defineField({
      name: 'scale',
      title: 'Escala',
      type: 'string',
      description: 'Ex: Grande Porte, Industrial, Compacta',
    }),
    defineField({
      name: 'overview',
      title: 'Visão Geral (Overview)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'equipment',
      title: 'Equipamentos',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'challengeAndSolution',
      title: 'Desafio e Solução',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})