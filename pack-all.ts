import { build } from "electron-builder";
import * as fs from "fs";

fs.rmdirSync("./bin", {
    recursive: true
});

build({
    config: {
        appId: "com.capra314cabra.yatsugi",
        directories: {
            output: "bin"
        },
        files: [
            "./dist/**/*.js",
            "./html/**/*.html"
        ],
        extraResources: [
            {
                from: "./assets/",
                to: "assets",
                filter: [
                  "**/*"
                ]
            }
        ],
        mac: {
            target: "dmg"
        },
        win: {
            target: "portable"
        }
    }
});
