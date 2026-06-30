import type {StructureResolver} from 'sanity/structure'

// Organiza o Studio pelo fluxo editorial real: catálogo, taxonomias e conteúdo institucional.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('📦 Catálogo Comercial')
        .child(
          S.list()
            .title('Catálogo Comercial')
            .items([
              S.listItem()
                .title('Avulsos')
                .child(
                  S.list()
                    .title('Soluções Avulsas')
                    .items([
                      S.documentTypeListItem('product').title('Produtos Avulsos Agro'),
                      S.documentTypeListItem('solucaoIndustrial').title('Soluções Industriais Avulsas'),
                    ]),
                ),
              S.listItem()
                .title('Sistemas completos')
                .child(
                  S.list()
                    .title('Fábricas e Linhas')
                    .items([
                      S.documentTypeListItem('productionLine').title('Fábricas Completas Agro'),
                      S.documentTypeListItem('linhaIntegrada').title('Linhas Integradas / Outros Setores'),
                    ]),
                ),
              S.documentTypeListItem('segment').title('Páginas por Aplicação Agro'),
            ]),
        ),

      S.listItem()
        .title('🏷️ Taxonomias & Menus')
        .child(
          S.list()
            .title('Taxonomias & Menus')
            .items([
              S.documentTypeListItem('category').title('Categorias'),
              S.documentTypeListItem('productLine').title('Linhas de Produto'),
              S.documentTypeListItem('segment').title('Aplicações Agro no menu Fábricas'),
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
