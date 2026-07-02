import {defineType, defineField, defineArrayMember} from 'sanity'
import {ComponentIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField, cardHighlightIcons} from './cardHighlights'
import {SETORES} from './sectors'
import {commercialFieldGroups} from './commercialFieldGroups'
import {applicationSectionsField} from './applicationSections'
import {uniqueRouteSlug} from './routeSlugValidation'

// Linha de produção integrada para setores não-agro (ensaque, dosagem, mistura...)
export const linhaIntegradaType = defineType({
  name: 'linhaIntegrada',
  title: 'Linha Integrada',
  type: 'document',
  icon: ComponentIcon,
  groups: commercialFieldGroups,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Linha',
      description: 'Ex: Linha de Ensaque e Selagem de Areia',
      type: 'string',
      group: 'basic',
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
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      group: 'basic',
      validation: (rule) =>
        rule
          .required()
          .custom(uniqueRouteSlug(['segment', 'productionLine', 'linhaIntegrada'], '/fabricas')),
    }),
    defineField({
      name: 'isActive',
      title: 'Ativo no site',
      description:
        'Desative para ocultar esta linha integrada do catálogo público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
      group: 'basic',
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (card)',
      description: 'Curta frase exibida no card da listagem.',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      description:
        'Categoria da linha integrada, usando a mesma lista dos produtos avulsos quando fizer sentido.',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'classification',
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto/sistema, usando a mesma lista controlada dos produtos avulsos.',
      type: 'reference',
      to: [{type: 'productLine'}],
      group: 'classification',
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo da linha integrada. Ex: LI-600, Ensacamento Pro, Sistema 20T.',
      type: 'string',
      group: 'classification',
    }),
    defineField({
      name: 'catalogGroup',
      title: 'Categoria no catálogo de fábricas',
      description:
        'Define em qual filtro de Fábricas Completas esta linha aparece no site. Se não preencher, entra em Linhas Integradas.',
      type: 'string',
      initialValue: 'integrated',
      options: {
        list: [
          {title: 'Mini-Fábricas', value: 'mini'},
          {title: 'Linhas Compactas', value: 'compact'},
          {title: 'Industrial / Turn-key', value: 'industrial'},
          {title: 'Linhas Integradas', value: 'integrated'},
        ],
        layout: 'radio',
      },
      group: 'classification',
    }),
    defineField({
      name: 'setores',
      title: 'Setores atendidos',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SETORES, layout: 'grid'},
      group: 'classification',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade',
      description: 'Ex: 600 sacos/h, 20 ton/h',
      type: 'string',
      group: 'classification',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      group: 'media',
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
      group: 'media',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico',
      description:
        'Resumo que aparece abaixo das fotos na página da linha integrada (com edição rica). ' +
        'O texto puro também alimenta o card na listagem e a meta description de SEO.',
      type: 'array',
      of: richTextOf,
      group: 'technical',
      validation: (rule) =>
        rule.required().warning('Recomendado para meta description, cards e conversão.'),
    }),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      description: 'Adicione características como Capacidade, Potência, Dimensões, Área ocupada, etc.',
      group: 'technical',
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
      'technical',
    ),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Catálogo)',
      type: 'file',
      options: {accept: '.pdf'},
      group: 'media',
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações / Materiais',
      description: 'O que a linha processa/embala (ex: Areia, Pedras, Cimento).',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'applications',
      validation: (rule) =>
        rule.min(1).warning('Informe ao menos uma aplicação/material para melhorar filtros e SEO.'),
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
      group: 'applications',
    }),
    applicationSectionsField(),
    defineField({
      name: 'includedEquipment',
      title: 'O que está incluso (Equipamentos)',
      description: 'Equipamentos que compõem a linha. Vincule às soluções do catálogo quando existirem.',
      type: 'array',
      group: 'system',
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
      group: 'system',
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
      group: 'content',
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      description:
        'Opcional. Se preenchido, substitui o FAQ padrão nesta página de linha integrada.',
      type: 'array',
      group: 'content',
      validation: (rule) =>
        rule.min(2).warning('Recomendado para rich results e dúvidas comerciais frequentes.'),
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
      group: 'relations',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      group: 'basic',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      group: 'seo',
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
      catalogGroup: 'catalogGroup',
      media: 'coverImage',
      capacity: 'capacity',
      isActive: 'isActive',
    },
    prepare({title, category, catalogGroup, media, capacity, isActive}) {
      const groupLabel =
        {
          mini: 'Mini-Fábricas',
          compact: 'Linhas Compactas',
          industrial: 'Industrial / Turn-key',
          integrated: 'Linhas Integradas',
        }[catalogGroup as string] || 'Linhas Integradas'
      const subtitle = [category || 'Linha Integrada', groupLabel, capacity]
        .filter(Boolean)
        .join(' · ')
      return {title, subtitle: isActive === false ? `INATIVO · ${subtitle}` : subtitle, media}
    },
  },
})
