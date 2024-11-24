---
title: "Module 0433: Creative Commons, Open Educational Resources, and GitHub"
---

# _{{ page.title }}_

## How they connect

### Open Educational Resource (OER)

OER refers to books, articles, activities, etc. that are "open" and for educational purposes. "Open" has multiple meanings. The most essential element of "open" is "free of charge." Unlike materials that are paid for by a college and therefore free of charge to students, OER is free of charge to be redistributed. 

There are some nuances regarding how "open" is "open". For example, some OER content is free-of-charge to be redistributed, but not open to be modified. Some OER material is open for any type of redistribution and even incorporation into commercial products, others have restrictions. This is where Creative Commons licenses become important.

### Creative Commons (CC)

CC is both the name of an organization and also the licenses that it creates. There are several CC licenses. For the purpose of this module, we will focus on licenses that do not include "No Derivatives" (ND) as a part of the CC license. This is because `GitHub` is a mechanism that benefits OER and is intended to be remixed and derived.

### `GitHub`

`GitHub` is a cloud resource that integrates the use of `git` at the core. `git` is the name of a revision control tool that is commonly used by (software) developers to keep track of changes and also to facilitate expansive teamwork.

While there are many other platforms to author, publish, and adopt OER, `GitHub` is unique in some ways. In the context of OER, `git` (as a tool) offers the following:

* "Clone": duplicate an OER project.
* "Fork": revise an OER project with possibilities to integrate the changes back into the project, or to split it as a new project.
* "Pull": if the original project is called the "parent", and a forked project is the "child", this allows revisions to propagate from the parent to the child.

"Pull" is a feature unique to `git`, by extension, `GitHub`.

## Licensing

The strength of `GitHub` is the ease of spinning off an OER project. As such, while `GitHub` is also useful for OERs that have ND in their CC licenses, OERs that are CC licensed without ND benefit even more from the `git` mechanisms.

## On the technical side

`GitHub` supports Markdown (MD) as a markup language. MD is a fairly rich markup language that can fall back to HTML when necessary. However, even by itself, it supports normal text formatting, equations, drawing various types of diagrams, formatting tables, etc. Compared to HTML, MD is easier to learn and type even with a plain-text editor like `notepad` in Windows. There are many open-source and free previewing editors that can render MD side-by-side with the MD document. 

However, the *implementation* of MD rendering at `GitHub` is flawed. 


