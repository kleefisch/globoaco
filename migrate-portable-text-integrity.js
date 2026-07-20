import {getCliClient} from 'sanity/cli'

// Normaliza campos Portable Text que podem ter sido criados por migrações,
// imports ou IA sem arrays obrigatórios como children, marks ou markDefs.
//
// Rodar primeiro em modo simulação:
//   DRY_RUN=1 npx sanity exec migrate-portable-text-integrity.js --with-user-token
//
// Aplicar:
//   npx sanity exec migrate-portable-text-integrity.js --with-user-token

const client = getCliClient()
const dryRun = process.env.DRY_RUN === '1'

const documentFields = [
  {
    type: 'product',
    titleField: 'name',
    fields: ['shortDescription', 'description'],
  },
  {
    type: 'solucaoIndustrial',
    titleField: 'name',
    fields: ['shortDescription', 'description'],
  },
  {
    type: 'productionLine',
    titleField: 'title',
    fields: ['shortDescription', 'description'],
  },
  {
    type: 'linhaIntegrada',
    titleField: 'title',
    fields: ['shortDescription', 'description'],
  },
  {
    type: 'segment',
    titleField: 'title',
    fields: ['description'],
  },
  {
    type: 'project',
    titleField: 'title',
    fields: ['overview', 'challenge', 'solution'],
  },
]

function key() {
  return Math.random().toString(36).slice(2, 12)
}

function textBlock(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: key(),
        text: String(text || ''),
        marks: [],
      },
    ],
  }
}

function normalizeSpan(child) {
  if (!child || typeof child !== 'object') {
    return {
      _type: 'span',
      _key: key(),
      text: String(child || ''),
      marks: [],
    }
  }

  if (child._type && child._type !== 'span') {
    return {
      ...child,
      _key: child._key || key(),
    }
  }

  return {
    ...child,
    _type: 'span',
    _key: child._key || key(),
    text: typeof child.text === 'string' ? child.text : String(child.text || ''),
    marks: Array.isArray(child.marks) ? child.marks : [],
  }
}

function normalizeBlock(block) {
  if (!block || typeof block !== 'object') return textBlock('')

  const children = Array.isArray(block.children)
    ? block.children.map(normalizeSpan)
    : [normalizeSpan({text: block.text || ''})]

  return {
    ...block,
    _type: 'block',
    _key: block._key || key(),
    style: block.style || 'normal',
    listItem: block.listItem || undefined,
    level: block.level || undefined,
    markDefs: Array.isArray(block.markDefs) ? block.markDefs : [],
    children,
  }
}

function normalizePortableText(value) {
  if (value === undefined || value === null || value === '') return value
  if (typeof value === 'string' || typeof value === 'number') return [textBlock(value)]

  if (!Array.isArray(value)) {
    return [textBlock(value.text || '')]
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return textBlock(item)
      if (item._type === 'block' || !item._type) return normalizeBlock(item)

      return {
        ...item,
        _key: item._key || key(),
      }
    })
    .filter(Boolean)
}

function stableStringify(value) {
  return JSON.stringify(value)
}

async function run() {
  let checked = 0
  let changedDocuments = 0
  let changedFields = 0

  for (const config of documentFields) {
    const projection = config.fields.map((field) => `${field}`).join(', ')
    const docs = await client.fetch(
      `*[_type == $type && (${config.fields.map((field) => `defined(${field})`).join(' || ')})]{
        _id,
        _type,
        ${config.titleField},
        ${projection}
      }`,
      {type: config.type},
    )

    for (const doc of docs) {
      checked++
      const patch = {}

      for (const field of config.fields) {
        const current = doc[field]
        const normalized = normalizePortableText(current)
        if (current === undefined || stableStringify(current) === stableStringify(normalized)) {
          continue
        }
        patch[field] = normalized
      }

      const fields = Object.keys(patch)
      if (!fields.length) continue

      changedDocuments++
      changedFields += fields.length
      const title = doc[config.titleField] || doc._id
      console.log(`• ${dryRun ? 'corrigiria' : 'corrigindo'} ${config.type}: ${title}`)
      console.log(`  campos: ${fields.join(', ')}`)

      if (!dryRun) {
        await client.patch(doc._id).set(patch).commit()
      }
    }
  }

  console.log('\nResumo:')
  console.log(`- Documentos verificados: ${checked}`)
  console.log(`- Documentos com correção: ${changedDocuments}`)
  console.log(`- Campos corrigidos: ${changedFields}`)
  console.log(`- Modo: ${dryRun ? 'simulação' : 'aplicado'}`)
}

run().catch((error) => {
  console.error('Erro na normalização de Portable Text:', error)
  process.exit(1)
})
