---
title: "Module 0372: Caller-callee agreement"
author: Tak Auyeung
---
# _{{ page.title }}_

# Mutual agreement

## Caller side

* if there are arguments:
  * arguments are pushed in reverse order, the last argument is pushed first
  * on TTP, arguments are pushed contiguously (no gaps between them)
  * this implies the last argument has the highest address in a call frame
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
 
## The call frame

The call frame (or just "frame") refers to a region of stack space that provides the data context for a function to operate. This includes the space of local variables, the return address, and the parameters. The call frame is not allocated by the callee. Instead, it is partially constructed by the caller, including the parameters and the return address, and partially constructed by the callee, allocating the additional space for local variables.

After a frame is fully allocated, the stack pointer points to the base of the frame. Let us consider the following example:

```c
void f(uint8_t x, uint8_t y)
{
  uint8_t a,b;

}
```

The offset to items of the frame may be defined as follows:

```ttpasm
f_a: 0       // offset to local variable a, it is at the base of the entire frame
f_b: f_a 1 + // offset to local variable b
f_lvs: f_b 1 + // the total number of bytes needed for local variables
f_x: f_lvs 1 + // the offset to parameter x, the 1 + is needed to skip the return address
f_y: f_x 1 + // the offset to parameter y
```

The function `f` is responsible to allocate and deallocate the space needed for local variables. As a result, the shell of function `f` is as follows:

```ttpasm
f:
  ldi b,f_lvs
  sub d,b // allocate space for local variables, this completes the construction of the call frame
  // ... actual code of function f
  ldi b,f_lvs
  add d,b // deallocate space for local variables

  ld b,(d) // retrieve the return address
  inc d    // deallocate the return address from the stack
  jmp b    // continue execution at the caller
```

## Non-caller-callee specific

* Any content below where the stack pointer points can be modified asynchronously
