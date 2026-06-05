import {getCliClient} from 'sanity/cli'
import {createReadStream} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {dirname, join} from 'node:path'

// Cria UM slide de exemplo para o Hero (heroSlide), já com imagem de capa.
// Usa o cliente autenticado da CLI do Sanity (sem token hardcoded).
// Rodar: npx sanity exec seed-hero.js --with-user-token

const client = getCliClient()

const __dirname = dirname(fileURLToPath(import.meta.url))
const imagePath = join(__dirname, '../web/public/stock/fabrica-racao.jpg')

async function seed() {
  // Evita duplicar se rodar de novo: usa um _id fixo para o slide de exemplo.
  const SLIDE_ID = 'hero-slide-exemplo'
  const existing = await client.getDocument(SLIDE_ID).catch(() => null)
  if (existing) {
    console.log('Slide de exemplo já existe (hero-slide-exemplo). Nada a fazer.')
    return
  }

  console.log('Enviando imagem de capa para o Sanity...')
  const asset = await client.assets.upload('image', createReadStream(imagePath), {
    filename: 'hero-exemplo-fabrica-racao.jpg',
  })
  console.log('Imagem enviada:', asset._id)

  const doc = {
    _id: SLIDE_ID,
    _type: 'heroSlide',
    tag: 'Engenharia 100% Brasileira',
    title: 'Sua fábrica de\n**ração** começa aqui.',
    description:
      'De 500 kg a dezenas de toneladas por dia — projetamos, fabricamos e entregamos a solução completa para você produzir com autonomia, eficiência e resultado.',
    mediaType: 'image',
    image: {
      _type: 'image',
      asset: {_type: 'reference', _ref: asset._id},
      alt: 'Fábrica de ração da Globo Aço Máquinas',
    },
    flipHorizontal: false,
    primaryCtaLabel: 'Explorar Soluções',
    primaryCtaHref: '/solucoes',
    secondaryCtaLabel: 'Falar com Especialista',
    secondaryCtaHref: '/contato',
    order: 1,
    enabled: true,
  }

  await client.createOrReplace(doc)
  console.log('✓ Slide de exemplo criado:', SLIDE_ID)
}

seed().catch((err) => {
  console.error('Erro ao criar slide de exemplo:', err.message)
  process.exit(1)
})
