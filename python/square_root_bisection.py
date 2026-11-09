def square_root_bisection(num, tolerance=0.01, iterations=10):
    if num < 0:
        raise ValueError("Square root of negative number is not defined in real numbers")
    if num == 0:
        print("The square root of 0 is 0")
        return 0
    if num == 1:
        print("The square root of 1 is 1")
        return 1
    guess = num

    for _ in range(2,iterations):
        next_guess = (guess + num / guess) / 2
        if abs(next_guess - guess) <= tolerance:
            print(f'The square root of {num} is approximately {guess}')
            return guess
        guess = next_guess
    print(f"Failed to converge within {iterations} iterations")
    return None

if __name__ == "__main__":
    print(square_root_bisection(225, 1e-7, 10))