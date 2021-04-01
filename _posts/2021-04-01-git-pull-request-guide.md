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

Once you have Git installed, have a GitHub account, and are a member of the UNHM Programming Team Repository, the process is this:

_fork - clone - edit - push - pull request_


## 1 - Download Git

Git is available at [https://git-scm.com/downloads]. Download the version for your system. This guide assumes you have Windows 10.

**What Git is**:
- Git is a separate program from GitHub and can also be used with other platforms, like BitBucket.
- Git lets you save and load changes to a bunch of files at once. 
- It's a lot like saving a whole directory.
- The directory where Git is activated is called the "repository"
- Saving is called "commit"ing. 
- Repositories can be reverted to past commits.
- Repositories can be uploaded and synced to GitHub so multiple people can work on them.

## 2 - Add Git to the Path

Go to the directory where you installed Git and find the `cmd` directory. For example: 

`C:\Program Files\Git\cmd`

In there is a file (on Windows) called Git.exe. You need to add this to your "Path" so that you can access it on the command line from any directory on the system.

To add it to your path, open Window's environment variables manager. Press the windows key and type 'environment variables'

_environemtn variables screen crop_

Edit the Path Variable

_2-windows-env-var-2.png_

Press the New Button

_2-windows-edit-environment-variable.png_

Type `C:\Program Files\Git\cmd` (or whatever directory Git\cmd was installed to) and press Enter.

_2-last-git-added-to-path.png_

Congratulations, now Git is on the Path. Now you can access it by typing "git" in the command line from anywhere on the system.

## 3 - Configure Git by Adding User Name and Email

You will need to configure git by adding a user name and email. It doesn't have to be a real user name or email. This has nothing to do with your GitHub account. 

One Git is on the path, you can use it from the command line anywhere on your system. You can open the command line quickly in windows by pressing the Windows key and typing `cmd`.

_image of command prompt_
3-command-prompt.png

In the command line, run these two commands:

`git config --global user.name "My name"`

`git config --global user.email "email@email.com"`

_image of setting git config_
3-setting-git-config.png

You can see what user property is set by entering, for example, `git config user.name`.

## 4 - Fork the Repository on GitHub.

You need copy the repository you want to change from the account or organization that controls it to your own GitHub account first by "Forking" it. Then you will edit your Fork before Pull-requesting changes back into the original repo. You'll have the option to delete your fork afterwards.

Head over to [project ideas repository on GitHub](https://github.com/unhm-programming-team/project-ideas).

In the top right corner, right under your name, there is a button that's not obviously a button labeled "Fork". Click that button.

_4-fork-button.png_

You will be prompted "Where should we fork project-ideas"? Click your own name.

_4-where-should-we-fork.png_

GitHub will take a moment to process the forking.

_4-forking-and-waiting.png_

When the forking finishes, you will now have a "fork", a repository identical to `unhm-programming-club/project-ideas` located at `https://github.com/your_github_username/project-ideas`

## 5 - Clone your Fork

In the repository you just created, you will see a big green button labeled Code. Click that button.

_5-code-button-1.png_

A drop down menu will appear.

_5-code-drop-down-2.png_

Copy the URL listed there. There is a convenient copy button as well.

This is the URL that we will use to "clone" your fork onto your local system.

Create a new directory on the Desktop or wherever is clever. You can delete this later, since your changes will be synced to GitHub at the end anyway. It's likely you already know that a directory can be created by right clicking on the Desktop and selecting new > Folder.

_5-clone-new-folder.png_

Double click on your folder to open it in Windows Explorer

_5-new-empty-folder.png_

Now click in the address bar.

_5-new-folder-address-bar-click.png_

Now type `cmd` and press Enter

_5-cmd-in-address-bar.png_

The command prompt will open already set to the directory you created.

_5-new-cmd-prmpt.png_

In the command prompt type `git clone ` then press `Ctrl+V` to paste the git address you copied earlier from Github.com.

_5-git-clone-cmd-prompt.png_

You will be rewarded with a message describing the status of the cloning.

_5-git-clone-result.png_

In the directory you created on the desktop, there will be a new subdirectory, a clone of the repository on Github.com.

_5-git-clone-result-explorer.png_

## 6 - Make your changes

Next, edit the `project-ideas.md` file in the directory you just created.

_6-edit-a-file.png_

Add a project idea to one of the lists. The file is markdown. You can get an idea of how markdown works [here](https://markdownlivepreview.com/). 

If you're at a loss for an idea, just think of your favorite game, and suggest copying that game. Nobody said the project idea has to be something easy or even feasible! Just anything that interests you.

_6-example-edit.png_

Save the file.

Now go back to your command line. You can open it again from the explorer navigation bar or `cd` into the project-ideas directory.

To navigate into the directory you just created from the command line, use the "current working directory" command or "cd".

_6-cd-cmd.png_

## 7 - Add the changes to git

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


