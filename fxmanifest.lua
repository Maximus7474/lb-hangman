fx_version "cerulean"
game "gta5"

title "LB Phone - App Template | React TS"
description "A template for creating apps for the LB Phone."
author "Breze & Loaf"

shared_script "shared.lua"
client_script "client.lua"

files {
    "locales/*.json",
    "ui/dist/**/*",
    "ui/icon.png"
}

ui_page "ui/dist/index.html"
-- ui_page "http://localhost:3000"
