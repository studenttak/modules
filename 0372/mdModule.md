---
title: "Module 0372: Caller-callee agreement"
author: Tak Auyeung
---
# _{{ page.title }}_

# Stack operation specification

Register D is the designated stack point. Although register D is a general-purpose register, it is designated by *convention* in order to specify the agreement between the caller and the callee.

To push the value already loaded into register X (X can be A, B, C, or D), the following C code is used

```c
// to push the value of register X
*(--D) = X;
```

The stack pointer is decremented first to reserve the space, then the content of register X is copied to the location pointed to by register D. The equivalent TTPASM code is as follows:

```ttpasm
dec d
st  (d),x // x is a placeholder for register a,b,c, or d
```

To pop the "top" of the stack to register X, the operation is reversed. The following is the C code implementation:

```c
X = *(D++);
```

The content pointed to by the stack pointer is copied to the register specified by X, then the stack pointer is incremented to deallocate the location where the content was retrieved from. The following is the TTPASM code:

```ttpasm
ld  x,(d) // x is a placeholder for register a,b,c, or d
inc d
```

Because of this stack convention, items that are pushed earlier occupy memory locations that are higher in addresses.


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

In this case, the caller is responsible to push the arguments and the return address. As a result, the following table describes the frame at the entry point of function `f`:

|location|item description|
|-|-|
|D+2|parameter `y`|
|D+1|parameter `x`|
|D+0|return address|

Note how local variables `a` and `b` are not yet allocated. Function `f` is responsible to allocate the space needed for the local variables. Because `a` and `b` are both 1-byte wide, they need a total of 2 bytes in the frame. These two bytes are allocated at the entry point of function `f`. As a result, the local variables are located lower (in terms of addresses) than the return address. The following table show the content of the frame after local variables are allocated:

|location|item description|
|-|-|
|D+4|parameter `y`|
|D+3|parameter `x`|
|D+2|return address|
|D+1|local variable `b`|
|D+0|local variable `a`|

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

A function may have zero (no) local variables. In this scenario, the approach to use `func_lvs` as a label to represent the number of bytes used by local variable is still correct, but the label should be defined as zero. It is important to note that the return address is pointed to by the stack pointer in this case.

For example, let us consider the following C function definition:

```c
void g(uint8_t *x, uint_8 y)
{
  *x = y;
}
```

There are no local variables, the call frame consists only of the return address and the two parameters as follows:

|item|offset from the frame base|
|-|-|
|y|2|
|x|1|
|return address|0|

The corresponding TTPASM code can be as follows:

```ttpasm
g:
  g_lvs: 0
  g_x: g_lvs 1 + // add 1 to skip over the return address
  g_y: g_x 1 +
  ldi b,g_lvs
  sub d,b // "allocate" local variables even though there is none

  ldi b,g_y
  add b,d
  ld  b,(b)

  ldi a,g_x
  add a,d
  ld  a,(a)

  st  (a),b

  ldi b,g_lvs
  add d,b // "deallocate" local variables even though there is none

  ld  b,(d)
  inc d
  jmp b
```

## Non-caller-callee specific

* Any content below where the stack pointer points can be modified asynchronously
