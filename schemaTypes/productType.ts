import {defineType, defineField, defineArrayMember} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField} from './cardHighlights'

export const productType = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alternativeNames',
      title: 'Nomes Alternativos / Regionalismos',
      description:
        'Ex: Envasadora de bolacha, Empacotadora de biscoito. Tecle Enter para adicionar.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Destacar na Home Page',
      description:
        'Marque esta opção para exibir este produto na seção Nossas Soluções da página inicial.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordem na Home Page',
      description:
        'Define a ordem de exibição do produto na seção Nossas Soluções da página inicial (ex: 1, 2, 3...)',
      type: 'number',
    }),
    defineField({
      name: 'featuredCatchphrase',
      title: 'Frase de Impacto (Destaque Home)',
      description:
        'Curta frase que aparecerá logo abaixo do nome do produto no card da seção Nossas Soluções.',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto (lista controlada). Exibida abaixo do nome na página.',
      type: 'reference',
      to: [{type: 'productLine'}],
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo do equipamento. Ex: MH-500, Pro X1, GA-2000.',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      description: 'Imagem principal exibida nas listagens e na miniatura do Sanity.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Imagens Galeria do Produto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo',
            }),
          ],
        }),
      ],
    }),
    // ATENÇÃO: campo migrado de 'text' (string) para texto rico. Produtos antigos
    // que tinham texto simples precisam ser reeditados aqui. O card da listagem,
    // SEO e preview extraem o texto puro automaticamente (pt::text).
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico',
      type: 'array',
      of: richTextOf,
      description:
        'Resumo que aparece abaixo das fotos na página do produto (com edição rica). ' +
        'O texto puro também alimenta o card na listagem e a meta description de SEO.',
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
            defineField({
              name: 'property',
              title: 'Característica',
              type: 'string',
              description: 'Ex: Potência do Motor',
            }),
            defineField({
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'Ex: 50 CV',
            }),
          ],
          preview: {
            select: {
              title: 'property',
              subtitle: 'value',
            },
          },
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
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'applications',
      title: 'Aplicações (Ideal para)',
      description: 'Ex: Ração Animal, Sal Mineral, Grãos, etc. Pressione Enter para adicionar.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'animalTypes',
      title: 'Tipos de Animais Atendidos',
      description: 'Selecione os tipos de animais para os quais este equipamento pode produzir.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Bovinos', value: 'bovino'},
          {title: 'Suínos', value: 'suino'},
          {title: 'Aves', value: 'aves'},
          {title: 'Equinos', value: 'equino'},
          {title: 'Peixes', value: 'peixe'},
          {title: 'Pets', value: 'pet'},
          {title: 'Caprinos/Ovinos', value: 'caprino'},
          {title: 'Outros', value: 'outros'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'productionScales',
      title: 'Portes de Produção Atendidos',
      description:
        'Marque todos os portes que este equipamento atende — um mesmo equipamento pode servir do pequeno ao grande produtor.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Pequeno produtor', value: 'pequeno'},
          {title: 'Médio porte', value: 'medio'},
          {title: 'Grande porte', value: 'grande'},
          {title: 'Industrial', value: 'industrial'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Produtos Correlatos',
      type: 'array',
      description:
        'Selecione produtos que podem ser comprados em conjunto ou que são da mesma linha.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
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
      description:
        'Opcional. Se preenchido, substitui o FAQ padrão do site nesta página de produto.',
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
          description: 'Recomendado até 60 caracteres',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descrição',
          type: 'text',
          rows: 2,
          description: 'Recomendado até 160 caracteres',
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      coverImage: 'coverImage',
      images: 'images',
    },
    prepare(selection) {
      const {title, subtitle, coverImage, images} = selection
      // subtitle agora é Portable Text (array de blocos); extrai o texto puro.
      let subtitleText = ''
      if (Array.isArray(subtitle)) {
        const first = subtitle.find((b) => b._type === 'block')
        subtitleText =
          first?.children?.map((c: {text?: string}) => c.text || '').join('') || ''
      } else if (typeof subtitle === 'string') {
        subtitleText = subtitle
      }
      return {
        title: title,
        subtitle: subtitleText,
        media: coverImage || (images && images.length > 0 ? images[0] : undefined),
      }
    },
  },
})
