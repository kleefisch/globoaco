import {getCliClient} from 'sanity/cli'

// Patch pontual: adiciona a quebra de linha no título do slide de exemplo,
// para o título quebrar em 2 linhas como no design original.
// Rodar: npx sanity exec fix-hero-title.js --with-user-token

const client = getCliClient()

async function run() {
  const res = await client
    .patch('hero-slide-exemplo')
    .set({title: 'Sua fábrica de\n**ração** começa aqui.'})
    .commit()
  console.log('✓ Título atualizado:', JSON.stringify(res.title))
}

run().catch((err) => {
  console.error('Erro:', err.message)
  process.exit(1)
})
