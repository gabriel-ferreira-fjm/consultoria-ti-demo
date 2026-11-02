# Nexo Data — demonstração

Site de consultoria tecnológica fictícia, com conteúdos em vários idiomas, animações e páginas de serviços e projetos.

**Projeto de demonstração para portefólio.** A identidade, os contactos, os perfis, os testemunhos e os indicadores são exemplos fictícios. Não representam clientes, equipas, avaliações ou resultados reais.

## Tecnologias

React · TypeScript · Vite · Tailwind CSS · React Router · react-i18next · Framer Motion

## Funcionalidades

- Páginas de serviços, projetos, artigos e contacto.
- Português europeu, português do Brasil, inglês e espanhol.
- Animações com Framer Motion e navegação com React Router.
- Formulário com validação e confirmação local.

## Executar localmente

Requisitos: Node.js 22 e npm.

```bash
git clone https://github.com/gabriel-ferreira-fjm/consultoria-ti-demo.git
cd consultoria-ti-demo
npm ci
npm run dev
```

## Verificação

```bash
npm run check:demo
npm run build
npm run preview
```

O workflow de integração executa a verificação da demonstração e a compilação. A verificação automática procura contactos ativos, envios de rede e formatos conhecidos de credenciais; não substitui uma revisão manual.

## Estrutura

```text
src/components/  Componentes de interface
src/pages/       Páginas e rotas
public/demo/     Ilustrações genéricas da demonstração
scripts/         Verificação dos dados de exemplo
```

## Conteúdo e privacidade

- Os formulários simulam a interação no navegador e não enviam pedidos para empresas. Use apenas dados fictícios.
- Fotografias, logótipos, áudio e vídeos de clientes foram substituídos por elementos genéricos.
- As imagens SVG locais não identificam pessoas ou organizações reais.
- Tipos de letra e bandeiras podem ser carregados de fornecedores externos.
- Esta cópia tem histórico independente do projeto original.

## Autor

[Gabriel Silva Ferreira](https://github.com/gabriel-ferreira-fjm) · Desenvolvimento web e Sistemas de Informação.

As dependências mantêm as respetivas licenças. Este repositório é apresentado para avaliação técnica; não atribui direitos sobre materiais de terceiros ou projetos de clientes.
