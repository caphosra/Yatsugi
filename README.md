# Yatsugi - 文化祭器材管理システム

![Build](https://github.com/capra314cabra/Yatsugi/workflows/Build/badge.svg)

文化祭における器材貸し出しをスムーズに進める為のツールです.

![Example](https://raw.githubusercontent.com/capra314cabra/Yatsugi/master/img/example.gif)

## 注意

UIデザインに使うライブラリを C# Avalonia から Electron に移行しました.  
これに伴い, C#からTypescriptへ開発言語を変えました. C#で開発していた時のコードは以下のコマンドで取得可能です

```bash
git checkout csharp-HEAD
```

## IPC channels 一覧

|channel|sync|args|return|
|:---|:---:|:---|:---|
|database-load|||boolean|
|database-save|||boolean|
|database-check-group|:heavy_check_mark:|string|YatsugiGroup \| null|
|database-check-tool|:heavy_check_mark:|string|YatsugiTool \| null|
|database-find-groups|:heavy_check_mark:|string|YatsugiGroup[]|
|database-find-tools|:heavy_check_mark:|string|YatsugiTool[]|
|database-add-group||YatsugiGroup|boolean|
|database-add-tool||YatsugiTool|boolean|
|database-delete-group||string|boolean|
|database-delete-tool||string|boolean|
|database-lent-tool||string, string|boolean|
|database-return-tool||string|boolean|
|database-get-all-groups|:heavy_check_mark:||YatsugiGroup[]|
|database-get-all-tools|:heavy_check_mark:||YatsugiTool[]|
|qrcode-save||string, string|boolean|
|assetfolder|||string|
|opendev||||

`database-check-*`はIDで検索するのに対して、`database-find-*`は文字列で検索をします。
