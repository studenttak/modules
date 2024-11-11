---
title: "Module 0428: Exam 2 Question 3 Code Correction"
author: Tak Auyeung
kramdown:
  syntax_highlighter_opts:
    disable: true
---
# _{{ page.title }}_

# What is this document?

This document describes how to answer question 3 of exam 2 in CISP 310. Specifically, what is a correction and how it is scored.

# Types of answers

## Correction

Some instructions or definitions are partially correct. In these cases, the answer is to cross out the wrong part while keeping as much of the original instruction or definition as possible. Here is an example:

> ~~~`ldi`~~~`ld a,(b) // use ld instead of ldi`

## Insertion

Some instructions or definitions may be missing entirely. In these cases, an answer is in the form of an insertion of instructions or definitions. In this case, use an arrow to point to the insertion point of the additional code. Here is an example:

> `cmp a,b`<br />
> `       ` $\leftarrow$ `jzi L1 // if (a==b) goto L1; need to branch if a==b`<br />
> `// get here when a != b`

## Deletion

Some instructions or definitions should not be present, at all. In these cases, an answer is a strike-out of the instructions of definitions that should be removed. Here is an example:

> ~~~`cpr d,c`~~~ ` // do not overwrite register d, it is needed later`


