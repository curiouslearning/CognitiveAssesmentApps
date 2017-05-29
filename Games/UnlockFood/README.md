
Mapping of array index to matrix position:
```
0 1 2
3 4 5
6 7 8
```

If "activeTile" is false then "frameKey" is empty string "".

An example
```
"activeTiles": [true, true, true, true, true, true, true, true, true],
"frameKeys": ["D", "B", "D", "D", "D", "S", "C", "D", "C"]
```
would have the following matrix
```
D B D
D D S
C D C
```

while:
"activeTiles": [false, true, true, false, true, true, true, true, true],
"frameKeys": ["", "B", "D", "B", "", "S", "C", "D", ""]
```
would have the following matrix
```
  B D
B   S
C D
```
