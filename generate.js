const fs = require('fs');

const doc = {
  _id: 'maquina-industrial-de-exemplo-pro-x1-doc',
  _type: 'product',
  name: 'Máquina Industrial de Exemplo Pro X1',
  slug: {
    _type: 'slug',
    current: 'maquina-industrial-de-exemplo-pro-x1',
  },
  category: {
    _ref: '7e841cdd-29b1-4c85-9a4a-b9e2edfc111f',
    _type: 'reference'
  },
  shortDescription: 'Uma máquina industrial avançada e de alta eficiência, projetada para otimizar processos de produção complexos com máxima precisão e controle. Ideal para linhas de montagem contínuas e aplicações pesadas na indústria.',
  specifications: [
    { _key: 'spec1', property: 'Potência', value: '150 kW' },
    { _key: 'spec2', property: 'Capacidade', value: '5000 unidades/h' },
    { _key: 'spec3', property: 'Tensão', value: '380V Trifásico' },
    { _key: 'spec4', property: 'Peso do Equipamento', value: '850 kg' },
    { _key: 'spec5', property: 'Nível de Ruído', value: '< 75 dB' },
  ],
  description: [
    {
      _key: 'block1',
      _type: 'block',
      children: [
        {
          _key: 'span1',
          _type: 'span',
          marks: [],
          text: 'Esta é uma máquina industrial avançada e de alta eficiência, projetada para otimizar processos de produção complexos com máxima precisão e controle. Ideal para linhas de montagem contínuas e aplicações pesadas na indústria.',
        }
      ],
      markDefs: [],
      style: 'normal',
    },
  ]
};

fs.writeFileSync('mock.ndjson', JSON.stringify(doc) + '\n');
