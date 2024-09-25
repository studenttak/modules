---
title: "Module 0312: Relations"
---

# _{{ page.title }}_

# About this module

-   Prerequisites: [0280](../0280/mdModule.html),[0285/mdModule.html](../0285/mdModule.html)

-   Objectives: This module introduces relations and the types of
    relations in mathematics.

# What is a relation?

A relation is, technically, *whether* two elements of a set are related
or not. Of course, this really doesn't say much, but that is the whole
point. Let us consider a relation $R$ that is defined over a set $X$.

The first thing that we know is the following:

$R \subseteq (X \times X)$

This means that every element in a relation is a two-tuple, where both
items of the tuple come from the set that the relation is defined over.

From the notation perspective, it is conventional to write "x relates to
y via R" as $xRy$. This is the infix notation of relation. Note that
$xRy$ is not an assertion. It is not saying the x does relate to y, it
is a boolean expression that can be true or false.

There can be many relations defined over the same set.

# A concrete example

The familiar comparison operator, less then $<$, is a relation. It can
defined over any set that is fully ordered, but for now we will only
consider the set of integers, otherwise known as $\mathbb{Z}$.

As an example to illustrate that relation is a set, let's consider the
following statements:

-   $1 < 2$ is true.

-   $(1,2) \in <$ is true.

These statements are equivalent! The first statement is familiar to us
because that is how we see comparison "normally." However, the second
statement asserts the same truth, just expressed slightly differently
viewing a relation (less-than in this case) as a set of two-tuples.

# A random example

Let us define $X = \\{a,b,c,d\\}$. Now we define $R$ as follows:

$R = \\{(a,a), (a,b), (b,c), (d,d), (b,a) \\}$

With this, then we can state the following truths:

-   $aRb$ is true.

-   $(b,c) \in R$ is true.

-   $bRb$ is false.

-   $(d,c) \in R$ is false.

As stated earlier, $R$ is not the only relation that can be defined over
$X$. Because $X \times X$ in this case has 16 elements, the number of
relations that can be defined over $X$ is $2^{16}$. Think of the
presence of each element of $X \times X$ as a bit, we can use a 16-bit
number to represent a relation over $X$. The number of values that can
be represented by a 16-bit number is $2^{16}$ because each bit is
independent from all others, and each bit has 2 values to choose from.

# Special properties of relations

## Reflexive

A relation $R$ over a set $X$ is reflexive if and only if the following
is true:

$\forall e \in X((e,e) \in R)$

Note that the condition has to hold true for every element in the set.
At the same time, there can be elements in $R$ other than the ones
necessary for reflexivity.

## Symmetric

A relation $R$ over a set $X$ is symmetric if and only if the following
is true:

$\forall e,f \in X((e,f) \in R \Leftrightarrow (f,e) \in R)$

This definition is tricky because of the use of "if and only if" (aka
iff). An empty relation, according to this definition, is actually
symmetric!

## Transitive

A relation $R$ over a set $X$ is transitive if and only if the following
is true:

$\forall e,f,g \in X(((e,f) \in R \wedge (f,g) \in R) \Rightarrow (e,g) \in R)$

This definition relies on implication, which also makes it slightly
tricky. Again, an empty relation is also transitive!

## Antisymmetric

A relation $R$ over a set $X$ is antisymmetric if and only if the
following is true:

$\forall e,f \in X(((e,f) \in R) \wedge ((f,e) \in R) \Rightarrow (e=f)))$

This definition is also true for any empty relation.

# Partial ordering

A set $X$ is said to be partially ordered by a relation $R$ if and only
if the following is true:

-   $R$ is reflexive over $X$ and

-   $R$ is antisymmetric over $X$ and

-   $R$ is transitive over $X$.

Partial ordering means $R$ may not be defined for certain pairs of
elements in $X$. As a result, sorting is not possible because there may
not be ordering between certain elements, and as such the position of
such elements in an array cannot be determined.

Such an ordering is not uncommon, especially in casual use of
comparison. For example, let's say "smooth" and "rich" are both
desirable qualities. However, let us also say that between the two, we
cannot weigh whether "smooth" carries more weight than "rich". Now we
can define "more desirable."

"Smooth and rich" is more desirable than "smooth but not rich".

"Smooth and rich" is more desirable than "not smooth but rich".

"Smooth and rich" is more desirable than "not smooth and not rich".

"Smooth and not rich" is more desirable than "not smooth and not rich".

"Not smooth and rich" is more desirable than "not smooth and not rich".

Obviously, "more desirable" does not meet the requirements of a
partially ordered relation! It is definitely not reflexive. Instead of
using "more desirable than", we can use "at least as desirable as".
Let's call this new relation "alada".

Now we can claim the following:

"Smooth and rich" is alada "smooth and rich".

"Smooth and rich" is alada "smooth but not rich".

"Smooth and rich" is alada "not smooth but rich".

"Smooth and rich" is alada "not smooth and not rich".

"Smooth and not rich" is alada "smooth and not rich".

"Smooth and not rich" is alada "not smooth and not rich".

"Not smooth and rich" is alada "not smooth and rich".

"Not smooth and rich" is alada "not smooth and not rich".

"Not smooth and not rich" is alada "not smooth and not rich".

Observe how alada is now reflexive! It is also transitive and
antisymmetric. As a result, alada is relation that partially order the
set of smooth versus rich (4 elements in this set).

Also pay attention to the *lack* of alada relation between "smooth and
not rich" and "not smooth and rich".

# Total ordering

A set $X$ is said to be totally ordered by a relation $R$ if and only if
the following is true:

-   $R$ is reflexive over $X$ and

-   $R$ is antisymmetric over $X$ and

-   $R$ is transitive over $X$ and

-   $R$ is comparable over $X$, meaning that
    $\forall e,f \in X(eRf \vee fRe)$, this is also called the
    "trichotomy law."

You can see that the only difference between partial ordering and total
ordering is the last item, known as comparability. Furthermore, any
totally ordering relation is also automatically partial ordering.

Elements in a set $X$ that is totally ordered by a relation $R$ can be
linearly sorted by $R$.
