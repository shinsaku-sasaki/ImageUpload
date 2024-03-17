import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/'); // ファイルの置き場所のパスを指定
  },
  filename(req, file, cb) {
    cb(null, file.originalname); // アップロードされたファイルと同じ名前で保存
  }
});
const upload = multer({ storage });

app.use(
  cors({
    origin: 'http://localhost:5173', // アクセス許可するオリジン
    credentials: true // レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  // 注意:実際には送られたファイルの検証をしますが、ここでは省いています。
  res.json(`アップロード成功!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
