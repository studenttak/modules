---
title: "Module 0374: Structures and arrays in TTPASM"
author: Tak Auyeung
---

# _{{ page.title }}_

# Arrays

In an architecture with a memory with of multiple bytes, items in an array are usually aligned to the memory width. Let us consider the following example in C/C++:

```c
TYPEX buffer[BUFLEN];
```

Assuming the memory width (also known as the "word size") of an architecture is $w$ bytes, then each item takes up $v=\mathrm{was}(\mathtt{TYPEX})= \left \lceil \frac{\mathtt{sizeof(TYPEX)}}{w} \right \rceil \cdot w$ bytes in the array `buffer`. "was" is the abbreviation of "word-aligned size." As a result, the entire array takes up $\mathtt{BUFLEN} \cdot v$ bytes.

Note that this general equation also works for TTP, but in this case, $w=1$.

Most architectures that have $w>1$ are still byte-addressable. The address of `buffer[i]` in byte address is, therefore, $\mathtt{\&buffer}+i\cdot v$.

# Structures

A general structure definition in C/C++ looks like this:

```c
struct STRUCTX
{
  TYPE1 m1; // first member
  TYPE2 m2;
  // ...
  TYPEn mn; // last member
};
```

As with array items, structure members `m1` to `mn` are likely to be aligned to multiples of $w$ bytes for efficiency. Unless specific "pragmas" are specified, members of a structure are ordered as in the definition. 

Let $\mathrm{offset}(s,m)$ define the offset of member $m$ from the beginning (address) of a structure $s$, then the following equations describe the offsets to each member:

$\mathrm{offset}(\mathtt{STRUCTX},\mathtt{m}_1)=0$

$\mathrm{offset}(\mathtt{STRUCTX},\mathtt{m}_i)=\mathrm{offset}(\mathtt{STRUCTX}, \mathtt{m}_{i-1})+\mathrm{was}(\mathtt{TYPE}\_{i-1})$

${m}_i$

The total number of bytes used by a `STRUCTX` is, therefore, 

$\mathrm{sizeof}(\mathtt{STRUCTX})=\mathrm{offset}(\mathtt{STRUCTX}, \mathtt{mn})+\mathrm{was}(\mathtt{TYPEn})$

# TTP implementation

The concept of a `struct` is merely a matter of tracking the offset from the beginning of a structure to the members, please an overall size of a `struct`.

For example, let us consider the following C `struct` definition:

```c
struct X
{
  uint8_t x
  struct X *ptr;
  uint8_t y;
};
```

This translates to the following labels in TTPASM:

```ttpasm
X_x: 0
X_ptr: X_x 1 +
X-y: X_ptr 1 +
X_size: X_x 1 +
```

Arrays indexing is more tricky because TTP lacks a hardware multiplier.
