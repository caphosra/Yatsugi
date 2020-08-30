# List of IPC channels

## Database

Note that `database-check-*` looks for the item by id while `database-find-*` looks for the items whose names include the text given.

|channel|sync|args|return|
|:---|:---:|:---|:---|:---|
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
|database-get-all-groups|:heavy_check_mark:||YatsugiGroup[]|
|database-get-all-tools|:heavy_check_mark:||YatsugiTool[]|

## Utils

|channel|sync|args|return|
|:---|:---:|:---|:---|:---|
|qrcode-save||string, string|boolean|
|opendev||||
