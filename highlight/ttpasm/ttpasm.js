/*
Language: TTP Assembly
Author: Tak Auyeung
Description: TTP Assembly language
Category: assembler
*/

/** @type LanguageFn */
export default function(hljs) {
  // local labels: %?[FB]?[AT]?\d{1,2}\w+

  const COMMENT = { variants: [
    hljs.C_LINE_COMMENT_MODE,
  ] };

  return {
    name: 'Tak\s Toy Processor Assembly',
    case_insensitive: true,
    aliases: [ 'ttpasm' ],
    keywords: {
      $pattern: '\\.?' + hljs.IDENT_RE,
      meta:
        // GNU preprocs
        '',
      built_in:
        'a b c d' // standard registers
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\b(' // mnemonics
            + 'add|sub|cmp|rsh|and|or|not|'
            + 'jmp|jc|jz|jo|jl|js|'
            + 'jmpi|jci|jzi|jsi|joi|jli|'
            + 'ld|ldi|st|cpr|'
            + 'nop|halt'
        + ')'
        + '(?=\\s)' // followed by space
      },
      COMMENT,
      hljs.QUOTE_STRING_MODE,
      {
        className: 'string',
        begin: '\'',
        end: '[^\\\\]\'',
        relevance: 0
      },
      {
        className: 'title',
        begin: '\\|',
        end: '\\|',
        illegal: '\\n',
        relevance: 0
      },
      {
        className: 'number',
        variants: [
          { // hex
            begin: '[#$=]?0x[0-9a-f]+' },
          { // bin
            begin: '[#$=]?0b[01]+' },
          { // literal
            begin: '[#$=]\\d+' },
          { // bare number
            begin: '\\b\\d+' }
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
          { // GNU ARM syntax
            begin: '^[ \\t]*[a-z_\\.\\$][a-z0-9_\\.\\$]+:' },
          { // ARM syntax
            begin: '^[a-z_\\.\\$][a-z0-9_\\.\\$]+' },
          { // label reference
            begin: '[=#]\\w+' }
        ],
        relevance: 0
      }
    ]
  };
}
