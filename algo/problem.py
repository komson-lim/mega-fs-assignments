temp = input("Enter word list: ")
wordList = [e.strip() for e in temp.split(",")]
target = input("Enter target word: ").strip()

found = False
wordSet = set(wordList)
for word in wordSet:
    if word == target[0:len(word)]:
        if (target[len(word):] != word) and (target[len(word):] in wordSet):
            found = True
            print(word, target[len(word):])
            break
    if (found):
        break
if not found:
    print(None)
