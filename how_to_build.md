# ビルド方法

## Development build

1. Repositoryをcloneする. このRepositoryはGit LFSを使用している事に注意してください.

```
git lfs clone https://github.com/capra314cabra/Yatsugi.git
```

2. 実行に必要なパッケージをインストールする.

```
npm install
npm install -D
```

3. ビルドを行う.

```
npm run build
```

## Release build

1. Repositoryをcloneする. このRepositoryはGit LFSを使用している事に注意してください.

```
git lfs clone https://github.com/capra314cabra/Yatsugi.git
```

2. 実行に必要なパッケージをインストールする.

```
npm install
npm install -D
```

3. ビルドを行う. `npm run build`ではありません.

```
npm run pack
```
