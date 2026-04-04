import {getCliClient} from 'sanity/cli'
const client = getCliClient()

const extractText = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

async function migrate() {
  const projects = await client.fetch('*[_type == "project"]')
  
  for (const project of projects) {
    const equipmentText = extractText(project.equipment) || 'Máquinas e sistemas instalados conforme as necessidades operacionais e de espaço do cliente.'
    const chalSolText = extractText(project.challengeAndSolution) || 'Desafios operacionais solucionados com layout verticalizado e tecnologia de ponta.'
    
    await client
      .patch(project._id)
      .set({
        equipmentList: [
          {
            _key: Math.random().toString(36).substring(7),
            title: 'Equipamentos Principais',
            description: equipmentText
          }
        ],
        challenge: [
          {
            _key: Math.random().toString(36).substring(7),
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _key: Math.random().toString(36).substring(7),
                _type: 'span',
                text: chalSolText.substring(0, Math.floor(chalSolText.length / 2)) || 'Modernização e otimização do espaço fabril.',
                marks: []
              }
            ]
          }
        ],
        solution: [
          {
            _key: Math.random().toString(36).substring(7),
            _type: 'block',
            style: 'normal',
            markDefs: [],
            children: [
              {
                _key: Math.random().toString(36).substring(7),
                _type: 'span',
                text: chalSolText.substring(Math.floor(chalSolText.length / 2)) || 'Projeto executado sob medida garantindo 30% mais eficiência.',
                marks: []
              }
            ]
          }
        ]
      })
      .unset(['equipment', 'challengeAndSolution'])
      .commit()
    
    console.log(`Migrated ${project.title}`)
  }
}

migrate().catch(console.error)
