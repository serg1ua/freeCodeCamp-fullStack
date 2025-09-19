def caesar(text, shift, encrypt=True):
    if not isinstance(shift, int):
        return "Shift must be an integer value."
    if shift < 1 or shift > 25:
        return "Shift must be an integer between 1 and 25."
    if encrypt == False:
        shift = -shift

    alphabet = "abcdefghijklmnopqrstuvwxyz"
    shifted_alphabet = alphabet[shift:] + alphabet[:shift]
    translation_table = str.maketrans(alphabet + alphabet.upper(), shifted_alphabet + shifted_alphabet.upper())
    encrypted_text = text.translate(translation_table)
    print(encrypted_text)
    return encrypted_text

def encrypt(text, shift):
    return caesar(text, shift)

def decrypt(text, shift):
    return caesar(text, shift, False)


if __name__ == "__main__":
    encrypt("hello", 5)