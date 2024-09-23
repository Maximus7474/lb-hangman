local identifier = "hangman"

while GetResourceState("lb-phone") ~= "started" do
    Wait(500)
end

local function addApp()
    local added, errorMessage = exports["lb-phone"]:AddCustomApp({
        identifier = identifier, -- unique app identifier

        name = "Hangman",
        description = "Quick, you don't have much time to find the secret word !.",
        developer = "Maximus7474",

        defaultApp = false,
        size = 26135,

        images = {
            -- "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-light.png",
            -- "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/dist/screenshot-dark.png"
        },

        -- ui = "http://localhost:3000",
        ui = GetCurrentResourceName() .. "/ui/dist/index.html",

        icon = "https://cfx-nui-" .. GetCurrentResourceName() .. "/ui/icon.png",

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
    cb("Jurassic")
end)