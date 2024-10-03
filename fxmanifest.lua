fx_version "cerulean"
game "gta5"

title "LB Hangman"
description "A simple hangman game for LB Phone"
author "Maximus7474"
version "v0.1.0"
repository "https://github.com/Maximus7474/lb-hangman"

shared_script "shared.lua"
client_script "client.lua"

files {
    "locales/*.json",
    "ui/dist/**/*",
    "ui/icon.png"
}

ui_page "ui/dist/index.html"
