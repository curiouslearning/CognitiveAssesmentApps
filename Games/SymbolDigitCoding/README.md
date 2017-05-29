Usage of "trials.json" for defining game trials is explained below.

The SymbolDigitCodingGame presents the user with four signs hanging from the
top of the display, each sign has an picture of one of the following foods
that the monster would like to eat: can, fruit, grass, bug.

In addition, the "monster" has a thought bubble that has it's current thought
symbol and the next two thoughts. The thought symbols map to the food that the
monster would like to eat, the symbol in the right most position is the
represents the food that the monster would currently like to eat.

The Trials JSON file (trials.json) can be used to create all desired trials
for this game. The JSON file represents an array of trials, each trial has
the following shape.

```
{
  "correctSymbol": "GRASS",
  "selectionTiles": {
    "activeTiles": [true, true, true, false, false, false, false, false, false],
    "frameKeys": ["CAN", "FRUIT", "GRASS", "", "", "", "", "", ""]
  },
  "displaySymbols": {
    "symbols": ["CAN", "FRUIT", "BUG", "GRASS"]
  }
}
```

  * correctSymbol is the correct sign item to pick for the current trial
  * thoughtTiles is an object that represents the thought symbols above the
  monster. This data structure is required for use be Matrix.js
    * activeTiles will always be an array of 9 with elements 0-2 === true and
    false the remainder
    * frameKeys will always be an array of 9 with elements 0-2 containing the
    name of the symbol that should be displayed. Note that array item 0 is the
    left most item in the thought bubble and array item 2 is the right most.
  * displaySymbols is an object that represents the hanging signs with their
  corresponding food.
    * symbols will always be an array of 4 with each element being a string
    representing the name of the food to appear in the sign. the 0 element of
    the array is the left most sign, while the 3 element is the right most.

** Note that type case matters, for foods you should always use CAPITAL for all
letters. **

The following is an example of two trials json objects:

```
{
  "correctSymbol": "GRASS",
  "selectionTiles": {
    "activeTiles": [true, true, true, false, false, false, false, false, false],
    "frameKeys": ["CAN", "FRUIT", "GRASS", "", "", "", "", "", ""]
  },
  "displaySymbols": {
    "symbols": ["CAN", "FRUIT", "BUG", "GRASS"]
  }
},

{
  "correctSymbol": "FRUIT",
  "selectionTiles": {
    "activeTiles": [true, true, true, false, false, false, false, false, false],
    "frameKeys": ["BUG", "CAN", "FRUIT", "", "", "", "", "", ""]
  },
  "displaySymbols": {
    "symbols": ["FRUIT", "BUG", "GRASS", "CAN"]
  }
}
```

Note that for the second trial (correctSymbol === FRUIT) the "frameKeys" are

```
"frameKeys": ["BUG", "CAN", "FRUIT", "", "", "", "", "", ""]
```

This is the right shift and addition of BUG of trial one. This pattern is required
and is further highlighted for 5 numbered trials below:

```
Trail 1 - "frameKeys": ["CAN", "FRUIT", "GRASS", "", "", "", "", "", ""]
Trial 2 - "frameKeys": ["BUG", "CAN", "FRUIT", "", "", "", "", "", ""]
Trial 3 - "frameKeys": ["GRASS", "BUG", "CAN", "", "", "", "", "", ""]
Trial 4 - "frameKeys": ["FRUIT", "GRASS", "BUG", "", "", "", "", "", ""]
Trial 5 - "frameKeys": ["BUG", "FRUIT", "GRASS", "", "", "", "", "", ""]
```

With respect to displaySymbols ordering does not matter, you can change
ordering in anyway as long as each food appears only once. For example all of
the following would be valid orderings for the above 5 trials.

```
Trail 1 - "symbols": ["FRUIT", "BUG", "GRASS", "CAN"]
Trial 2 - "symbols": ["FRUIT", "BUG", "GRASS", "CAN"]
Trial 3 - "symbols": ["CAN", "FRUIT", "GRASS", "BUG"]
Trial 4 - "symbols": ["FRUIT", "CAN", "BUG", "FRUIT"]
Trial 5 - "symbols": ["CAN", "GRASS", "FRUIT", "CAN"]
```
