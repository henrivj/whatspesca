### Bot de WhatsApp com variação de IA

Esse projeto é para fins de estudo. Siga as diretrizes e Termos de Serviço do WhatsApp. Qualquer dano causado é de responsabilidade do usuário.
Usar isso com um número real pode levar a suspensão ou banimento do mesmo.

# Dependencias:

- Node
- Ollama (qwen2.5:14b)
- qrcode-terminal
- whatsapp-web.js

# Como rodar:

No powershell, rode:

- `ollama pull qwen2.5:14b`
- `ollama serve`

Então, rode o arquivo principal:

- `node bot.js`

Caso não tenha uma sessão já criada, escaneie o QR code gerado para entrar no WhatsApp.

# Funcionamento básico

Ao criar a sessão, caso o bot entre em um grupo, ele verificará os membros e um por um vai:

- Verificar se é um admin ou se já está na lista de enviados
- Caso passe a verificação, ira alterar a mensagem original usando IA
- Definir um timer aleatório entre 1 e 5 segundos
- Enviar a mensagem
- Adicionar o ID do usuário a lista de enviados.
