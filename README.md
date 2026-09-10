# 🦜 Parrot — Landing Page

Landing page institucional do **Parrot** — Aplicação desktop para tradução de chamadas internacionais em tempo real no macOS e Windows (Google Meet, Zoom, Teams, Discord).

Desenvolvida com inspiração direta no design de alta precisão do **Google Antigravity** (`antigravity.google`), adotando o tema claro nativo do sistema, tipografia display elegante, canvas interativo de partículas gravitacionais, expansão do player em scroll e zero vícios de IA.

---

## ⚡ Tecnologias & Recursos

- **Vite 6 + React 18 + TypeScript + Tailwind CSS**
- **Antigravity Interactive Canvas**: Campo de partículas gravitacionais interativo em HTML5 Canvas respondendo ao cursor e à rolagem.
- **Scroll-Driven Video Showcase**: Container de vídeo que se expande suavemente no scroll, apresentando a simulação real de uma reunião Google Meet entre San Francisco e São Paulo com o HUD do Parrot traduzindo ao vivo.
- **Vídeo de Motion Nativo 1080p (`parrot-meeting-demo.mp4`)**: Produzido com renderização frame a frame e áudio sintetizado em vozes neurais humanas sincronizadas.
- **Simulador Interativo de Tradução**: Widget para testar sentenças de reuniões internacionais e ouvir a síntese vocal direto pelo navegador.
- **Detecção Inteligente de Sistema Operacional**: O botão de download adapta-se automaticamente para macOS (Apple Silicon M1-M4 ou Intel) ou Windows 10/11 x64.
- **Integração CI/CD GitHub Actions**: Conectado ao workflow de release automática do repositório `app`.

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
