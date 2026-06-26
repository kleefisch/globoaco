import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const heroSlideType = defineType({
  name: 'heroSlide',
  title: 'Hero (Slides da Capa)',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'layoutMode',
      title: 'Modo do slide',
      description:
        'Escolha "Completo" para usar tag, título, descrição e botões. Escolha "Somente imagem clicável" para usar o banner como peça única.',
      type: 'string',
      options: {
        list: [
          {title: 'Completo com texto e botões', value: 'content'},
          {title: 'Somente imagem clicável', value: 'imageOnly'},
        ],
        layout: 'radio',
      },
      initialValue: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag (selo superior)',
      description: 'Texto curto exibido no selo acima do título. Ex: "Engenharia 100% Brasileira".',
      type: 'string',
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {layoutMode?: string}
          if (parent?.layoutMode !== 'imageOnly' && !value) {
            return 'Informe a tag do slide.'
          }
          return true
        }),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      description:
        'Título principal. Envolva o trecho que deve aparecer em LARANJA com **asteriscos duplos**. ' +
        'Ex: "Sua fábrica de **ração** começa aqui." Use quebra de linha normal (Enter) onde quiser.',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {layoutMode?: string}
          if (parent?.layoutMode !== 'imageOnly' && !value) {
            return 'Informe o título do slide.'
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {layoutMode?: string}
          if (parent?.layoutMode !== 'imageOnly' && !value) {
            return 'Informe a descrição do slide.'
          }
          return true
        }),
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
      title: 'Imagem de capa — Desktop/Web (paisagem)',
      description:
        'Imagem exibida no computador (proporção larga ~16:9). Use o recorte/hotspot para definir o foco.',
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
            return 'Envie a imagem de capa (Desktop).'
          }
          return true
        }),
    }),
    defineField({
      name: 'imageMobile',
      title: 'Imagem de capa — Mobile (retrato, opcional)',
      description:
        'Versão para celular (proporção mais alta ~4:5). Se não enviar, o site usa a imagem de Desktop no celular também.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Texto alternativo', type: 'string'}),
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
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
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Botão principal — link',
      type: 'string',
      initialValue: '/solucoes',
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Botão secundário — texto',
      type: 'string',
      initialValue: 'Falar com Especialista',
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Botão secundário — link',
      type: 'string',
      initialValue: '/contato',
      hidden: ({parent}) => parent?.layoutMode === 'imageOnly',
    }),
    defineField({
      name: 'imageClickHref',
      title: 'Link ao clicar na imagem',
      description:
        'Usado no modo "Somente imagem clicável". Pode ser uma rota interna (/solucoes) ou uma URL completa.',
      type: 'string',
      hidden: ({parent}) => parent?.layoutMode !== 'imageOnly',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {layoutMode?: string}
          if (parent?.layoutMode === 'imageOnly' && !value) {
            return 'Informe o link do banner clicável.'
          }
          return true
        }),
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
      layoutMode: 'layoutMode',
    },
    prepare({title, order, media, mediaType, layoutMode}) {
      const clean = (title || 'Banner clicável').replace(/\*\*/g, '')
      return {
        title: clean,
        subtitle: `Slide ${order ?? '?'} · ${
          layoutMode === 'imageOnly' ? 'Somente imagem clicável' : 'Completo'
        } · ${mediaType === 'video' ? 'Vídeo' : 'Imagem'}`,
        media,
      }
    },
  },
})
