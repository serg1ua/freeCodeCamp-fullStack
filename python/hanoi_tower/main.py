def hanoi_solver(n: int) -> str:
    matrix = [[n - i for i in range(n)], [], []]
    matrix_str = " ".join(["".join(str(el)) for el in matrix]) + "\n"
    total_moves = 2**n
    source, target, temp = 0, 1, 2
    if n % 2 != 0:
        target, temp = temp, target
    for move in range(1, total_moves):
        if move % 3 == 1:
            step_from, step_to = source, target
        elif move % 3 == 2:
            step_from, step_to = source, temp
        else:
            step_from, step_to = temp, target
        if not matrix[step_from]:
            disk = matrix[step_to].pop()
            matrix[step_from].append(disk)
        elif not matrix[step_to]:
            disk = matrix[step_from].pop()
            matrix[step_to].append(disk)
        elif matrix[step_from][-1] < matrix[step_to][-1]:
            disk = matrix[step_from].pop()
            matrix[step_to].append(disk)
        else:
            disk = matrix[step_to].pop()
            matrix[step_from].append(disk)
        matrix_str += " ".join(["".join(str(el)) for el in matrix])
        matrix_str += "" if move == total_moves - 1 else "\n"
    return matrix_str


if __name__ == "__main__":
    n = 4
    result = hanoi_solver(n)
    print(result, "finish matrix")
