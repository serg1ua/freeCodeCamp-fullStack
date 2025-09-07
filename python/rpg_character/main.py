full_dot = '●'
empty_dot = '○'

def create_character(
    character_name: str,
    strength: int,
    intelligence: int,
    charisma: int
) -> str:
    if type(character_name) != str:
       return 'The character name should be a string'
    if len(character_name) > 10:
        return 'The character name is too long'
    if ' ' in character_name:
        return 'The character name should not contain spaces'
    if type(strength) != int or type(intelligence) != int or type(charisma) != int:
        return 'All stats should be integers'
    if strength < 1 or intelligence < 1 or charisma < 1:
        return 'All stats should be no less than 1'
    if strength > 4 or intelligence > 4 or charisma > 4:
        return 'All stats should be no more than 4'
    if sum([strength, intelligence, charisma]) != 7:
        return 'The character should start with 7 points'
    return f'{character_name}\nSTR {strength * full_dot}{(10 - strength) * empty_dot}\nINT {intelligence * full_dot}{(10 - intelligence) * empty_dot}\nCHA {charisma * full_dot}{(10 - charisma) * empty_dot}'

if __name__ == '__main__':
    create_character('ren', 4, 2, 1)