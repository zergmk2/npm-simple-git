/**
 * @param workingDirPath Option. Defaulting to the current directory.
 */
declare function simpleGit(workingDirPath?: string): simpleGit.Runner;

declare namespace simpleGit {
  interface HandlerFunction {
    (error: any, value: any): void;
  }
  interface Runner {
    /**
     * Adds one or more files to be under source control
     */
    add(fileA: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, fileC: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, fileC: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, fileC: string, fileD: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, handlerFn: HandlerFunction): Runner;
    add(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, handlerFn: HandlerFunction): Runner;
    add(...filesAndHandler: Array<string | HandlerFunction>): Runner;

    /**
     * Adds an anootated tag to the head of the current branch
     */
    addAnnotatedTag(tagName: string, tagMessage: string, handlerFn: HandlerFunction): Runner;

    /**
     * Add a local configuration property
     */
    addConfig(key: string, value: any, handlerFn?: HandlerFunction): Runner;

    /**
     * Adds a new named remote to be tracked as `name` at the path `repo`
     */
    addRemote(name: string, repo: string, handlerFn: HandlerFunction): Runner;

    /**
     * Adds a lightweight tag to the head of the current branch
     */
    addTag(name: string, handlerFn: HandlerFunction): Runner;

    /**
     * Gets a list of all branches.
     */
    branch(handlerFn?: (error: any, branchSummary: simpleGit.BranchSummary) => void): Runner;

    /**
     * Generates `cat-file` detail.
     * @param options should be an array of strings as supported arguments to the `cat-file` command
     */
    catFile(options: string[], handlerFn?: HandlerFunction): Runner;

    /**
     * Checks out the supplied tag, revision or branch.
     * @param checkoutWhat can be one or more strings to be used as parameters appended to the `git checkout` command.
     */
    checkout(checkoutWhat: string | string[], handlerFn: HandlerFunction): Runner;

    /**
     * Checks out a new branch from the supplied start point.
     */
    checkoutBranch(branchName: string, startPoint: any, handlerFn: HandlerFunction): Runner;

    /**
     * Checks out a new local branch
     */
    checkoutLocalBranch(branchName: string, handlerFn: HandlerFunction): Runner;

    /**
     * Convenicence method to pull then checkout the latest tag
     */
    checkoutLatestTag(handlerFn: HandlerFunction): Runner;

    /**
     * Clone a remote repo at `repoPath` to a local directory at `localPath` with an optional array of additional arguments to include between `git clone` and the trailing `repo local` arguments
     */
    clone(repoPath: string, localPath: string, options?: any, handlerFn?: HandlerFunction): Runner;

    /**
     * Commits changes in the current working directory with the supplied message where the message can be either a single string or array of strings to be passed as separate arguments (the git command line interface converts these to be separated by double line breaks)
     */
    commit(message: string, handlerFn: HandlerFunction): Runner;

    /**
     * Commits changes on the named files with the supplied message, when supplied, the optional options object can contain any other parameters to pass to the commit command, setting the value of the property to be a string will add `name=value` to the command string, setting any other type of value will result in just the key from the object being passed (ie: just `name`), an example of setting the author is below
     */
    commit(message: string, fileA: string, options: any, handlerFn: HandlerFunction): Runner;
    commit(message: string, fileA: string, fileB: string, options: any, handlerFn: HandlerFunction): Runner;
    commit(message: string, fileA: string, fileB: string, fileC: string, options: any, handlerFn: HandlerFunction): Runner;
    commit(message: string, fileA: string, fileB: string, fileC: string, fileD: string, options: any, handlerFn: HandlerFunction): Runner;
    commit(message: string, fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, options: any, handlerFn: HandlerFunction): Runner;
    commit(message: string, fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, options: any, handlerFn: HandlerFunction): Runner;

    /**
     * Sets the command to use to reference git, allows for using a git binary not available on the path environment variable
     */
    customBinary(gitPath: string): Runner;

    /**
     * Sets the current working directory for all commands after this step in the chain
     */
    cwd(workingDirectory: string): Runner;

    /**
     * Get the diff of the current repo compared to the last commit with a set of options supplied as a string
     */
    diff(options: any, handlerFn: HandlerFunction): Runner;

    /**
     * Get the diff for all file in the current repo compared to the last commit
     */
    diff(handlerFn: HandlerFunction): Runner;

    /**
     * Gets a summary of the diff for files in the repo, uses the git diff --stat format to calculate changes. Handler is called with a nullable error object and an instance of the DiffSummary
     */
    diffSummary(handlerFn: (error: any, summary: DiffSummary) => void): Runner;

    /**
     * Gets a summary of the diff for files in the repo, uses the git diff --stat format to calculate changes. Handler is called with a nullable error object and an instance of the DiffSummary
     * @param options in the call to `diff --stat options`
     */
    diffSummary(options: any, handlerFn: (error: any, summary: DiffSummary) => void): Runner;

    /**
     * update the local working copy database with changes from a remote repo
     */
    fetch(remote: string, branch: string, handlerFn: HandlerFunction): Runner;

    /**
     * update the local working copy database with changes from the default remote repo and branch
     */
    fetch(handlerFn: HandlerFunction): Runner;

    /**
     * initialize a repository, optional bare parameter makes intialized repository bare
     */
    init(bare: boolean, handlerFn: HandlerFunction): Runner;

    /**
     * list all tags
     */
    tags(handlerFn: HandlerFunction): Runner;

    /**
     * Show history.
     */
    log(handlerFn: HandlerFunction): Runner;
    /**
     * list commits between `options.from` and `options.to` tags or branch.
     * Additionally you can provide `options.file`, which is the path to a file in your repository.
     * Then only this file will be considered. For any other set of options, supply `options` as an array of strings to be appended to the git log command. To use a custom splitter in the log format, set `options.splitter` to be the string the log should be split on
     */
    log(options: string[] | {
      from?: string,
      to?: string
      file?: string
      splitter?: string
    }, handlerFn: HandlerFunction): Runner;

    /**
     * merge from one branch to another, when supplied the options should be an array of additional parameters to pass into the git merge command
     */
    mergeFromTo(from: string, to: string, options?: any, handlerFn?: HandlerFunction): Runner;

    /**
     * Clone and mirror the repo to local
     */
    mirror(repoPath: string, localPath: string, handlerFn: HandlerFunction): Runner;

    /**
     * Pulls all updates from the default tracked repo
     */
    pull(handlerFn: HandlerFunction): Runner;
    /**
     * pull all updates from the specified remote branch (eg 'origin'/'master')
     */
    pull(remote: string, branch: string, handlerFn: HandlerFunction): Runner;

    /**
     * Pulls from named remote with any necessary options
     */
    pull(remote: string, branch: string, options: any, handlerFn: HandlerFunction): Runner;

    /**
     * pushes to a named remote and named branch
     */
    push(remote: string, branch: string, handlerFn: HandlerFunction): Runner;

    /**
     * Pushes tags to a named remote
     */
    pushTags(remote: string, handlerFn: HandlerFunction): Runner;

    /**
     * Rebases the repo
     */
    rebase(handlerFn: HandlerFunction): Runner;
    /**
     * Rebases the repo, options should be supplied as an array of string parameters supported by the git rebase command, or an object of options
     */
    rebase(options: string[] | any, handlerFn: HandlerFunction): Runner;

    /**
     * Removes the named remote
     */
    removeRemote(name: string, handlerFn: HandlerFunction): Runner;

    /**
     * Removes any number of files from source control
     */
    rm(fileA: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, fileH: string, fileI: string, handlerFn: HandlerFunction): Runner;
    rm(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, fileH: string, fileI: string, fileJ: string, handlerFn: HandlerFunction): Runner;

    /**
     * removes files from source control but leaves them on disk
     */
    rmKeepLocal(fileA: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, fileH: string, fileI: string, handlerFn: HandlerFunction): Runner;
    rmKeepLocal(fileA: string, fileB: string, fileC: string, fileD: string, fileE: string, fileF: string, fileG: string, fileH: string, fileI: string, fileJ: string, handlerFn: HandlerFunction): Runner;

    /**
     * sets whether the console should be used for logging errors (defaults to true when the NODE_ENV contains the string `prod`)
     */
    silent(isSilent: boolean): Runner;

    /**
     * Retrieves the stash list, optional first argument can be an object specifying `options.splitter` to override the default value of `:`, alternatively options can be a set of arguments as supported by the `git stash list` command.
     */
    stashList(options?: any | { splitter?: string }, handlerFn?: HandlerFunction): Runner;

    /**
     * Run a git submodule command with on or more arguments passed in as an args array
     */
    subModule(args: string[], handlerFn?: HandlerFunction): Runner;

    /**
     * Adds a new sub module
     */
    submoduleAdd(repo: string, path: string, handlerFn?: HandlerFunction): Runner;

    /**
     * inits sub modules, args should be an array of string arguments to pass to the git submodule init command
     */
    submoduleInit(args?: string[], handlerFn?: HandlerFunction): Runner;

    /**
     * updates sub modules, args should be an array of string arguments to pass to the git submodule update command
     */
    submoduleUpdate(args?: string[], handlerFn?: HandlerFunction): Runner;

    /**
     * gets a list of the named remotes, when the verbose option is supplied as true, includes the URLs and purpose of each ref
     */
    getRemotes(handlerFn: HandlerFunction): Runner;
    getRemotes(verbose: boolean, handlerFn: HandlerFunction): Runner;

    /**
     * resets the repository, the optional first argument can either be an array of options supported by the git reset command or one of the string constants hard or soft, if omitted the reset will be a soft reset to head, handlerFn: (err)
     */
    reset(handlerFn: HandlerFunction): Runner;
    reset(resetMode: 'hard' | 'soft', handlerFn: HandlerFunction): Runner;

    /**
     * wraps git rev-parse. Primarily used to convert friendly commit references (ie branch names) to SHA1 hashes. Options should be an array of string options compatible with the git rev-parse
     */
    revprase(handlerFn: HandlerFunction): Runner;
    revprase(options: string[], handlerFn: HandlerFunction): Runner;

    /**
     * Gets the status of the current repo
     */
    status(handlerFn: HandlerFunction): Runner;

    /**
     * Show various types of objects, for example the file content at a certain commit. options is the single value string or array of string commands you want to run
     */
    show(handlerFn: HandlerFunction): Runner;
    show(options: string | string[], handlerFn: HandlerFunction): Runner;

    /**
     * checks if filepath excluded by .gitignore rules
     */
    checkIgnore(filepathA: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, filepathE: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, filepathE: string, filepathF: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, filepathE: string, filepathF: string, filepathG: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, filepathE: string, filepathF: string, filepathG: string, filepathH: string, filepathI: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(filepathA: string, filepathB: string, filepathC: string, filepathD: string, filepathE: string, filepathF: string, filepathG: string, filepathH: string, filepathI: string, filepathJ: string, handlerFn: HandlerFunction): Runner;
    checkIgnore(handlerFn: HandlerFunction): Runner;

    /**
     * lists remote repositories - there are so many optional arguments in the underlying git ls-remote call, just supply any you want to use as the optional args array of strings eg: git.listRemote(['--heads', '--tags'], console.log.bind(console))
     */
    listRemote(handlerFn: HandlerFunction): Runner;
    listRemote(args: string[], handlerFn: HandlerFunction): Runner;

    /**
     * attaches a handler that will be called with the name of the command being run and the stdout and stderr readable streams created by the child process running that command
     */
    outputHandler(handlerFn: Function): Runner;

    /**
     * Calls a simple function in the current step
     */
    then(handlerFn: HandlerFunction): Runner;
  }

  class BranchSummary {
    static parse(commit: string): BranchSummary;
    push(current: string, detached: boolean, name: string, commit: string, label: string): void;
  }

  class DiffSummary {
    static parse(text: string): DiffSummary;
    /**
     * Number of lines added
     */
    insertions: number;
    /**
     * Number of lines deleted
     */
    deletions: number;
    files: string[];
  }
}

export = simpleGit;
