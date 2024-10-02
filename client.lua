local identifier = "hangman"

local lastWords = {}

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier, -- unique app identifier

        name = "Hangman",
        description = "Be careful what you choose, your chances are limited !",
        developer = "Maximus7474",

        defaultApp = false,
        size = 26135,

        images = {
            -- "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-light.png",
            -- "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-dark.png"
            "https://r2.fivemanage.com/pub/v0npxv38jhht.png", --[[ App HomeScreen ]]
            "https://r2.fivemanage.com/pub/2v3tqx04v9da.png", --[[ App Game Screen ]]
        },

        -- ui = "http://localhost:3000",
        ui = GetCurrentResourceName() .. "/ui/dist/index.html",

        icon = "https://r2.fivemanage.com/pub/rchv06ietjsn.png", -- "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/icon.png",

        fixBlur = true
    })

    if not added then
        print("Could not add app:", errorMessage)
    end
end

addApp()

AddEventHandler("onResourceStart", function(resource)
    if resource == "lb-phone" then
        addApp()
    end
end)

RegisterNuiCallback('lb-hangman:getRandomWord', function (_, cb)
    if type(LocaleObject?.WORDLIST) ~= "table" or #LocaleObject?.WORDLIST < 1 then
        error(('No wordlist available for the current locale (%s)! This needs to be addressed!'):format(Locale))
        return cb('jurassic')
    end

    local wordList = LocaleObject.WORDLIST
    local newWord

    for i = 1, 5 do
        newWord = wordList[math.random(#wordList)]
        if not TableContains(lastWords, newWord) then
            break
        end
    end

    table.insert(lastWords, newWord)
    if #lastWords > 5 then
        table.remove(lastWords, 1)
    end

    cb(newWord)
end)

RegisterNuiCallback('lb-hangman:loadLocale', function (locale, cb)
    cb(LoadLocale(locale).APP)
end)