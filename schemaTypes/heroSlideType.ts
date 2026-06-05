import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero (Slides da Capa)',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag (selo superior)',
      description: 'Texto curto exibido no selo acima do título. Ex: "Engenharia 100% Brasileira".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      description:
        'Título principal. Envolva o trecho que deve aparecer em LARANJA com **asteriscos duplos**. ' +
        'Ex: "Sua fábrica de **ração** começa aqui." Use quebra de linha normal (Enter) onde quiser.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),

    // --- Mídia: imagem OU vídeo -------------------------------------------
    defineField({
      name: 'mediaType',
      title: 'Tipo de mídia',
      type: 'string',
      options: {
        list: [
          {title: 'Imagem', value: 'image'},
          {title: 'Vídeo', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagem de capa',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {mediaType?: string}
          if (parent?.mediaType === 'image' && !value) {
            return 'Envie a imagem de capa.'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Vídeo (upload)',
      description:
        'Vídeo de fundo (mp4/webm). Para vídeos grandes, prefira usar o campo "URL do vídeo" abaixo ' +
        'apontando para um arquivo em /public, evitando peso no CMS.',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL do vídeo (alternativa ao upload)',
      description: 'Ex: /hero-fazenda.mp4 (arquivo em /public) ou uma URL https completa.',
      type: 'string',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'imagePoster',
      title: 'Poster do vídeo (opcional)',
      description: 'Imagem exibida enquanto o vídeo carrega. Recomendado para vídeos.',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'flipHorizontal',
      title: 'Espelhar mídia horizontalmente',
      type: 'boolean',
      initialValue: false,
    }),

    // --- CTAs (botões de ação) --------------------------------------------
    defineField({
      name: 'primaryCtaLabel',
      title: 'Botão principal — texto',
      type: 'string',
      initialValue: 'Explorar Soluções',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Botão principal — link',
      type: 'string',
      initialValue: '/solucoes',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Botão secundário — texto',
      type: 'string',
      initialValue: 'Falar com Especialista',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Botão secundário — link',
      type: 'string',
      initialValue: '/contato',
    }),

    // --- Ordenação / publicação -------------------------------------------
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      description: 'Define a ordem do slide no carrossel (ex: 1, 2, 3...).',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Ativo',
      description: 'Desmarque para ocultar o slide sem precisar apagá-lo.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Ordem de Exibição',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'image',
      mediaType: 'mediaType',
    },
    prepare({title, order, media, mediaType}) {
      const clean = (title || 'Sem título').replace(/\*\*/g, '')
      return {
        title: clean,
        subtitle: `Slide ${order ?? '?'} · ${mediaType === 'video' ? 'Vídeo' : 'Imagem'}`,
        media,
      }
    },
  },
})
