test_settings = {
    'theme': 'dark'
}

def add_setting(settings: dict, setting: tuple[str, str]):
    key = setting[0].lower()
    value = setting[1].lower()

    if settings.get(key):
        return f"Setting '{key}' already exists! Cannot add a new setting with this name."
    settings.update({ key: value })
    return f"Setting '{key}' added with value '{value}' successfully!"

def update_setting(settings: dict, setting: tuple[str, str]):
    key = setting[0].casefold()
    value = setting[1].casefold()

    if not settings.get(key):
        return f"Setting '{key}' does not exist! Cannot update a non-existing setting."

    settings.update({ key: value })
    return f"Setting '{key}' updated to '{value}' successfully!"

def delete_setting(settings: dict, key: str):
    key_to_delete = key.lower()

    if not settings.get(key_to_delete):
        return 'Setting not found!'

    del settings[key_to_delete]
    return f"Setting '{key_to_delete}' deleted successfully!"

def view_settings(settings):
    if len(settings.items()) == 0:
        return 'No settings available.'
    message = 'Current User Settings:\n'
    for key, value in settings.items():
        message += key.capitalize() + ': ' +  value + '\n'

    return message


if __name__ == '__main__':
    print(view_settings(test_settings))