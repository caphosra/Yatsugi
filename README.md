# Yatsugi - 文化祭器材管理システム

![Build](https://github.com/capra314cabra/Yatsugi/workflows/Build/badge.svg)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/capra314cabra/yatsugi?include_prereleases)
![GitHub](https://img.shields.io/github/license/capra314cabra/yatsugi)
![GitHub repo size](https://img.shields.io/github/repo-size/capra314cabra/yatsugi)  
[Repo](https://github.com/capra314cabra/Yatsugi) | [Author](https://github.com/capra314cabra)

文化祭における器材貸し出しをスムーズに進める為のツールです.  
まだ十分に拡張の余地はありますのでためらわずcontributeしてください.

![Example](https://raw.githubusercontent.com/capra314cabra/Yatsugi/master/img/example.png)

## 注意

UIデザインに使うライブラリを C# Avalonia から Electron に移行しました.  
これに伴い, C#からTypescriptへ開発言語を変えました. C#で開発していた時のコードは以下のコマンドで取得可能です

```bash
git checkout csharp-HEAD
```

## IPC channels 一覧

|channel|args|return|
|:---|:---|:---|
|database-load||boolean|
|database-save||boolean|
|database-lending||boolean|
|database-check-group|string|YatsugiGroup \| null|
|database-check-tool|string|YatsugiTool \| null|
|database-find-groups|string|YatsugiGroup[]|
|database-find-tools|string|YatsugiTool[]|
|database-add-group|YatsugiGroup|boolean|
|database-add-tool|YatsugiTool|boolean|
|database-delete-group|string|boolean|
|database-delete-tool|string|boolean|
|database-lent-tool|string, string|boolean|
|database-return-tool|string|boolean|
|database-get-all-groups||YatsugiGroup[]|
|database-get-all-tools||YatsugiTool[]|
|settings-load||YatsugiSettings|
|settings-save|YatsugiSettings||
|qrcode-save|string, string|boolean|
|load-image|string|string|
|assetfolder||string|
|opendev|||

`database-check-*`はIDで検索するのに対して、`database-find-*`は文字列で検索をします。

## Author

[capra314cabra](https://github.com/capra314cabra)
