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

`GitHub` supports Markdown (MD) as a markup language. MD is a fairly rich markup language that can fall back to HTML when necessary. However, even by itself, it supports normal text formatting, equations, drawing various types of diagrams, formatting tables, etc. Compared to HTML, MD is easier to learn and type even with a plain-text editor like `notepad` in Windows. Many open-source and free previewing editors can render MD side-by-side with the MD document. 

However, the *implementation* of MD rendering at `GitHub` has many inconsistencies and issues. Many of these inconsistencies are discovered and managed in the OER project that hosts this page. The architecture of this OER project is as follows:

* The content is hosted by `github.com`. All the MD and associated graphics files are parts of a `GitHub` repository.
* Content is organized as "modules." Each module has its own folder to contain the MD file and potentially additional media files that the MD file references.
* The content is processed and published by `github.io`. There is a delay in the update of the source material and the actual publication of the content. This lag depends on many factors, including the amount of content in a project.

While `GitHub` can natively do this, this OER project includes the configuration and customization necessary to render MD as correctly as possible. Please note that the "preview" of the editor does not render some MD code correctly, especially those involving equations, diagrams (using `Mermade`), and HTML/Javascript for rendering purposes.

For content quality assurance, the following steps are suggested. Assume `username` is the user name of the repository, and `reponame` is the name of the repository, and `moduleNum` is the 4-digit number of the module:

* Go to `https://github.com/username/reponame/actions` and check to make sure all workflow runs are completed, each with a check in a green circle. If a workflow is in progress (a turning yellow circle), wait for it to complete.
* Go to `https://username.github.io/reponame/moduleNum/mdModule.html` to check the content.

In order to circumvent issues related to static and out-of-date Markdown rendering, the configuration of this repository relies on many client-side (browser side) Javascript rendering.

## Getting started

### Setting up an account

To get started, an OER developer first registers with [GitHub](https://github.com) for a free account using the "Sign up" button. As the last page of the registration process, it is best to identify as a "Teacher". In order to finish the registration as a teacher, you will need to use a school email address (one that ends with `.edu`).

As for the top 2 things you want to do with GitHub, "Connect with other developers" and "Contribute to Open Source projects" are good choices for an OER project.

### Cloning the project

Go to the [home page](https://github.com) after you sign in. Click ["Import repository"](https://github.com/new/import). You will need to fill in the details of the repository.

* "The URL for your *source* repository:" This is the URL of the repository to clone from. Specify `https://github.com/proftak/modules.git` here.
* "Your username for your source repository" and "Your access token or password for your source repository": leave both blank because you are cloning from a public repository, there is a username or password to specify.
* Under "Your new repository details", you can use any repository name.
* You can also mark your project as "Public" or "Private".
  * If you intend the OER to be ND, choose "Private."

Click "Begin import" to start the process. It may take a few minutes to import the project.

### Publishing the rendered pages

Because the OER content is cloned along with the configuration and customization, you probably want to clean up the content before starting your own. Before doing that, however, it is helpful to first make sure the content is published correctly.

To check the published content, go to the URL `https://username.github.io/reponame` (`username` is a placeholder of your actual `GitHub` user name, and `reponame` is a placeholder of your actual repository name). You are likely to see a "404" error because there are some additional steps to finish the configuration and customization.

Head to the home of your repository. This page has an URL of the form of `https://github.com/username/reponame`. Click "Settings".

On the left pane, under "Code and automation", click "Actions", then click "General". In "Action Permissions", under "workflow permissions", select "Read and write permissions." This is necessary for the workflow script to perform its action. Click "Save".

At this point, you are still under "Settings" (red underline on the top bar). Under "Code and automation", click "Pages". Under "Build and deployment" and "Source", Keep the default "Deploy from a branch". On the same page, under "Branch", make sure you are using "main" as the branch, and "/root" as the root directory. 

Refresh this page a few times. In a couple of minutes, the top should report that "Your site is live at..."

### Cleaning up the content

The repository comes with its own OER content that you probably do not need. To remove the current modules, follow these instructions:

* First, navigate to the home of your repository at `https://github.com/username/reponame`
* To safely remove modules one by one:
  * Click on a module (a four-digit folder name).
    * Click the "..." on the right-hand side.
    * Click "Delete Directory"
    * Click "Commit changes"
    * Confirm by clicking "Commit changes" again.
* To (dangerously!) remove all modules:
  * First, consider backing up all the files by downloading the repo as a ZIP file!
  * Click "Actions" on the horizontal menu bar.
  * On the left pane, under "Actions", "All workflows", click `rmModules`.
  * Make sure this is what you want to do!
  * On the right pane, click "Run workflow".
  * Click "Run workflow" in the pop-up.
  * There is a lag, then the pop-up will show that the workflow is in progress (turning a yellow circle to the left).

### Writing a new module

To start a new module:

* Navigate to the home of the repository `https://github.com/username/reponame`.
* Note the number of the last module.
* Depending on the width of your screen, click the `+` button or the button labeled `Add file`.
* Select "Create new file".
* In the textbox immediately to the right side of your repository name, type something like `0241/mdModule.md`, and replace `0241` with a number that is after the number of the last module.
* In the main text area, start with the following content.

```markdown
---
title: "Module 0241: Some module"
---

# _{{ page.title }}_
```

The explanation is as follows:

* `---` is the marker to begin and end the YAML (yet another markup language) section.
  * In this section, `title: "Module 0241: Some module"` specifies the title of the page. If this is not the format you want to use, some additional customization needs to be done.
* `# _{{ page.title }}_` uses HTML H1 as the title of the HTML. This part is optional and you can specify alternative formatting.

Then type the actual content in this document. Remember to to click "Commit changes..." when you are done, or at a point that you want to save the document.

## Customization

### Choice of CC license for the content

If you remove all the modules that came with the repository, you can choose your own content license. To change your content license, modify `_layouts/default.html`. Specifically, locate the line that starts with "This site is licensed under..", then modify the URL to the Creative Commons license and update the symbols.

Note that the licensing of the content is independent of the licensing of the HTML and YAML files that form the framework of the publication mechanism.
