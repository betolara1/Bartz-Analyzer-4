<div align="center">

# 🏗️ Bartz Analyzer

### Sistema Inteligente de Monitoramento e Validação de XML para Produção

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-37-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

---

## 📸 Preview

<div align="center">
  <img src="docs/img/bartz_analyzer.png" alt="Bartz Analyzer Dashboard" width="100%">
</div>

<div align="center">
  <img src="docs/img/bartz_analyzer_2.png" width="49%" />
  <img src="docs/img/bartz_analyzer_3.png" width="49%" />
</div>

---

## 📌 Sobre o Projeto

O **Bartz Analyzer** é uma ferramenta de missão crítica projetada para o ecossistema produtivo da Bartz. Ele atua como uma sentinela inteligente que monitora diretórios de rede em tempo real, interceptando arquivos XML de pedidos e aplicando uma bateria de validações técnicas rigorosas.

O sistema resolve o problema de inconsistências em arquivos de exportação que podem interromper máquinas ou gerar peças incorretas.

**Principais Funcionalidades:**

- ✅ **Monitoramento Ativo** — Observa pastas de rede via Chokidar.
- ✅ **Auto-Fix Inteligente** — Corrige automaticamente erros triviais de preços e quantidades.
- ✅ **Validação de Engenharia** — Detecta usinagens de 37mm, itens coringa e cores pendentes.
- ✅ **Interface em Tempo Real** — Dashboard dinâmico que reflete o estado da fila de produção.
- ✅ **Integração ERP** — Busca de informações complementares para resolução de pendências.
- ✅ **Segurança de Fluxo** — Garante que apenas arquivos validados cheguem ao destino final.

---

## 🏛️ Arquitetura

O sistema utiliza a arquitetura do **Electron**, separando a lógica de baixo nível (Node.js) da interface do usuário (React).

```
📦 Bartz-Analyzer
 ├── 🖥️ electron/            # Processo Principal (Main Process: Watcher, FS, IPC)
 ├── 🎨 src/                 # Processo de Renderização (Interface React + Vite)
 │    ├── 🧩 components/     # Componentes UI (Radix UI + Lucide)
 │    ├── ⚓ hooks/          # Hooks customizados e comunicação IPC
 │    ├── ⚙️ Settings.ts     # Gerenciamento de configurações persistentes
 │    ├── 🛠️ lib/            # Configurações de Tailwind e utilitários
 │    └── 🏷️ types/          # Definições de tipos globais
 ├── 🧪 tests/               # Testes unitários da lógica de validação
 ├── 📜 docs/                # Documentação e screenshots
 └── 🐳 Dockerfile           # Configuração para ambiente containerizado
```

---

## 🚀 Comunicação (IPC)

A integração entre os processos é feita via canais seguros de IPC (Inter-Process Communication).

### Exemplo de Resposta de Validação
```json
{
  "arquivo": "C:\\Producao\\Pedido_001.xml",
  "erros": [{ "descricao": "USINAGEM 37MM DETECTADA" }],
  "tags": ["usinagem_37", "fix_applied"],
  "meta": {
    "machines": [{ "id": "101", "name": "Biesse Rover" }]
  }
}
```

---

## 🧪 Testes

A integridade da lógica de validação é garantida por uma robusta suíte de testes automatizados.

| Camada | Ferramenta | Foco |
|--------|------------|------|
| **Lógica (Unit)** | Vitest | Validação XML, Detecção de ES08, Coringas |
| **Integração** | Playwright (previsto) | Fluxo de interface e IPC |

```bash
# Executar suíte de testes
npm test
```

---

## 🐳 Rodando com Docker

Ideal para garantir consistência no ambiente de build ou execução controlada:

**Subir ambiente:**
```bash
docker-compose up --build -d
```

---

## 💻 Desenvolvimento e Build

**Pré-requisitos:**
- Node.js 20+
- npm 10+

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar em modo desenvolvimento
npm run dev

# 3. Gerar executável para Windows (.exe)
npm run build
npm run dist:win
```

*O executável final será gerado na pasta `release/`.*

---

## 📊 CI/CD (GitHub Actions)

Pipeline automatizado configurado para cada Pull Request ou Push:

- **Lint**: Garantia de padrões via ESLint.
- **Build**: Validação de compilação TypeScript/Vite.
- **Test**: Execução obrigatória de todos os testes Vitest.

---

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Finalidade |
|-----------|--------|------------|
| Electron | 37 | Runtime Desktop |
| React | 18 | Biblioteca de UI |
| Vite | 7 | Tooling e Build do Frontend |
| TypeScript | 5.9 | Tipagem estática |
| Tailwind CSS | 3.4 | Estilização Utilitária |
| Radix UI | — | Primitivos de componentes acessíveis |
| Chokidar | 4.0 | Monitoramento de File System |
| Vitest | 3.2 | Framework de Testes |
| Electron Store | 11.0 | Persistência de configurações |

---

## 👨💻 Autor

Desenvolvido por **Beto Lara** — Backend & Desktop Developer

[![GitHub](https://img.shields.io/badge/GitHub-betolara1-181717?style=for-the-badge&logo=github)](https://github.com/betolara1)

---

<div align="center">

**Bartz Analyzer** — Monitoramento inteligente para uma produção sem interrupções.

> **Nota:** Este projeto foi desenvolvido com o auxílio de inteligência artificial (**Antigravity**) para garantir agilidade e padrões profissionais de código.

</div>