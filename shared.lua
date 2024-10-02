LocaleObject = nil
Locale = 'Undefined'

function LoadLocale(key)
    local translations = LoadResourceFile(GetCurrentResourceName(), ('locales/%s.json'):format(key))
        Locale = key

    if not translations then
        exports["lb-phone"]:SendNotification({
            app = "Settings",
            title = "Hangman Application",
            content = ("Your system language (%s) isn't supported yet."):format(key),
        })
        Locale = "en"
        translations = LoadResourceFile(GetCurrentResourceName(), 'locales/en.json')
    end
    LocaleObject = json.decode(translations)
    return LocaleObject
end
