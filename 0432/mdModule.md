---
title: "Module 0432: A general description of TTP"
---

# _{{ page.title }}_

# The general architecture

This is a general description of TTP (Tak's Toy Processor). There are four instruction-addressable registers: A, B, C, and D. The registers are general-purpose registers, meaning that there are no restrictions on which instruction applies to which register. The program counter, PC, is not directly addressable in instructions.

The processor is an 8-bit processor, which means that all the registers are 8-bit wide. The RAM component has an 8-bit address port, which allows the addressing of 256 locations. Each location in RAM is 8-bit wide.

The ALU (arithmetic and logic unit) is capable of addition, subtraction, bit-wise and, bit-wise or, right-shift, and bit-wise not. There are 5 flags in the flags register:

* C: the C flag is the overall borrow after a subtraction and the overall carry after an addition
* Z: the Z flag is true if and only if the result of the previous operation is zero.
* S: the S flag is the sign flag (bit 7) of the result of the previous operation.
* O: the O flag is the overflow flag of the previous add or subtract operation. Overflow means the result of the operation is out of the range of a signed 8-bit integer.
* L: the L flag is the exclusive-or of the S and and O flags. The L flag is true if and only if the minuend is less than the subtrahend in the previous subtraction.

The flags are not directly accessible, but they are utilized in the conditional branch instructions jci, jzi, jsi, joi and jli. These conditional branches branch based on the value of a flag. For example, jci branches if and only if the C flag is true. If a conditional branch instruction does not branch, the processor continues with the instruction that immediately follow the conditional branch instruction.

# The instructions

The following table uses `x` and `y` as placeholders of one of the four registers, A, B, C, and D. `i` is a placeholder for an immediate value, which must be specified by a postfix expression that is resolvable at assemble time. The register transfer language description explains what happens when the instruction executes. Note that the program counter (`PC`) points to where the next opcode is in memory, but it is not directly addressable in an instruction. Any dereference is getting the content of a memory location. Also, note that `PC` is already pointing to one byte past the opcode being executed due to an autoincrement in the fetch phase of instruction execution.

|mnemonics|RTL|flags affected|number of bytes of the instruction|
|-|-|-|-|
|cpr x,y|x=y||1|
|ld x,(y)|x = *y||1|
|st (y),x|*y = x||1|
|ldi x,i|x=i||2|
|jmpi i|PC=i||2|
|jci i|PC=c?i:PC+1||2|
|jzi i|PC=z?i:PC+1||2|
|jsi i|PC=s?i:PC+1||2|
|joi i|PC=o?i:PC+1||2|
|jli i|PC=l?i:PC+1||2|
|jmp x|PC=x||1|
|cmp x,y|x-y|C,Z,S,O,L|1|
|add x,y|x=x+y|C,Z,S,O,L|1|
|sub x,y|x=x-y|C,Z,S,O,L|1|
|and x,y|x=x&y|Z,S,L|1|
|or x,y|x=x|y|Z,S,L|1|
|not x|x=~x|Z,S,L|1|
|rsh x,y|x=x << y|Z,S,L|1|
|inc x|x=x+1||1|
|dec x|x=x-1||1|


