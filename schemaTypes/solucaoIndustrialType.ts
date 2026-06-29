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
      name: 'alternativeNames',
      title: 'Nomes Alternativos / Regionalismos',
      description: 'Outros nomes pelos quais a solução é conhecida. Tecle Enter para adicionar.',
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
        'Desative para ocultar esta solução do catálogo público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Destacar na Home Page',
      description:
        'Marque para exibir esta solução na seção Nossas Soluções da página inicial.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordem na Home Page',
      description:
        'Define a ordem de exibição na seção Nossas Soluções da página inicial (ex: 1, 2, 3...).',
      type: 'number',
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (Destaque Home)',
      description:
        'Curta frase exibida abaixo do nome no card da seção Nossas Soluções.',
      type: 'string',
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
      name: 'category',
      title: 'Categoria',
      description:
        'Categoria do equipamento (compartilhada com o agro — ex: Misturadores, Roscas, Ensacadeiras). ' +
        'Usada no filtro por categoria da página de Soluções.',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto (lista controlada, compartilhada com o agro).',
      type: 'reference',
      to: [{type: 'productLine'}],
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo do equipamento. Ex: EC-500, Pro X1, GA-2000.',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      description: 'Imagem principal exibida nas listagens e na miniatura do Sanity.',
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
        'Resumo que aparece abaixo das fotos na página (com edição rica). ' +
        'O texto puro também alimenta o card na listagem e a meta description de SEO.',
      type: 'array',
      of: richTextOf,
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
            defineField({name: 'property', title: 'Característica', type: 'string'}),
            defineField({name: 'value', title: 'Valor', type: 'string'}),
          ],
          preview: {select: {title: 'property', subtitle: 'value'}},
        }),
      ],
    }),
    cardHighlightsField(
      'Destaques exibidos no card azul lateral, cada um com um ícone à escolha. Se vazio, usa as primeiras especificações.',
    ),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Manual)',
      type: 'file',
      options: {accept: '.pdf'},
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
      name: 'productionScales',
      title: 'Portes de Produção Atendidos',
      description:
        'Marque todos os portes que esta solução atende — pode servir do pequeno ao grande porte.',
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
      name: 'relatedSolutions',
      title: 'Soluções Relacionadas',
      type: 'array',
      description: 'Soluções que podem ser compradas em conjunto ou que são da mesma linha.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'solucaoIndustrial'}]})],
    }),
    defineField({
      name: 'description',
      title: 'Texto Descritivo Principal',
      type: 'array',
      of: richTextOf,
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
    select: {
      title: 'name',
      categoria: 'category.title',
      media: 'coverImage',
      setores: 'setores',
      isActive: 'isActive',
    },
    prepare({title, categoria, media, setores, isActive}) {
      const setorLabel = Array.isArray(setores) && setores.length ? setores.length + ' setor(es)' : ''
      const subtitle = [categoria, setorLabel].filter(Boolean).join(' · ')
      return {title, subtitle: isActive === false ? `INATIVO · ${subtitle}` : subtitle, media}
    },
  },
})
