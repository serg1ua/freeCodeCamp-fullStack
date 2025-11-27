import math


class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

    def get_perimeter(self):
        return 2 * (self.width + self.height)

    def get_diagonal(self):
        return math.sqrt(self.width**2 + self.height**2)

    def get_picture(self):
        if self.height > 50 or self.width > 50:
            return "Too big for picture."
        picture = ""
        for i in range(self.height):
            picture += f"{self.width * '*'}\n"
        return picture

    def get_amount_inside(self, new_shape):
        amount_inside_width = math.floor(self.width / new_shape.width)
        amount_inside_height = math.floor(self.height / new_shape.height)
        if amount_inside_width == 0 or amount_inside_height == 0:
            return 0
        return amount_inside_width * amount_inside_height

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"


class Square(Rectangle):
    def __init__(self, side_length):
        self.width = side_length
        self.height = side_length

    def set_width(self, width):
        self.width = width
        self.height = width

    def set_height(self, height):
        self.width = height
        self.height = height

    def set_side(self, side_length):
        self.width = side_length
        self.height = side_length

    def __str__(self):
        return f"Square(side={self.width})"


rect = Rectangle(10, 6)
print(rect.get_picture())
print(rect.get_amount_inside(Square(3)))
