# Instruction

1. clone project
2. run `python problem.py`
3. Type word list input seperated with comma and then press enter
4. Type target word and press enter

## Example

### Input

```
ab,bc,cd
abcd
```

### Output

```
ab cd
```

# Algorithm

We use set to contain all the word list since all word list are distinct and it is faster to find an element in set. Then, we can iterate all the word list and since we know that the target word a combination of only 2 words, we can find if the other half exist or not by searching through a set.

## Complexity Analysis

We use set to iterate which cause O(n) and search has an average of O(1) and worst case of O(n). Thus, the time complexity is O(n) for average case and O(n$^2$).

For space complexity, we only use a data structure for contain input, so the space complexity is O(n).
