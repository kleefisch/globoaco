import type {StructureResolver} from 'sanity/structure'

// Organiza o Studio em grupos: Agro, Outros Setores e Conteúdo & Site.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('🌾 Gerenciamento Agro')
        .child(
          S.list()
            .title('Agro')
            .items([
              S.documentTypeListItem('product').title('Produtos (Agro)'),
              S.documentTypeListItem('productionLine').title('Fábricas Completas'),
              S.documentTypeListItem('segment').title('Segmentos (por animal)'),
            ]),
        ),

      S.listItem()
        .title('🏭 Outros Setores')
        .child(
          S.list()
            .title('Outros Setores')
            .items([
              S.documentTypeListItem('solucaoIndustrial').title('Soluções Industriais'),
              S.documentTypeListItem('linhaIntegrada').title('Linhas Integradas'),
            ]),
        ),

      S.listItem()
        .title('🏷️ Taxonomia (compartilhada)')
        .child(
          S.list()
            .title('Taxonomia')
            .items([
              S.documentTypeListItem('category').title('Categorias'),
              S.documentTypeListItem('productLine').title('Linhas de Produto'),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('📝 Conteúdo & Site')
        .child(
          S.list()
            .title('Conteúdo & Site')
            .items([
              S.documentTypeListItem('heroSlide').title('Hero (Home)'),
              S.documentTypeListItem('post').title('Blog'),
              S.documentTypeListItem('postCategory').title('Categorias do Blog'),
              S.documentTypeListItem('author').title('Autores'),
              S.documentTypeListItem('project').title('Projetos / Cases'),
              S.documentTypeListItem('testimonial').title('Depoimentos'),
              S.documentTypeListItem('teamMember').title('Equipe'),
              S.documentTypeListItem('about').title('Sobre'),
              S.documentTypeListItem('newsletter').title('Newsletter (inscritos)'),
            ]),
        ),
    ])
