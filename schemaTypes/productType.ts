import {defineType, defineField, defineArrayMember} from 'sanity'
import {PackageIcon} from '@sanity/icons'

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
    defineField({
      name: 'shortDescription',
      title: 'Resumo Técnico',
      type: 'text',
      description:
        'Breve descrição que aparece no card do produto na listagem e na parte superior da página.',
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
          {title: 'Pets', value: 'pet'},
          {title: 'Caprinos/Ovinos', value: 'caprino'},
          {title: 'Outros', value: 'outros'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'productionScale',
      title: 'Porte de Produção (Escala de 1 a 5)',
      description: '1 = Pequeno Produtor/Iniciante, 5 = Grande Indústria de Alta Demanda',
      type: 'number',
      validation: (rule) => rule.min(1).max(5).integer(),
      options: {
        list: [
          {title: 'Empreendedor/Inicial (1)', value: 1},
          {title: 'Pequeno Produtor (2)', value: 2},
          {title: 'Média Produção (3)', value: 3},
          {title: 'Semi-Industrial (4)', value: 4},
          {title: 'Grande Indústria (5)', value: 5},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Produtos Correlatos',
      type: 'array',
      description: 'Selecione produtos que podem ser comprados em conjunto ou que são da mesma linha.',
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
      of: [defineArrayMember({type: 'block'})],
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
      return {
        title: title,
        subtitle: subtitle,
        media: coverImage || (images && images.length > 0 ? images[0] : undefined),
      }
    },
  },
})
