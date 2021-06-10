Thank you for your interest in contributing to our project! Here is a quick guidence on how you can proceed.

## Setup

First let's get setup to do the work

1. Login to your GitHub account. If you don't yet have an account then [join GitHub](https://github.com/join).
2. Setup your Git Environment, below listed are some common tools
    - Git on the command line
    - [VS Code](https://code.visualstudio.com/ 'Visual Studio Code website')
    - [GitHub Desktop app](https://desktop.github.com/)
Now that you are all setup let's get on with the business of contributing to the project!

## Build

 [main page](https://github.com/cse110-w21-group21/cse110-w21-group21)
- Step 1: Clone the repository to your local machine.
    - If you are working with the git command line, copy and paste the command `git clone https://github.com/cse110-w21-group21/cse110-w21-group21.git`
- Step 2: Create a new branch
    - Once the repo has been cloned and you have it open it is time to create a new branch.
    - A branch is a way to keep your changes separate from the main part of the project.
    - If you are working with git command line, use the command `git checkout -b "your-branch-name"` to create and switch to your new branch.
- Step 3: Apply your changes
    - Start editing any of the files in the source folder and make your change.
- Step 4: Commit your changes
    - After making your changes, type `git add .` then `git commit -m "commit-message"` to record your changes.
- Step 5: Push your changes to GitHub
    - After pushing your changes, it will trigger the CI/CD Pipeline and run GitHub actions. Checks will be run automatically, if all checks pass a pull request will be made.
- Step 6: Merge Pull Request
    - Your pull request should be manually reviewed and merged by a developer

## Deploy

Once your pull request is made, your changes should automatically show at our GitHub Pages [here](https://cse110-w21-group21.github.io/cse110-w21-group21/source/index.html).
