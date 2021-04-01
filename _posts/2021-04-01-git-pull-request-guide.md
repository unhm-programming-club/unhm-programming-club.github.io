---
layout: post
title:  "How to Git Pull"
date:   2021-04-01 08:25:30 -0400
author: Karl Miller
tags: tutorials
---

The only requirement of membership in the Programming Club, besides following our conduct rules, is that every member must make a Pull Request on GitHub on a [club repository](https://github.com/unhm-programming-team/) once per semester.

Making a pull request is a little complicated, especially the first time. It involves a mixture of command line actions and interacting with the user interface on GitHub.com. 

This guide will instruct on how to make a simple, content-related pull request on a Programming Club Repository.

Once you have Git installed and have a GitHub account, the process is this:

_fork - clone - edit - push - pull request_

## 1 - Download Git and Create a GitHub Account

Git is available at [https://git-scm.com/downloads](https://git-scm.com/downloads). Download the version for your system. This guide assumes you have Windows 10.

**What Git is**:
- Git is a separate program from GitHub and can also be used with other platforms, like BitBucket.
- Git lets you save and load changes to a bunch of files at once. 
- It's a lot like saving a whole directory.
- The directory where Git is activated is called the "repository"
- Saving is called "commit"ing. 
- Repositories can be reverted to past commits.
- Repositories can be uploaded and synced to GitHub so multiple people can work on them.

You can create a GitHub Account by navigating to GitHub.com in any browser and following the instructions there.

## 2 - Add Git to the Path

_Note_: This may be set up by default when you install Git. You can test it by typing 'git help' on the command line. 

Go to the directory where you installed Git and find the `cmd` directory. For example: 

`C:\Program Files\Git\cmd`

In that directory is a file (on Windows) called Git.exe. You need to add this directory to your "Path" so that you can access Git.exe on the command line from any place on the system.

To add it to your path, open Window's environment variables manager. Press the windows key and type 'environment variables'

![Environment variables]({{site.baseurl}}/assets/images/pull-request-tutorial/2-windows-environment-variables.png "A picture of the environment variables interface on Windows 10 resulting from pressing the windows key and searching 'environment'")

Press the Edit button to edit the Path Variable.

![Environment variables - Edit Button]({{site.baseurl}}/assets/images/pull-request-tutorial/2-windows-env-var-2.png "A picture of the environment variables interface on Windows 10 where user can select which environment variable they wish to edit")

In the Edit window for the Path variable, press the New button to add a new location to the path.

![Environment variables - New Button]({{site.baseurl}}/assets/images/pull-request-tutorial/2-windows-edit-environment-variable.png "A picture of the Edit Path environment variable interface on Windows 10 where user can edit directories on the path")

Type `C:\Program Files\Git\cmd` (or whatever directory Git\cmd was installed to) and press Enter.

![Environment variables - New Button]({{site.baseurl}}/assets/images/pull-request-tutorial/2-last-git-added-to-path.png "A picture of the Edit Path environment variable interface on Windows 10 where user can edit directories on the path, with the Git/cmd path entered")

Congratulations, now Git is on the Path. Now you can access it by typing `git` in the command line from anywhere on the system.

## 3 - Configure Git by Adding User Name and Email

You will need to configure git by adding a user name and email. It doesn't have to be a real user name or email. This has nothing to do with your GitHub account. 

Once Git is on the path, you can use it from the command line anywhere on your system. You can open the command line quickly in windows by pressing the Windows key and typing `cmd`.

![Command Prompt Icon]({{site.baseurl}}/assets/images/pull-request-tutorial/3-command-prompt.png "A cropped screenshot of the Windows Command Prompt icon resulting from pressing the Windows key and typing 'cmd'")


In the command line, run these two commands:

`git config --global user.name "My name"`

`git config --global user.email "email@email.com"`

![Command Prompt - Setting Git Config]({{site.baseurl}}/assets/images/pull-request-tutorial/3-setting-git-config.png "A cropped screenshot of the Windows Command Prompt with the git config commands entered")

You can see what user property is set by entering, for example, `git config user.name`.

## 4 - Fork the Repository on GitHub.

You need copy the repository you want to change from the account or organization that controls it to your own GitHub account first by "Forking" it. Then you will edit your Fork before Pull-requesting changes back into the original repo. You'll have the option to delete your fork afterwards.

Head over to [project ideas repository on GitHub](https://github.com/unhm-programming-team/project-ideas).

In the top right corner, right under your name, there is a button that's not obviously a button labeled "Fork". Click that button.

![Fork Button on GitHub.com]({{site.baseurl}}/assets/images/pull-request-tutorial/4-fork-button.png "A cropped screenshot of the Fork Repository Button on GitHub.com")

You will be prompted "Where should we fork project-ideas"? Click your own account name.

![Fork Prompt on GitHub.com]({{site.baseurl}}/assets/images/pull-request-tutorial/4-where-should-we-fork.png "A cropped screenshot of the 'where should we fork' prompt on GitHub.com")
<br />
<br />
<br />
GitHub will take a moment to process the forking.
<br />
<br />

![Fork Waiting on GitHub.com]({{site.baseurl}}/assets/images/pull-request-tutorial/4-forking-and-waiting.png "A cropped screenshot of GitHub.com waiting to process a fork command")

When the forking finishes, you will now have a "fork", a copy repository identical to `unhm-programming-club/project-ideas` located at `https://github.com/your_github_username/project-ideas`

## 5 - Clone your Fork

In the repository you just created, you will see a big green button labeled Code. Click that button.

![Screen of Forked Repo]({{site.baseurl}}/assets/images/pull-request-tutorial/5-code-button-1.png "A cropped screenshot of the forked repository on GitHub.com, with the green 'Code' button obvious on the right side.")

A drop down menu will appear.

![Screen of Code Drop down]({{site.baseurl}}/assets/images/pull-request-tutorial/5-code-drop-down-2.png "A cropped screenshot of the drop down menu that appears after clicking the 'Code' button on a GitHub.com repository.")

Copy the URL listed there. That's the remote address of your fork. There is a convenient copy button as well.

This is the URL that we will use to "clone" your fork onto your local system.

Create a new directory on the Desktop or wherever is clever. You can delete this later, since your changes will be synced to GitHub at the end anyway. It's likely you already know that a directory can be created by right clicking on the Desktop and selecting new > Folder.

![Screen of New Folder command]({{site.baseurl}}/assets/images/pull-request-tutorial/5-clone-new-folder.png "A cropped screenshot of a windows desktop with the right click context menu open, showing how to create a new directory.")


Double click on your folder to open it in Windows Explorer

![Screen of New Folder]({{site.baseurl}}/assets/images/pull-request-tutorial/5-new-empty-folder.png "A cropped screenshot of windows explorer opened on the new empty folder desktop/example-pull")

Now click in the address bar.

![Screen of New Folder clicked address bar]({{site.baseurl}}/assets/images/pull-request-tutorial/5-new-folder-address-bar-click.png "A cropped screenshot of windows explorer opened on the new empty folder desktop/example-pull with the address bar highlighted")


Now type `cmd` and press Enter

![Screen of New Folder cmd in address bar]({{site.baseurl}}/assets/images/pull-request-tutorial/5-cmd-in-address-bar.png "A cropped screenshot of windows explorer opened on the new empty folder desktop/example-pull with 'cmd' typed into the address bar")

The command prompt will open already set to the directory you created.

![Screen of Command Prompt opened to working directory]({{site.baseurl}}/assets/images/pull-request-tutorial/5-new-cmd-prmpt.png "A cropped screenshot of windows command prompt in the same directory as explorer was in")

In the command prompt type `git clone ` then press `Ctrl+V` to paste the git address you copied earlier from Github.com.

![Screen of Command Prompt with git clone]({{site.baseurl}}/assets/images/pull-request-tutorial/5-git-clone-cmd-prompt.png "A cropped screenshot of windows command prompt with a git clone command typed out")

You will be rewarded with a message indicating succesful cloning.

![Screen of git clone result]({{site.baseurl}}/assets/images/pull-request-tutorial/5-git-clone-result.png "A cropped screenshot of windows command prompt with the result of a git clone command displayed")

In the directory you created on the desktop, there will be a new subdirectory, a clone of the repository on Github.com.

![Screen of git clone result in explorer]({{site.baseurl}}/assets/images/pull-request-tutorial/5-git-clone-result-explorer.png "A cropped screenshot of windows explorer showing the same directory, now with the new directory from the cloning inside it")

## 6 - Make your changes

Next, edit the `project-ideas.md` file in the directory you just created.

![Screen of context menu on a file]({{site.baseurl}}/assets/images/pull-request-tutorial/6-edit-a-file.png "A cropped screenshot of windows explorer showing the context menu open on a file to edit")

_Note_: You can use notepad or another text editor if you don't have Notepad++.

Add a project idea to one of the lists. The file is markdown. You can get an idea of how markdown works [here](https://markdownlivepreview.com/). 

If you're at a loss for an idea, just think of your favorite game, and suggest copying that game. Nobody said the project idea has to be something easy or even feasible! Just anything that interests you.

![Screen of notepad++ with a file open for editing]({{site.baseurl}}/assets/images/pull-request-tutorial/6-example-edit.png "A cropped screenshot of Notepad++ with project-ideas.md open for editing and 'Starcraft clone' being added to the game ideas list.")

Save the file.

## 7 - Add the changes to git

Open the command line in the cloned directory.

If you still have the command line open from earlier, you can use the 'cd' command to get the command line into the directory. You'll need to have the command line open in that directory to execute git commands.

![Screen of Windows CLI]({{site.baseurl}}/assets/images/pull-request-tutorial/6-cd-cmd.png "A cropped screenshot of Windows Command Prompt having been 'cd'ed into the correct directory")

If you type `git status` you will see that there are "untracked changes" now.

_7-git-add-status.png_

Changes need to be 'staged' or 'added' before they can be saved or 'commit'ed. 

You can add all the changes with `git add *`.

_7-git-add-status-after-add.png_

Now your changes are staged.

## 8 - Commit the changes 

Committing takes a snapshot of where you are right now. It's basically a save.

Every commit has to have a short message with it that describes what changes were made.

Committing only "saves" the files that were already saved with `git add`.

To commit, type `git commit -m "My commit message"`.

_8-git-commit-example.png_

## 9 - Push the Changes

Now it's time to send your commit back to the Github fork you created earlier.

In the command line, type `git push origin`.

_9-git-push-cli.png_

If it's your first time pushing to GitHub, a new window will pop up asking for your GitHub login. Login with this window. 

_9-git-login-example.png_

Now your changes will appear on your Fork on GitHub.

## 10 - Open a Pull Request

Navigate to the original repository at [https://github.com/unhm-programming-team/project-ideas](https://github.com/unhm-programming-team/project-ideas).

Click on the Pull Requests tab.

_10-open-pull-request.png_

Click the big green button labeled "New Pull Request".

Normally, you'd have made a branch after you cloned your repository, but this tutorial aims to be as simple as possible. If you had made a branch, Git would automatically ask you about Pull Requests here. Instead, you have to click where it says "compare across forks".

After clicking "compare across forks" you will be asked which repository is the "base" and which is the "head". The "head" will be the repository you forked and the "base" will be the original repository your changes are now going to be merged in to.

Set your fork to the head of the pull request by clicking the head repository and selecting your fork from the drop down options.

_10-select-your-head.png_

A list of commits you made and the changes those commits caused will be shown. It will be indicated whether the branch can be automatically merged or not (pending approval of the original repository owner). 

Click 'Create pull request'

_10-create-pull-rq.png_

The next page will ask you to enter a title and comments. You will at least need a title to submit the Pull Request.

_10-create-pull-rq-comments.png_




# Done!

Congratulations. If you've made it this far, you've probably managed to make a pull request. Now all you have to do is wait for it to be reviewed and merged into the original repository. When that happens, you'll have the option to delete your branch.

There's a lot more that can be done with Git, but hopefully this tutorial provides enough of the basics to help a new GitHub user make a pull request.

Please don't hesitate to contact myself or ask in the Discord help channel for more information. We can screen share and walk you through the process if you get stuck.

