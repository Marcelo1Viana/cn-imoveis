# CN Imóveis | Landing page

Landing page de captação de leads para compradores do primeiro apartamento na Grande São Paulo.

## Estrutura

```
index.html
assets/
  css/style.css
  js/main.js
  img/logo-cn.png · logo-simbolo.png · favicon.png · fundo-poligonos.jpg
.nojekyll
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `cn-imoveis`) e envie todos os arquivos desta pasta para a raiz dele.
2. Vá em **Settings > Pages**.
3. Em **Source**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.
4. Em cerca de 1 a 2 minutos o site fica em `https://SEU-USUARIO.github.io/cn-imoveis/`.

## Onde editar

| O que | Onde |
|---|---|
| WhatsApp (número) | `assets/js/main.js`, constante `WA` (formato `5511933569700`) |
| Envio dos leads para o Google Planilhas | `assets/js/main.js`, constante `CRM_WEBHOOK` |
| Empreendimentos, bairros e preços | `assets/js/main.js`, objeto `R` |
| Textos, CRECI, Instagram | `index.html` |
| Cores e animações | `assets/css/style.css` (variáveis em `:root`) |

## Leads no Google Planilhas

1. Crie uma planilha e abra **Extensões > Apps Script**.
2. Cole o script abaixo, depois **Implantar > Nova implantação > App da Web** (executar como **Eu**, acesso para **Qualquer pessoa**).
3. Copie o endereço gerado e cole em `CRM_WEBHOOK` no `main.js`.

```javascript
function doPost(e){
  const sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const d = JSON.parse(e.postData.contents);
  if (sh.getLastRow() === 0) sh.appendRow(["Data","Nome","Telefone","Nome limpo","Casado(a)","Cônjuge nome limpo","Trabalha registrado","Entrada"]);
  sh.appendRow([new Date(d.data), d.nome, d.telefone, d.nome_limpo, d.casado, d.conjuge_nome_limpo, d.trabalha_registrado, d.entrada]);
  return ContentService.createTextOutput("ok");
}
```

## Domínio próprio

Em **Settings > Pages > Custom domain**, informe o domínio e aponte o DNS para o GitHub Pages.
