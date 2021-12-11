# fastify_test

## fastify

### fastify 導入

```bash
yarn
yarn setup
```

### サンプル

#### 本番リンク

[https://[id].deta.dev/](https://[id].deta.dev/)

```node.js

```

### サーバー立ち上げ

```
yarn start
```

### Deta 登録

[Deta Cloud](https://www.deta.sh/?ref=fastapi)

### Deta CLI インストール

```
curl -fsSL https://get.deta.dev/cli.sh | sh
```

### Deta 環境変数定義

```
echo 'export PATH=~/.deta/bin:$PATH' >> ~/.bash_profile && source ~/.bash_profile
```

### Deta 動作確認

```
deta --help
~/.deta/bin/deta --help
```

### Deta CLI Login (エラーになるため Chrome で実施要)

```
deta login
~/.deta/bin/deta login
```

### Deta 新規連携

```
deta new
~/.deta/bin/deta new
```

### Deta デプロイ

```
deta deploy
~/.deta/bin/deta deploy
```

## 参考にしたサイト

- [Deta にデプロイ - FastAPI](https://fastapi.tiangolo.com/ja/deployment/deta/)
- [DETA](https://web.deta.sh/home/cti1650/default/micros)
- [brew でインストールに失敗する時の対処メモ](https://zenn.dev/souq/articles/3c0591a50f39269793c9)
- [Chrome ウェブストア - gitpod](https://chrome.google.com/webstore/search/gitpod?hl=ja)
- [Node.js で環境変数を利用する方法](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html-jp)
- [Deploy your app or API on Deta Micros | Deta Docs](https://docs.deta.sh/docs/micros/deploy/#nodejs)
- [Node.js + fastify + TypeScript + Swagger で REST サーバを構築する](https://zenn.dev/mokyn/articles/b5f727d30596fe)
- [swmokyun/sample-fastify-typescript-swagger](https://github.com/swmokyun/sample-fastify-typescript-swagger)
