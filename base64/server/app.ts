import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { randomUUID } from 'crypto';

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173', // アクセス許可するオリジン
    credentials: true // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', async (req, res) => {
  const base64Data = req.body.image;
  // 先頭のdata:image/png;base64を除いたもの
  const fileData = base64Data.replace(/^data:\w+\/\w+;base64,/, '');
  // 拡張子を取得、/と;の間にある部分をsliceする
  const fileExtension = base64Data
    .toString()
    .slice(base64Data.indexOf('/') + 1, base64Data.indexOf(';'));

  // 注意:実際には送られたファイルの検証をしますが、ここでは省いています。
  const binaryData = Buffer.from(fileData, 'base64');
  fs.writeFileSync(`./uploads/${randomUUID()}.${fileExtension}`, binaryData);
  // または下記で、デコードとファイルの書き込みを一発でできる
  // fs.writeFileSync(`./uploads/${randomUUID()}.${fileExtension}`, fileData, {
  //   encoding: 'base64'
  // });
  res.json(`アップロード成功!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
