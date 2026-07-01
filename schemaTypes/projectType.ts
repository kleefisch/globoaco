import {defineType, defineField, defineArrayMember} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField} from './cardHighlights'

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
      name: 'isActive',
      title: 'Ativo no site',
      description: 'Desative para ocultar este projeto/case do site público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Destacar na Home Page',
      description:
        'Marque esta opção para exibir este projeto na seção Projetos Entregues da página inicial.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordem na Home Page',
      description:
        'Define a ordem de exibição do projeto na seção Projetos Entregues (ex: 1, 2, 3...)',
      type: 'number',
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
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
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
          },
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
    // ATENÇÃO: Os documentos existentes armazenam este campo como string (ex: "Outubro/2023" ou "2023").
    // Após esta mudança para type 'datetime', os valores antigos em string precisam ser migrados
    // para o formato de data/hora ISO, caso contrário ficarão inválidos.
    defineField({
      name: 'deliveryDate',
      title: 'Data de Entrega',
      type: 'datetime',
      description: 'Data de entrega do projeto',
    }),
    defineField({
      name: 'scale',
      title: 'Escala',
      type: 'string',
      description: 'Ex: Grande Porte, Industrial, Compacta',
    }),
    cardHighlightsField(
      'Destaques exibidos no card azul lateral, cada um com um ícone à escolha. Se vazio, usa as informações do projeto (tipo, capacidade, localização, etc.).',
    ),
    defineField({
      name: 'overview',
      title: 'Visão Geral (Overview)',
      type: 'array',
      of: richTextOf,
    }),
    defineField({
      name: 'equipmentList',
      title: 'Lista de Equipamentos',
      type: 'array',
      description: 'Adicione os equipamentos em formato de lista (título e descrição)',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nome do Equipamento',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', title: 'Breve Descrição', type: 'text'}),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'equipmentUsed',
      title: 'Equipamentos da GAM Usados',
      type: 'array',
      description:
        'Selecione os equipamentos da GAM que foram fornecidos e utilizados neste projeto.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'O Desafio',
      type: 'array',
      description: 'Descreva o problema que o cliente tinha.',
      of: richTextOf,
    }),
    defineField({
      name: 'solution',
      title: 'A Solução',
      type: 'array',
      description: 'Descreva como a GAM resolveu o desafio.',
      of: richTextOf,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'coverImage',
      isActive: 'isActive',
    },
    prepare({title, location, media, isActive}) {
      const subtitle = location || 'Projeto / Case'
      return {
        title,
        subtitle: isActive === false ? `INATIVO · ${subtitle}` : subtitle,
        media,
      }
    },
  },
})
