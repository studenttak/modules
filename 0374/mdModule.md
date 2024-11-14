---
title: "Module 0374: Structures and arrays in TTPASM"
author: Tak Auyeung
---

# _{{ page.title }}_

# Arrays

Most compilers allocate space for arrays in a straightforward way.  Let us consider the following declaration where `TYPEX` is the name of a type, and `BUFLEN` is a natural number.

```c
TYPEX buffer[BUFLEN];
```

The total number number of bytes used by variable `buffer` is `sizeof(TYPEX)*BUFLEN`. 

In terms of address (for byte-addressable architectures), `&buffer[i]` has an address of `&buffer + sizeof(TYPEX) * i`.

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

The word width of an architecture is the width of the data bus in the processor core. Currently, most production processors have a word-width of 64 bits, also known as 8 bytes. If a member is of a scalar type, then a compiler attempts to make sure the entire member can be accessed in a single memory operation based on the word width of the processor.

Unless otherwise instructed using a `pragma`, a compiler sequentially allocates storage for members within a structure. The offset of a member from the beginning of a structure is based on the offset of a previous member, but aligned to make sure each elemental type can be accessed in a single memory cycle.

The offset to the first member is easy to compute because it is at the beginning of the entire structure, the offset is 0 (zero).

The offsets to the rest of the members are a little more complicated. Let `offset(m)` refer to the byte offset to member `m` in a structure, and `alignment(m)` refers to the size of the largest elemental type of member `m`. Then $\mathtt{offset}(\mathtt{m}_{i+1}) = \lceil \frac{\mathtt{offset}(m_i)+\mathtt{sizeof}(\mathtt{m}\_i)}{\mathtt{alignment}(\mathtt{m}\_{i+1})} \rceil \times \mathtt{alignment}(\mathtt{m}\_{i+1})$. The symbol $\lceil x \rceil$ is the ceiling function that returns the smallest integer greater than or equal to $x$.

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
