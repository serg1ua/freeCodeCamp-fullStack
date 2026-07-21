class HashTable:
    """A simple hash table implementation."""

    def __init__(self):
        self.collection = {}

    def hash(self, str):
        return sum([ord(char) for char in str])

    def add(self, key, value):
        if self.hash(key) in self.collection:
            self.collection[self.hash(key)][key] = value
        else:
            self.collection[self.hash(key)] = {key: value}

    def remove(self, key):
        if self.hash(key) in self.collection:
            del self.collection[self.hash(key)][key]
        return

    def lookup(self, key):
        return (
            None
            if not self.hash(key) in self.collection
            else self.collection[self.hash(key)][key]
        )


table = HashTable()
table.add("golf", "sport")
table.add("football", "sport")
table.add("dear", "friend")
table.add("read", "book")

print(table.collection)
print(table.lookup("read"))
