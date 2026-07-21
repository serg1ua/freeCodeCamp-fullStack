def fibonacci(n):
    sequence = [0, 1]

    if n == 0:
        return sequence[0]
    if n == 1:
        return sequence[1]

    for i in range(2, n):
        sequence.append(sequence[i - 1] + sequence[i - 2])
    return sequence[n - 1] + sequence[n - 2]


print(fibonacci(15))
