import {defineType, defineField, defineArrayMember} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {richTextOf} from './richText'
import {cardHighlightsField} from './cardHighlights'
import {commercialFieldGroups} from './commercialFieldGroups'
import {applicationSectionsField} from './applicationSections'
import {SETORES} from './sectors'
import {uniqueRouteSlug} from './routeSlugValidation'

export const productType = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: PackageIcon,
  groups: commercialFieldGroups,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      group: 'basic',
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
      group: 'basic',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      group: 'basic',
      validation: (rule) =>
        rule.required().custom(uniqueRouteSlug(['product', 'solucaoIndustrial'], '/solucoes')),
    }),
    defineField({
      name: 'isActive',
      title: 'Ativo no site',
      description:
        'Desative para ocultar este equipamento do catálogo público sem apagar o cadastro.',
      type: 'boolean',
      initialValue: true,
      group: 'basic',
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Destacar na Home Page',
      description:
        'Marque esta opção para exibir este produto na seção Nossas Soluções da página inicial.',
      type: 'boolean',
      initialValue: false,
      group: 'basic',
    }),
    defineField({
      name: 'homeOrder',
      title: 'Ordem na Home Page',
      description:
        'Define a ordem de exibição do produto na seção Nossas Soluções da página inicial (ex: 1, 2, 3...)',
      type: 'number',
      group: 'basic',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'classification',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'line',
      title: 'Linha',
      description: 'Linha do produto (lista controlada). Exibida abaixo do nome na página.',
      type: 'reference',
      to: [{type: 'productLine'}],
      group: 'classification',
    }),
    defineField({
      name: 'model',
      title: 'Modelo',
      description: 'Código/modelo do equipamento. Ex: MH-500, Pro X1, GA-2000.',
      type: 'string',
      group: 'classification',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacidade / Produção',
      description: 'Ex: 500 kg/h, 2 ton/h, 600 sacos/h.',
      type: 'string',
      group: 'classification',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      description: 'Imagem principal exibida nas listagens e na miniatura do Sanity.',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'media',
      validation: (rule) =>
        rule.required().warning('Recomendado para SEO, cards do catálogo e compartilhamento.'),
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
      group: 'media',
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
      group: 'technical',
      validation: (rule) =>
        rule.required().warning('Recomendado para meta description, cards e conversão.'),
    }),
    defineField({
      name: 'specifications',
      title: 'Especificações Técnicas',
      type: 'array',
      description: 'Adicione características como Potência, Peso, Dimensões, etc.',
      group: 'technical',
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
      'technical',
    ),
    defineField({
      name: 'datasheet',
      title: 'Arquivo PDF (Datasheet/Manual)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'media',
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
      group: 'applications',
      validation: (rule) =>
        rule.min(1).warning('Informe ao menos uma aplicação para melhorar filtros e SEO long tail.'),
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
      group: 'applications',
    }),
    defineField({
      name: 'setores',
      title: 'Setores atendidos',
      description:
        'Opcional. Use quando este equipamento avulso também puder atender setores fora do agro.',
      type: 'array',
      of: [{type: 'string'}],
      options: {list: SETORES, layout: 'grid'},
      group: 'applications',
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
      group: 'applications',
    }),
    applicationSectionsField(),
    defineField({
      name: 'relatedProducts',
      title: 'Produtos Correlatos',
      type: 'array',
      description:
        'Selecione produtos que podem ser comprados em conjunto ou que são da mesma linha.',
      group: 'relations',
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
      group: 'content',
    }),
    defineField({
      name: 'faq',
      title: 'Perguntas Frequentes (FAQ)',
      description:
        'Opcional. Se preenchido, substitui o FAQ padrão do site nesta página de produto.',
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
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, coverImage, images, isActive} = selection
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
        subtitle: isActive === false ? `INATIVO · ${subtitleText}` : subtitleText,
        media: coverImage || (images && images.length > 0 ? images[0] : undefined),
      }
    },
  },
})
