---
title: "Module 0305: Counting"
---

# _{{ page.title }}_

# About this module

-   Prerequisites:

-   Objectives: This module discusses the matter of counting possible
    outcomes in experiments.

# Terms for counting

## Trial, experiment, outcome

A trial is a single attempt to do something, typically involving
choosing something. A single choice is a trial.

A trial has a set of possible outcomes associated with it. Each outcome
represents a possible result of a trial.

An experiment is a series of trials where subsequent trials may be
affected by earlier ones. An experiment has its own outcomes

In general, the outcome set of an experiment is represented by $\Omega$,
not to be confused with the set of operators in propositional calculus!

# General counting

Generally speaking, we are counting the outcomes of an experiment. For
example, in the case of Lottery, we may be counting the number of unique
Lottery tickets.

Let $T_i$ represent the outcome set of trial $i$, where $i$ is zero
oriented. In the case where $T_i$ does not influence $T_j$ where $j>i$,
the outcome set of an experiment of $m$ trials is as follows:

$T_0 \times T_1 \times T_2 \times \dots T_{m-1}$

Cartesian product is used because for every $e\in T_0$ as the first
actual outcome from the first trial, every $f \in T_1$ can be the
outcome of the second trial, and so on.

For counting purposes, the outcome space has the cardinality of
${ \displaystyle \prod_{i=0}^{m-1} |T_i|}$

In some cases, the set of outcomes are the same for all trials, meaning
$T_0=T_1=\dots T_{m-1}=T$. Let $n=|T|$. In this case, the cardinality of
the entire experiment of $m$ trials simplifies to

$n^m$

# Without replacement

A common restriction to trials in one experiment is that whatever is
chosen earlier cannot be a choice in later trials (of the same
experiment). Let us assume we start with a set $T$ where $n=|T|$ as the
set of outcomes of the first trial of an experiment with $m$ trials.

If $e_0 \in T$ is the actual outcome of trial 0, then $e_0$ is no longer
available for trial 1. Trial 1, therefore, has an outcome set of
$T-\\{e_0\\}$, and there are now $|T-\\{e_0\\}|=n-1$ choices in trial 1.

Using $e_i$ to represent the actual outcome of trial $i$, it is easy to
see that for trial $i$, the outcome set is

$T-(\bigcup_{j=0}^{i-1}\\{e_j\\})$

And as a result, the number of choices is

$|T-(\bigcup_{j=0}^{i-1}\\{e_j\\})| = n-i$

For counting purposes, an experiment of $m$ trials has the following
possible outcomes:

$$\begin{aligned}
    \prod_{i=0}^{m-1}(n-i) & = \prod_{i=0}^{m-1}(n-i)\frac{\prod_{i=m}^{n-1}(n-i)}{\prod_{i=m}^{n-1}(n-i)} \\
      & = \frac{\prod_{i=0}^{n-1}(n-i)}{\prod_{i=m}^{n-1}(n-i)} \\
      & = \frac{\prod_{i=1}^{n}(i)}{\prod_{i=1}^{n-m}(i)} \\
      & = \frac{n!}{(n-m)!} \\
      & = \mathrm{P}_{m}^{n}
  
\end{aligned}$$

Note that $\frac{n!}{(n-m)!}$ is also known as $\mathrm{P}_{m}^{n}$ or
$\mathrm{P}(n,m)$, it is the number of permutations to choose $m$ items
from $n$ items.

# Ordering

In some cases, ordering of trials in an experiment is not important. For
example, in the case of Lottery, choosing 1,2,3,4,5 is the same as
choosing 5,4,3,2,1.

In this case, $\\{1,2,3,4,5\\}$ (note the use set notation) is known as a
*combination*, as opposed to $(1,2,3,4,5)$, which is known as a
permutation of the combination. There are many other permutations from
the same combination, such as (but not limited to) $(5,4,3,2,1)$,
$(1,2,3,5,4)$ and etc.

Knowing the number permutations (order significant) of an experiment,
how do we get the number of combinations? In other words, how many
permutations are there to a single combination?

If a combination has $m$ elements, then there are $m$ ways to choose the
first outcome from the permutation perspective. There are $m-1$ ways to
choose the second outcome, and so on. For the last item, there is
exactly one 1 choice left because all other $m-1$ choices are used in
earlier trials already.

But hey, isn't this the same as choosing $m$ items from $m$ items?
Indeed! We already know the number of permutations of choosing $m$ items
from $m$ items is

$$\begin{aligned}
    \mathrm{P}(m,m) & = \frac{m!}{(m-m)!} \\
                    & = \frac{m!}{1} \\
		    & = m!
  
\end{aligned}$$

This means that the number of *combinations* of choosing $m$ items from
$n$ items (also known as $n$ choose $m$) is as follows:

$$\begin{aligned}
    \mathrm{C}(n,m) & = {n \choose m} \\
                    & =  \frac{\mathrm{P}(n,m)}{m!} \\
		    & = \frac{\frac{n!}{(n-m)!}}{m!} \\
		    & = \frac{n!}{m!(n-m)!}
  
\end{aligned}$$

# Permutation outcome set of experiments without replacement

In the cases where the outcome sets of each trial $T_i$ is independent
to other trials, the outcome set $\Omega$ of an experiment of $m$ trials
is just the Cartesian product of the outcome set $T_i$ where
$i \in \\{0..m-1\\}$.

However, with the concept of "without replacement", the outcome set of
an experiment gets a little more difficult to express. The cardinality
of the outcome set is already discussed and it is relatively easy to
derive.

Let $T$ represent the pool of choices originally presented. Furthermore,
let $\Omega_i(T)$ represent the outcome set of an experiment involving
$i$ trials starting with $T$ as the set of trial outcomes. It is easy to
see how $\Omega_0(T) = \\{ () \\}$.

However, $\Omega_2$ becomes a little more difficult to express. This is
because it depends on the actual outcome of the first trial. We can
still express it as follows:

$$\begin{aligned}
    \Omega_2(T) & = \bigcup_{e \in T}(\{e\} \times (T-\{e\})) \\
                & = \bigcup_{e \in T}(\{e\} \times \Omega_1(T-\{e\}))
  
\end{aligned}$$

Here, we can a recursive relationship that can be generalized as
follows:

$$\begin{aligned}
    \Omega_i(T) = \bigcup_{e \in T}(\{e\} \times \Omega_{i-1}(T-\{e\}))
  
\end{aligned}$$

The recursive definition ends with $i=1$ where $\Omega_1(T) = T$.

# Combination outcome set of experiments without replacement

Occasionally, ordering is not important when the outcomes of an
experiment is considered. In this case, an outcome (of the experiment)
can be considered a set.

Let $U_i(X)$ represent the set of all possible combination outcomes of
an experiment with $i$ trials and the set $X$ represents the set of
choices available to the first trial.

As a result, we can see how the following is defined:

$U_0(X) = \\{ \\{ \\} \\}$

In other words, $U$ is a set of sets!

For all $i$ greater than 1, the following recursive definition applies.

$U_{i}(X) = \bigcup_{e \in X} (\bigcup_{S \in U_{i-1}(X-\\{e\\})} \\{\\{e\\} \cup S\\})$

Note that despite the similarity to $\Omega_i(X)$, the cardinality of
$U_i(X)$ is usually much smaller. This is because one set of $n$
elements has $n!$ permutations.

# Significance

Counting (the cardinality of an outcomes set) is important because it is
the denominator of discrete probabilities. In other words, we cannot
study the chances of certain specific outcomes unless we know the total
number of possible outcomes.
