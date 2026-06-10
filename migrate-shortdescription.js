import {getCliClient} from 'sanity/cli'

// Migra product.shortDescription de string (legado) para Portable Text (rico).
// Idempotente: só converte quando o valor ainda é string.
// Rodar: npx sanity exec migrate-shortdescription.js --with-user-token

const client = getCliClient()

function key() {
  return Math.random().toString(36).slice(2, 12)
}

function stringToPortableText(text) {
  return [
    {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: key(), text, marks: []}],
    },
  ]
}

async function run() {
  const products = await client.fetch(
    `*[_type == "product" && defined(shortDescription)]{_id, name, shortDescription}`,
  )

  let migrated = 0
  for (const p of products) {
    if (typeof p.shortDescription !== 'string') {
      console.log('• já é rico, pulando:', p.name)
      continue
    }
    const blocks = stringToPortableText(p.shortDescription)
    await client.patch(p._id).set({shortDescription: blocks}).commit()
    migrated++
    console.log('✓ migrado:', p.name)
  }
  console.log(`\nConcluído. ${migrated} produto(s) migrado(s).`)
}

run().catch((err) => {
  console.error('Erro na migração:', err.message)
  process.exit(1)
})
