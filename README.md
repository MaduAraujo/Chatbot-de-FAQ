<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Chatbot de FAQ

## Demonstração

https://github.com/user-attachments/assets/69ffc606-b016-49d3-aeac-e8a48144a374

## Sobre o Projeto

O **Chatbot de FAQ** é uma aplicação projetada para responder perguntas frequentes de forma instantânea e precisa, utilizando o poder da IA.
Este projeto serve como uma solução para a gestão do conhecimento, permitindo que usuários obtenham respostas rápidas baseadas em um conjunto de 
dados predefinido (FAQ), melhorando a experiência do usuário e otimizando o tempo de resposta.

### Principais Funcionalidades

  * **Respostas Imediatas:** Utiliza o modelo Gemini para fornecer respostas coerentes às perguntas.
  * **Modelo de Conversação:** Mantém o contexto básico para interações mais fluidas.

## Tecnologias Utilizadas

* React
* TypeScript
* HTML5
* Google Gemini API
* Node.js
* Vite

## Como Rodar Localmente

### Pré-requisitos

  * [Node.js](https://nodejs.org/)
  * Uma chave de API do Gemini. Você pode obter a sua no [Google AI Studio](https://ai.studio/).

## 1. Clonagem do Repositório

Abra seu terminal e clone o projeto:

```bash
git clone https://github.com/MaduAraujo/Chatbot-de-FAQ.git
cd Chatbot-de-FAQ
```

### 2. Instalação de Dependências

Instale todas as dependências do projeto:

```bash
npm install
```

### 3. Configuração da Chave de API

Crie um arquivo chamado `.env.local` na raiz do projeto (se ele ainda não existir) e adicione sua chave de API do Gemini:

**.env.local**

```
GEMINI_API_KEY="SUA_CHAVE_DE_API_GEMINI_AQUI"
```

### 4. Execução da Aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).
