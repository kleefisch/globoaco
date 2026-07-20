import {defineArrayMember, defineField} from 'sanity'

const tableStyleOptions = [
  {title: 'Técnica clara', value: 'technical'},
  {title: 'Listrada', value: 'striped'},
  {title: 'Azul escuro', value: 'dark'},
  {title: 'Destaque laranja', value: 'accent'},
]

const tableDensityOptions = [
  {title: 'Confortável', value: 'comfortable'},
  {title: 'Compacta', value: 'compact'},
]

const tableAlignOptions = [
  {title: 'Esquerda', value: 'left'},
  {title: 'Centro', value: 'center'},
  {title: 'Direita', value: 'right'},
]

const tableCellToneOptions = [
  {title: 'Padrão', value: 'default'},
  {title: 'Destaque', value: 'highlight'},
  {title: 'Positivo', value: 'success'},
  {title: 'Atenção', value: 'warning'},
  {title: 'Neutro', value: 'muted'},
]

const tableEditModeOptions = [
  {title: 'Colar do Excel / Sheets / CSV', value: 'paste'},
  {title: 'Manual célula por célula', value: 'manual'},
]

export const tableBlock = defineArrayMember({
  name: 'tableBlock',
  title: 'Tabela técnica',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da tabela (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'caption',
      title: 'Legenda / observação (opcional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'editMode',
      title: 'Modo de edição',
      description:
        'Use "Colar" para copiar direto de Excel/Google Sheets/CSV. Use "Manual" quando precisar controlar célula por célula.',
      type: 'string',
      initialValue: 'paste',
      options: {list: tableEditModeOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pastedTable',
      title: 'Colar tabela',
      description:
        'Cole aqui dados do Excel/Google Sheets, CSV ou tabela Markdown. A primeira linha pode ser usada como cabeçalho.',
      type: 'text',
      rows: 10,
      hidden: ({parent}) => parent?.editMode === 'manual',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {editMode?: string}
          if (parent?.editMode !== 'manual' && !value) {
            return 'Cole a tabela ou troque o modo de edição para manual.'
          }
          return true
        }),
    }),
    defineField({
      name: 'style',
      title: 'Estilo visual',
      type: 'string',
      initialValue: 'technical',
      options: {list: tableStyleOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'density',
      title: 'Densidade',
      type: 'string',
      initialValue: 'comfortable',
      options: {list: tableDensityOptions, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hasHeaderRow',
      title: 'Usar primeira linha como cabeçalho',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'columns',
      title: 'Colunas',
      description:
        'Adicione uma coluna para cada célula esperada por linha. O rótulo aparece no cabeçalho quando a primeira linha não for usada como cabeçalho.',
      type: 'array',
      hidden: ({parent}) => parent?.editMode !== 'manual',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {editMode?: string}
          if (parent?.editMode === 'manual' && (!Array.isArray(value) || value.length === 0)) {
            return 'Adicione ao menos uma coluna.'
          }
          if (Array.isArray(value) && value.length > 8) {
            return 'Use no máximo 8 colunas.'
          }
          return true
        }),
      of: [
        defineArrayMember({
          name: 'tableColumn',
          type: 'object',
          title: 'Coluna',
          fields: [
            defineField({
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'align',
              title: 'Alinhamento',
              type: 'string',
              initialValue: 'left',
              options: {list: tableAlignOptions, layout: 'radio'},
            }),
          ],
          preview: {
            select: {title: 'label', align: 'align'},
            prepare({title, align}) {
              return {title: title || 'Coluna', subtitle: align || 'left'}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'rows',
      title: 'Linhas',
      type: 'array',
      hidden: ({parent}) => parent?.editMode !== 'manual',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {editMode?: string}
          if (parent?.editMode === 'manual' && (!Array.isArray(value) || value.length === 0)) {
            return 'Adicione ao menos uma linha.'
          }
          return true
        }),
      of: [
        defineArrayMember({
          name: 'tableRow',
          type: 'object',
          title: 'Linha',
          fields: [
            defineField({
              name: 'cells',
              title: 'Células',
              description:
                'Adicione as células na mesma ordem das colunas. Ex.: se a tabela tem 3 colunas, cada linha deve ter 3 células.',
              type: 'array',
              validation: (rule) => rule.required().min(1).max(8),
              of: [
                defineArrayMember({
                  name: 'tableCell',
                  type: 'object',
                  title: 'Célula',
                  fields: [
                    defineField({
                      name: 'text',
                      title: 'Texto',
                      type: 'text',
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'tone',
                      title: 'Tom visual',
                      type: 'string',
                      initialValue: 'default',
                      options: {list: tableCellToneOptions},
                    }),
                  ],
                  preview: {
                    select: {title: 'text', tone: 'tone'},
                    prepare({title, tone}) {
                      return {title: title || 'Célula', subtitle: tone || 'default'}
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {cells: 'cells'},
            prepare({cells}) {
              const firstCell = Array.isArray(cells) ? cells[0]?.text : undefined
              const count = Array.isArray(cells) ? cells.length : 0
              return {
                title: firstCell || 'Linha da tabela',
                subtitle: `${count} célula(s)`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      rows: 'rows',
      style: 'style',
      editMode: 'editMode',
      pastedTable: 'pastedTable',
    },
    prepare({title, columns, rows, style, editMode, pastedTable}) {
      const columnCount = Array.isArray(columns) ? columns.length : 0
      const rowCount = Array.isArray(rows) ? rows.length : 0
      const pastedRows =
        typeof pastedTable === 'string'
          ? pastedTable.split('\n').filter((line) => line.trim()).length
          : 0
      return {
        title: title || 'Tabela técnica',
        subtitle:
          editMode === 'manual'
            ? `${columnCount} coluna(s) · ${rowCount} linha(s) · ${style || 'technical'}`
            : `Colada · ${pastedRows} linha(s) · ${style || 'technical'}`,
      }
    },
  },
})
