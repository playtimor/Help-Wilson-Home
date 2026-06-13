# Para o Wilson — Vamos levá-lo a casa

Site estático da vaquinha para o Wilson voltar a Moçambique no aniversário.

**URL:** https://playtimor.github.io/Help-Wilson-Home/

---

## Como atualizar o progresso da vaquinha

Edita o ficheiro `frontend/src/data/fundraiserData.json`:

```json
{
  "goal": 1000,
  "raised": 350,
  "contributors_count": 12,
  "deadline": "2026-06-20T23:59:59+01:00",
  "birthday": "2026-06-25T00:00:00+01:00"
}
```

### 1. Atualizar o valor angariado

Muda o campo `"raised"` para o novo total em euros:

```json
"raised": 420
```

### 2. Atualizar o número de contribuidores

Muda o campo `"contributors_count"`:

```json
"contributors_count": 14
```

### 3. Atualizar a meta

Muda o campo `"goal"` (em euros):

```json
"goal": 1200
```

### 4. Publicar as alterações (deploy)

Depois de editar o JSON, faz commit e push para o branch `main`:

```bash
git add frontend/src/data/fundraiserData.json
git commit -m "Atualizar progresso: 420€ angariados, 14 contribuidores"
git push origin main
```

O GitHub Actions irá automaticamente reconstruir e publicar o site em 1-2 minutos.

---

## Estrutura do projeto

```
Help-Wilson-Home/
├── .github/workflows/deploy.yml   # Deploy automático para GitHub Pages
├── frontend/
│   ├── src/
│   │   ├── data/
│   │   │   └── fundraiserData.json  <- EDITAR AQUI para atualizar progresso
│   │   ├── components/              # Componentes visuais (Header, Hero, etc.)
│   │   ├── pages/
│   │   │   └── Fundraiser.jsx       # Página principal
│   │   └── App.js
│   └── package.json
└── README.md
```

## Tecnologia

- React (aplicação 100% estática)
- Tailwind CSS
- GitHub Pages (alojamento gratuito)
- GitHub Actions (deploy automático)

Sem backend. Sem base de dados. Sem custos mensais.
