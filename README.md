# Globo Aço Máquinas — Sanity Studio

CMS usado para gerenciar o conteúdo comercial e técnico do site da Globo Aço Máquinas.

## Stack

- Sanity Studio
- Dataset: `production`
- Project ID: `pekr6iy4`
- Schemas em TypeScript

## Comandos

```bash
npm run dev
npm run lint
npm run typecheck
npm run verify
npm run build
npm run deploy
```

Use `npm run verify` antes de publicar mudanças de schema ou estrutura.

## Estrutura Principal

- `schemaTypes`: schemas de produtos, soluções, fábricas, blog, projetos, hero, equipe e páginas institucionais.
- `structure.ts`: organização do menu editorial dentro do Studio.
- `sanity.config.ts`: configuração do Studio, plugins, dataset e schemas.
- `static`: arquivos estáticos do Studio.

## Tipos De Conteúdo Mais Importantes

- `heroSlide`: banners da home, incluindo imagem desktop/mobile, vídeo e CTA.
- `product`: equipamentos e produtos do catálogo.
- `solucaoIndustrial`: soluções industriais e páginas comerciais.
- `productionLine`: fábricas completas e linhas de produção.
- `segment`: segmentos atendidos.
- `project`: projetos e cases.
- `post` e `postCategory`: blog técnico.
- `testimonial`: depoimentos.
- `about` e `teamMember`: conteúdo institucional.

## Cuidados Editoriais

- Preencher campos de SEO quando disponíveis: título, descrição e imagem.
- Usar slugs estáveis; mudança de slug pode quebrar links já indexados.
- Preferir imagens enviadas ao Sanity em vez de URLs externas.
- Manter alt text nas imagens que representam produtos, projetos ou pessoas.
- Revisar relações entre produtos, soluções, fábricas e projetos para fortalecer links internos.

## Cuidados Técnicos

- Alterações em schemas podem exigir migração de conteúdo existente.
- Antes de remover ou renomear campos, verificar queries em `../web/src/sanity/queries.ts`.
- Antes de publicar mudanças grandes, rodar `npm run verify` no Studio e no Web.
- Se alterar slugs, revisar sitemap, páginas pilar e links internos no site.

## Deploy

O deploy do Studio é feito pelo comando:

```bash
npm run deploy
```

Antes do deploy, confirme se as alterações de schema foram testadas localmente e se o site web continua lendo os campos esperados.
