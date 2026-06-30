import {defineType, defineField, defineArrayMember} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField, cardHighlightIcons} from './cardHighlights'
import {SETORES} from './sectors'

// Linha de produção integrada para setores não-agro (ensaque, dosagem, mistura...)
export const linhaIntegradaType = defineType({
  name: 'linhaIntegrada',
  title: 'Linha Integrada',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Linha',
      description: 'Ex: Linha de Ensaque e Selagem de Areia',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Nomes Alternativos / Regionalismos',
      description:
        'Outros nomes pelos quais esta linha integrada é conhecida. Tecle Enter para adicionar.',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Ativo no site',
      description:
        'Desative para ocultar esta linha integrada do catálogo público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
      description: 'Curta frase exibida no card da listagem.',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      description:
        'Categoria da linha integrada, usando a mesma lista dos produtos avulsos quando fizer sentido.',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto/sistema, usando a mesma lista controlada dos produtos avulsos.',
      type: 'reference',
      to: [{type: 'productLine'}],
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo da linha integrada. Ex: LI-600, Ensacamento Pro, Sistema 20T.',
      type: 'string',
    }),
    defineField({
      name: 'setores',
      title: 'Setores atendidos',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SETORES, layout: 'grid'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      description: 'Ex: 600 sacos/h, 20 ton/h',
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
      title: 'Resumo Técnico',
      description:
        'Resumo que aparece abaixo das fotos na página da linha integrada (com edição rica). ' +
        'O texto puro também alimenta o card na listagem e a meta description de SEO.',
      type: 'array',
      of: richTextOf,
    }),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      description: 'Adicione características como Capacidade, Potência, Dimensões, Área ocupada, etc.',
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
    cardHighlightsField(
      'Destaques exibidos no card azul lateral, cada um com um ícone à escolha. Se vazio, o card fica sem destaques.',
    ),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Catálogo)',
      type: 'file',
      options: {accept: '.pdf'},
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações / Materiais',
      description: 'O que a linha processa/embala (ex: Areia, Pedras, Cimento).',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'productionScales',
      title: 'Portes de Produção Atendidos',
      description:
        'Marque todos os portes que esta linha integrada atende — pode servir do pequeno ao grande porte.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Pequeno porte', value: 'pequeno'},
          {title: 'Médio porte', value: 'medio'},
          {title: 'Grande porte', value: 'grande'},
          {title: 'Industrial', value: 'industrial'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'includedEquipment',
      title: 'O que está incluso (Equipamentos)',
      description: 'Equipamentos que compõem a linha. Vincule às soluções do catálogo quando existirem.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'solution',
              title: 'Solução do catálogo (opcional)',
              type: 'reference',
              to: [{type: 'solucaoIndustrial'}, {type: 'product'}],
            }),
            defineField({name: 'name', title: 'Nome (se não for do catálogo)', type: 'string'}),
            defineField({name: 'note', title: 'Observação', type: 'string'}),
          ],
          preview: {
            select: {refName: 'solution.name', name: 'name', note: 'note'},
            prepare({refName, name, note}) {
              return {title: refName || name || 'Equipamento', subtitle: note}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'processFlow',
      title: 'Fluxo de Produção (etapas)',
      description: 'Ex: Dosagem → Transporte → Pesagem → Ensaque → Selagem.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Etapa',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'description', title: 'Descrição', type: 'text', rows: 2}),
            defineField({
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              initialValue: 'gear',
              options: {list: cardHighlightIcons},
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Descrição Detalhada (texto rico)',
      type: 'array',
      of: richTextOf,
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      description:
        'Opcional. Se preenchido, substitui o FAQ padrão nesta página de linha integrada.',
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
      name: 'relatedProjects',
      title: 'Cases Relacionados (Projetos entregues)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
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
  orderings: [{title: 'Ordem', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {
      title: 'name',
      category: 'category.title',
      media: 'coverImage',
      capacity: 'capacity',
      isActive: 'isActive',
    },
    prepare({title, category, media, capacity, isActive}) {
      const subtitle = [category || 'Linha Integrada', capacity].filter(Boolean).join(' · ')
      return {title, subtitle: isActive === false ? `INATIVO · ${subtitle}` : subtitle, media}
    },
  },
})
