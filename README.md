<h1 align="center" style="font-size: 4em; color: #000; -webkit-text-stroke: 1px #4FC0C4;"><b>北 藝 音 遊</b></h1>


## HOME
### - ig貼分享網址
  後面看到 ig_web_copy_link&stkn=MzRlODBiNWFlZA== 之類的<br>
  改成 ig_embed&utm_campaign=loading


## ABOUT
### - 改介紹改json
* 換行打 `\n`，文字加粗用 `<b>字</b>`


## MEMBER
### - 資料夾路徑在 ./public/img/member/
* 換幹部直接改同檔名取代資料夾內圖片就ok

### - member如果要有不同版本圖
* "imgDesktop": "/img/member/---.webp",
* "imgMobile": "/img/member/---.webp",

### - 有少幹部成員
* 丟members.json的_disabled_users裡面


## ACTIVITY
### - 活動用json加，記得放照片進 ./public/img/activity/ 資料夾（沒後端）


## CONTACT
### - 要改直接改socialLinks.jsx


## GAME
### - 遊戲可以在json加


## 任何圖片
* 支援 `.jpg`、`.jpeg`、`.png` 與 `.gif`

### - 第一次使用先安裝轉檔工具(Homebrew)
```bash
brew install imagemagick ffmpeg
```

### - 圖片最佳化轉檔
```bash
npm run images:webp
```
這個指令會：
* 將 `public/img/` 的 JPG、JPEG、PNG 轉成 WebP、GIF轉成動畫的WebP
* 把程式與 JSON 圖片路徑改成 `.webp`
* 全部轉換成功後刪除原始圖片


### - 更新活動資料
* 新增或刪除活動圖片，才需要執行(有變名稱)
* 掃描活動資料夾，並自動更新重新產生:
```bash
npm run gen
```

* 流程：
```bash
npm run images:webp
npm run gen        <---（看情況）
```

### - 以上指令需要在本機執行
