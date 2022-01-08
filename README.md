# fastify_test

## fastify

### fastify 導入

```bash
yarn
yarn setup

```

### サンプル

<a title="Gitpod" href="https://gitpod.io/#https://github.com/cti1650/fastify_test" rel="nofollow noreferrer noopener" target="_blank" class="btn btn-primary">Gitpodでサンプルを実行</a>

#### 本番リンク

[https://fastify-test-cti-tl.herokuapp.com/?name=test](https://fastify-test-cti-tl.herokuapp.com/?name=test)


```typescript
import { Static, Type } from "@sinclair/typebox";
import fastify, { FastifyInstance } from "fastify";
import fastifySwagger from "fastify-swagger";
import fastifyCors from "fastify-cors";
import { config } from 'dotenv';
import { test } from './test/index';

console.log(test());

if (process.env.NODE_ENV !== 'production') {
  config();
}

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
const PORT = process.env.PORT || 3000;
console.log(`
server start
NODE_ENV = ${process.env.NODE_ENV}
HOST = ${HOST}
PORT = ${PORT}
`);

const server:FastifyInstance  = fastify({ logger: true });

/**
 * fastify-cors
 */
server.register(fastifyCors);

/**
 * swagger
 */
server.register(fastifySwagger, {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
  },
  exposeRoute: true,
})


/**
 * sample get
 */
const Message = Type.Object({
  text: Type.String(),
})
type MessageType = Static<typeof Message>
server.get<{ Reply: MessageType }>(
  "/",
  {
    schema: {
      response: {
        200: Message,
      },
    },
  },
  (req, rep) => {
    rep.status(200).send({text:'Hello World!!'})
  }
)

server.listen(PORT,HOST)
  .then((address) => console.log(`server listening on ${address}`))
  .catch(err => {
    console.log('Error starting server:', err)
    process.exit(1)
  });
```

### 動作検証

**ts-node-dev**を活用し、TypeScript のまま動作検証できるようにしてあります。

```node.js
yarn dev
```

### ビルド（TypeScript + babel）

```
yarn build
```

### サーバー立ち上げ

```
yarn start
```

## heroku

### デプロイ時につまづいたこと

- ローカルでは問題なく起動できるのに heroku ではうまく動作しなかった（build は問題なく完了）
  > node.js : Heroku がエラーを返す 'process.env.PORT を使用しているにもかかわらず、Web プロセスが起動から 60 秒以内に$ PORT にバインドできませんでした'エラー、どうすればよいですか？

#### heroku の PORT は『3000』,『5000』だと動かない！

動的に変更されるため、環境変数から取得する必要があります。

```js
const PORT = process.env.PORT || 3000;
```

#### heroku の HOST 　は『127.0.0.1』じゃない

こちらは『127.0.0.1』と書かれたサンプルがあるため惑わされましたが、
heroku で node.js を実行する場合は『0.0.0.0』のようです。  
また、Express では設定しなくてもちゃんと動作していたので余計に意味がわからないことになりました。。。

```js
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
```

## 参考にしたサイト

- [brew でインストールに失敗する時の対処メモ](https://zenn.dev/souq/articles/3c0591a50f39269793c9)
- [Chrome ウェブストア - gitpod](https://chrome.google.com/webstore/search/gitpod?hl=ja)
- [Node.js で環境変数を利用する方法](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html-jp)
- [Node.js + fastify + TypeScript + Swagger で REST サーバを構築する](https://zenn.dev/mokyn/articles/b5f727d30596fe)
- [swmokyun/sample-fastify-typescript-swagger](https://github.com/swmokyun/sample-fastify-typescript-swagger)
- [Fastify+TypeScript で新規プロジェクトを作成 | DevelopersIO](https://dev.classmethod.jp/articles/fastify-typescript-getting-started/)
- [設定と環境設定 | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/config-vars)
- [Server](https://www.fastify.io/docs/latest/Server/#listen)
- [Node.js のデプロイのトラブルシューティング | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/troubleshooting-node-deploys#incorrect-port-setup)
- [Vue+fastify で外部 API を叩いてみた - Qiita](https://qiita.com/RyBB/items/1f4fe302b3e4fc59c026)
- [Ecosystem](https://www.fastify.io/docs/latest/Ecosystem/#core)
- [fastify/fastify-cors: Fastify CORS](https://github.com/fastify/fastify-cors)
