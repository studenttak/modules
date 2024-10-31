/*
Language: ARM Assembly
Author: Dan Panzarella <alsoelp@gmail.com>
Description: ARM Assembly including Thumb and Thumb2 instructions
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
        '.2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg '
        // ARM directives
        + 'ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ',
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
