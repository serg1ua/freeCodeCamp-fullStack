class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def check_funds(self, amount):
        total = sum(item["amount"] for item in self.ledger)
        return amount <= total

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        total = sum(item["amount"] for item in self.ledger)
        return total

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""
        for item in self.ledger:
            amount = f"{item['amount']:.2f}"
            description = item["description"][:23]
            items += f"{description:<23}{amount:>7}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    total_spent = 0
    spent_per_category = []

    for category in categories:
        spent = sum(-item["amount"] for item in category.ledger if item["amount"] < 0)
        spent_per_category.append(spent)
        total_spent += spent

    percentages = [int((spent / total_spent) * 10) * 10 for spent in spent_per_category]

    chart = "Percentage spent by category\n"
    for i in range(100, -1, -10):
        chart += f"{i:>3}|"
        for percent in percentages:
            chart += " o " if percent >= i else "   "
        chart += " \n"

    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    max_length = max(len(category.name) for category in categories)
    for i in range(max_length):
        chart += "     "
        for category in categories:
            name = category.name
            chart += f"{name[i]}  " if i < len(name) else "   "
        print(i, max_length)
        chart += "\n" if i < max_length - 1 else ""
    return chart


food = Category("Food")
loan = Category("Loan")

food.deposit(900, "Food deposit")
food.deposit(900, "Food deposit")
food.withdraw(200, "Meat")
food.withdraw(200, "Vegetables")

food.transfer(100, loan)
print(food)


print(create_spend_chart([food, loan]))
