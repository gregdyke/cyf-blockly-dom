/* jshint esversion: 6 */

function provideRandomInt() {
  return Blockly.JavaScript.provideFunction_("randomInt", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(n) {",
    "  // Return a random number from in [0, n[",
    "  return Math.floor(Math.random()*n);",
    "}",
  ]);
}

function provideRandomMember() {
  let randomInt = provideRandomInt();
  return Blockly.JavaScript.provideFunction_("randomMember", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(arr) {",
    "  // Return a random member of the array",
    "  return arr[" + randomInt + "(arr.length)]",
    "}",
  ]);
}

Blockly.defineBlocksWithJsonArray([
  {
    type: "get_randomWord",
    message0: "get a random %1",
    args0: [
      {
        type: "field_dropdown",
        name: "TYPE",
        options: [
          ["word", "WORD"],
          ["noun", "NOUN"],
          ["verb", "VERB"],
          ["adjective", "ADJECTIVE"],
        ],
      },
    ],
    output: String,
    colour: "%{BKY_TEXTS_HUE}",
  },
]);

Blockly.JavaScript["get_randomWord"] = function (block) {
  const getWords = Blockly.JavaScript.provideFunction_("getWords", [
    "function " + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + "(type) {",
    "  // Return words of a given type, or all words if type is 'WORD'",
    "  let words = [",
    "    {type: 'ADJECTIVE', value: 'big'},",
    "    {type: 'ADJECTIVE', value: 'purple'},",
    "    {type: 'ADJECTIVE', value: 'miscellaneous'},",
    "    {type: 'ADJECTIVE', value: 'interesting'},",
    "    {type: 'ADJECTIVE', value: 'collapsed'},",
    "    {type: 'NOUN', value: 'umbrella'},",
    "    {type: 'NOUN', value: 'knee'},",
    "    {type: 'NOUN', value: 'banana'},",
    "    {type: 'NOUN', value: 'platypus'},",
    "    {type: 'NOUN', value: 'bottle'},",
    "    {type: 'VERB', value: 'delineated'},",
    "    {type: 'VERB', value: 'read'},",
    "    {type: 'VERB', value: 'saw'},",
    "    {type: 'VERB', value: 'ate'},",
    "    {type: 'VERB', value: 'magicked'},",
    "  ];",
    "  return words.filter(word => type === 'WORD' || word.type === type).map(word => word.value);",
    "}",
  ]);
  const type = block.getFieldValue("TYPE");
  const randomMember = provideRandomMember();
  return [
    `${randomMember}(${getWords}('${type}'))`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL,
  ];
};