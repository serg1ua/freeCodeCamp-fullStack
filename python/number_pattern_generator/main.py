def number_pattern(n):
    if not type(n) == int:
        return 'Argument must be an integer value.'
    if n < 1:
        return 'Argument must be an integer greater than 0.'

    str = ''
    for number in range(1, n+1):
        str += f'{number}' if number == 1 else f' {number}'

    print(str)
    return str

if __name__ == "__main__":
    number_pattern(12)