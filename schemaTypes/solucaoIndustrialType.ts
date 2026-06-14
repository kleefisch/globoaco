import {defineType, defineField, defineArrayMember} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField} from './cardHighlights'
import {SETORES} from './sectors'

// Solução (equipamento) para setores não-agro (construção civil, indústria, etc.)
export const solucaoIndustrialType = defineType({
  name: 'solucaoIndustrial',
  title: 'Solução Industrial',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Solução',
      description: 'Ex: Ensacadeira a calor, Esteira com balança integrada',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'setores',
      title: 'Setores atendidos',
      description: 'Em quais setores esta solução é usada.',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SETORES, layout: 'grid'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo / Categoria',
      description: 'Categoria livre exibida no card (ex: Ensacadeira, Esteira, Misturador).',
      type: 'string',
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Nomes alternativos',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Texto alternativo', type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico (abaixo das fotos)',
      type: 'array',
      of: richTextOf,
    }),
    cardHighlightsField(
      'Destaques do card lateral (ex: capacidade, potência, peso), cada um com ícone.',
    ),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'property', title: 'Característica', type: 'string'}),
            defineField({name: 'value', title: 'Valor', type: 'string'}),
          ],
          preview: {select: {title: 'property', subtitle: 'value'}},
        }),
      ],
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações / Materiais',
      description: 'Para que serve / o que processa (ex: Argamassa, Areia, Cimento, Pedras).',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'description',
      title: 'Descrição Detalhada (texto rico)',
      type: 'array',
      of: richTextOf,
    }),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Ficha Técnica)',
      type: 'file',
      options: {accept: '.pdf'},
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      description: 'Opcional. Se preenchido, substitui o FAQ padrão nesta página.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Pergunta',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Resposta',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
    defineField({
      name: 'relatedSolutions',
      title: 'Soluções Relacionadas',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'solucaoIndustrial'}]})],
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
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'name', tipo: 'tipo', media: 'coverImage', setores: 'setores'},
    prepare({title, tipo, media, setores}) {
      const setorLabel = Array.isArray(setores) && setores.length ? setores.length + ' setor(es)' : ''
      return {title, subtitle: [tipo, setorLabel].filter(Boolean).join(' · '), media}
    },
  },
})
