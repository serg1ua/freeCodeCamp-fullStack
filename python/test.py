# class Planet:
#     def __init__(self, name, planet_type, star):
#         if (
#             not isinstance(name, str)
#             or not isinstance(planet_type, str)
#             or not isinstance(star, str)
#         ):
#             raise TypeError("name, planet type, and star must be strings")
#         if name == "" or planet_type == "" or star == "":
#             raise ValueError("name, planet_type, and star must be non-empty strings")
#         self.name = name
#         self.planet_type = planet_type
#         self.star = star

#     def orbit(self):
#         return f"{self.name} is orbiting around {self.star}"

#     def __str__(self):
#         return f"Planet: {self.name} | Type: {self.planet_type} | Star: {self.star}"


# planet_1 = Planet("Earth", "Terrestrial", "Sun")
# planet_2 = Planet("Jupiter", "Gas Giant", "Sun")
# planet_3 = Planet("Proxima b", "Exoplanet", "Proxima Centauri")

# print(planet_1.orbit())
# print(planet_2.orbit())
# print(planet_3.orbit())

# print(planet_1)
# print(planet_2)
# print(planet_3)


class GameCharacter:
    def __init__(self, name):
        self._name = name
        self._health = 100
        self._mana = 50
        self._level = 1

    @property
    def name(self):
        return self._name

    @property
    def health(self):
        return self._health

    @health.setter
    def health(self, value):
        if value < 0:
            self._health = 0
            return
        if value > 100:
            self._health = 100
            return
        self._health = value
        return

    @property
    def mana(self):
        return self._mana

    @mana.setter
    def mana(self, value):
        if value < 0:
            self._mana = 0
            return
        if value > 50:
            self._mana = 50
            return
        self._mana = value
        return

    @property
    def level(self):
        return self._level

    def level_up(self):
        self._level += 1
        self.health = 100
        self.mana = 50
        print(f"{self._name} leveled up to {self._level}!")

    def __str__(self):
        return f"Name: {self.name}\nLevel: {self.level}\nHealth: {self.health}\nMana: {self.mana}\n"


char = GameCharacter("Kratos")

char.level_up()
print(char)


def merge_sort(array):
    if len(array) <= 1:
        return

    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]

    merge_sort(left_part)
    merge_sort(right_part)

    left_array_index = 0
    right_array_index = 0
    sorted_index = 0

    while left_array_index < len(left_part) and right_array_index < len(right_part):
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
        else:
            array[sorted_index] = right_part[right_array_index]
            right_array_index += 1
        sorted_index += 1

    while left_array_index < len(left_part):
        array[sorted_index] = left_part[left_array_index]
        left_array_index += 1
        sorted_index += 1

    while right_array_index < len(right_part):
        array[sorted_index] = right_part[right_array_index]
        right_array_index += 1
        sorted_index += 1


if __name__ == "__main__":
    numbers = [4, 10, 6, 14, 2, 1, 8, 5]
    print("Unsorted array: ")
    print(numbers)
    merge_sort(numbers)
    print("Sorted array: ")
    print(numbers)
