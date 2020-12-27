# Yatsugi - 文化祭器材管理システム

![Build](https://github.com/capra314cabra/Yatsugi/workflows/Build/badge.svg)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/capra314cabra/yatsugi?include_prereleases)
![GitHub](https://img.shields.io/github/license/capra314cabra/yatsugi)
![GitHub repo size](https://img.shields.io/github/repo-size/capra314cabra/yatsugi)

文化祭における器材の貸出と返却をスムーズに進める為のツールです.

Yatsugiを使えば, 貸出と返却は器材に事前に割り当てられたQRコードと団体のQRコードを合わせて読み込むだけ. 手間は全くかかりません.  
また, 貸出記録が保存され, 器材や団体ごとの履歴を確認することも出来ます. これにより, まだ返却が済んでいない団体や, 器材の使用状況が悪い団体を一目で見つけられます.

YatsugiはOSS(Open Source Software)です. 以下のリンクからソースコードを見ることができます.

[Repository URL](https://github.com/capra314cabra/Yatsugi)

![Example](https://media.githubusercontent.com/media/capra314cabra/Yatsugi/master/img/example.png)

## Installation

 1. Yatsugiの[Release page](https://github.com/capra314cabra/Yatsugi/releases)を開く.
2. 使用しているOSにあったバージョンのYatsugiのビルド済みファイルをダウンロードする.
3. 展開してYatsugiを起動する.
4. Yatsugiのインストールはこれで完了です!

主要なOSに対して対応しているかは以下の表で確認してください.

|OS|Available|
|---|:---:|
|MacOS x64| :heavy_check_mark: |
|Windows x64| :heavy_check_mark: |
|Ubuntu| :heavy_check_mark: |
|Free BSD||

## Note

UIデザインに使うライブラリを C# Avalonia から Electron に移行しました.  
これに伴い, C#からTypescriptへ開発言語を変えました. C#で開発していた時のコードは以下のコマンドで取得可能です:

```
git clone https://github.com/capra314cabra/Yatsugi
cd ./Yatsugi
git checkout csharp-HEAD
```

C#での開発は完全に停止しているので, そのコードに対するIssueやPull Requestはご遠慮下さい.

## Technical Informations

- [ビルド方法](https://github.com/capra314cabra/Yatsugi/blob/master/how_to_build.md)
- [IPC Channels 一覧](https://github.com/capra314cabra/Yatsugi/blob/master/ipc_channels.md)

## Authors

- [capra314cabra](https://github.com/capra314cabra)
- [kaage](https://github.com/ageprocpp)
