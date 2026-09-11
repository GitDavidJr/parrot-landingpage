# 🦜 Parrot — Landing Page

Landing page institucional do **Parrot** — Aplicação desktop para tradução de chamadas internacionais em tempo real no macOS e Windows (Google Meet, Zoom, Teams, Discord).

Desenvolvida com inspiração direta no design de alta precisão do **Google Antigravity** (`antigravity.google`), adotando o tema claro nativo do sistema, tipografia display elegante, canvas interativo de partículas gravitacionais, expansão do player em scroll e zero vícios de IA.

---

## ⚡ Tecnologias & Recursos

- **Vite 6 + React 18 + TypeScript + Tailwind CSS**
- **Antigravity Interactive Canvas**: Campo de partículas gravitacionais interativo em HTML5 Canvas respondendo ao cursor e à rolagem.
- **Showcase de Conversa com Início e Fim**: Os participantes ocupam toda a chamada, se reorganizam quando a tradução começa e encerram a sequência com ações claras de download e apoio.
- **Demo de Voz no Hero**: Reconhecimento de fala em português pelo navegador, tradução textual via MyMemory e reprodução em inglês com a melhor voz local disponível.
- **Área de Apoiadores**: Explica o modelo gratuito, open source e sem paywall, além das formas de contribuir com código, infraestrutura e comunidade.
- **Detecção Inteligente de Sistema Operacional**: O botão de download adapta-se automaticamente para macOS (Apple Silicon M1-M4 ou Intel) ou Windows 10/11 x64.
- **Integração CI/CD GitHub Actions**: Conectado ao workflow de release automática do repositório `app`.

### Créditos dos vídeos

Os clipes de participantes usados no showcase são materiais gratuitos do Pexels:

- “A Woman Using Her Laptop while Talking”, por SHVETS production — vídeo 7557415.
- “Man Using a Laptop”, por Mikhail Nilov — vídeo 7585110.

---

## 🛠️ Como Rodar Localmente

```bash
# Entrar no diretório
cd landingpage

# Instalar dependências (Bun ou npm)
bun install

# Iniciar servidor de desenvolvimento (porta 3000)
bun dev

# Gerar build de produção
bun run build

# Pré-visualizar build de produção
bun run preview
```
