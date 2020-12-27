# IPC channels 一覧

MainプロセスとRendererプロセスの間で行う通信に使用しているChannel一覧です.  
通信は非同期であることに注意してください.

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

`database-check-*`はIDで検索するのに対して、`database-find-*`は文字列で検索を行う事に注意してください.
