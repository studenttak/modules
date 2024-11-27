---
title: "Module 0372: Caller-callee agreement"
author: Tak Auyeung
---
# _{{ page.title }}_

# Mutual agreement

## Caller side

* if there are arguments:
  * arguments are pushed in reverse order
  * on TTP, arguments are pushed contiguously (no gaps between them)
  * this implies the last argument has the highest address
* the return address (the address of the instruction right after the jump to the callee) is pushed after all the arguments (if any)  
  * as a result, the return address has an address that is lower than the arguments
  * the stack pointer points to the return address at the entry point of the function being called
* jump to the entry point of the callee
* the callee should return to the instruction right after the jump instruction
* if the callee returns a scalar value:
  * the return value is assumed to be in register A
* the value of registers A, B and C are not assumed preserved
* if there are arguments:
  * the caller has the responsibility to clean up the stack space used by arguments, if any

## Callee side

* at the entry point of the callee:
  * the stack pointer points to the return address
  * if there are parameters:
    * the first parameter starts at the address immediately after (higher than) that of the return address
    * the last parameter has the highest address
    * parameters are contiguous in TTP
* in the callee's code:
  * additional stack space may be utilized
  * there is no need to preserve the values of registers A, B, or C
* at the exit point of the callee:
  * if the callee has a scalar return value:
    * use register A to store the return value
  * the callee is responsible to pop the return address
  * the callee uses the popped return address to return to the caller
 
## Non-caller-callee specific

* Any content below where the stack pointer points can be modified asynchronously
