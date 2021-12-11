# translation of the run.sh
[CmdletBinding()]
param (
    [Parameter()]
    [switch] $Help,
    [Parameter()]
    [switch] $Js = $false,
    [Parameter()]
    [switch] $Prof = $false, # $profile builtin automatic variable
    [Parameter()]
    [int] $MinTime = 10,
    [Parameter()]
    [int] $Samples = 10,
    [Parameter()]
    [string] $Processor = '/opt/v8/tools/linux-tick-processor', # hum..
    [Parameter()]
    [switch] $Verb = $false, # $Verbose builtin script param
    [Parameter(ValueFromRemainingArguments)]
    [string[]] $Commits
)

$DIR = $PSScriptRoot
$REMOTE = "$DIR\.." # Clone local copy to get access to HEAD
$DEST = "$DIR\bench-pico8parse"
$GIT_FLAGS = "--git-dir=$DEST\.git --work-tree=$DEST\"

# Variables
$D8 = Get-Command d8 2> $null                                                 # hum..
if ($?) { $Processor = (Get-Item "$((Get-Item $D8.Path).Directory)\..\..\tools\linux-tick-processor").FullName }

$name = $MyInvocation.InvocationName
function Write-Usage() {
    Write-Host "$name [COMMIT]...

Benchmark pico8parse at the the specified commit stages.
While running the profiling tool you have to make sure your specified
tick-processor matches the V8-version used in the running node-version.

Examples:
  $name -Js HEAD~1 HEAD
  $name -Js -Samples 1000 HEAD
  $name -Verb -Prof d2f038

Options:
  -Js            Benchmark js scripts
  -Prof          Profile pico8parse.js with d8
  -MinTime       Specify the min time. Defaults to 10 (node specific)
  -Samples       Specify the samples. Defaults to 10
  -Processor     Specify the path to the tick-processor. Defaults to
                 $Processor
  -Verb          Display verbose messages
  -Help          Display this help and exit
"
}

# Helpers

function Write-Out($m) { Write-Host "$m" }
function Write-Err($m) { Write-Out "\033[1;31m✖\033[0m  $m"; }
function Write-Success($m) { if ($Verbose) { Write-Out " \033[1;32m✔\033[0m  $m" } }
function Write-Log($m) { if ($Verbose) { Write-Out "$m" } }
function Die($m) { Write-Err "$m"; exit $true }
function Request-Confirm($m) {
    $REPLY = Read-Host "$m [y/n] "
    'yes','y' -icontains $REPLY
}

function Invoke-Git($com, $arg) {
    Write-Log "Running git $GIT_FLAGS $@"
    git $GIT_FLAGS $com $arg > $null 2>&1
}

function Run-NodeBenchmark($file, $commit) {
  Write-Host "Commit ${commit}:"
  node $REMOTE\scripts\benchmark -v --pico8parse="$file" --samples="$Samples" --minTime="$MinTime" 'benchmarks/lib/ParseLua.lua'
  Write-Host ''
}


# Profile pico8parse together with D8.
function Profile-Commit($commit) {
    $local:output = ".\logs\$commit"
    $local:benchmark = '.\scripts\benchmark .\benchmarks\lib\ParseLua.lua'

    # This relies on the commit having the required files.
    if (-not (Test-Path .\scripts\benchmark)) { Die 'The commit is outdated for profiling.' }
    if (-not (Test-Path .\benchmarks\lib\ParseLua.lua)) { Die 'The commit is outdated for profiling.' }
    if (-not (Test-Path $Processor)) { Die "tick-processor not found at $Processor" }

    if (Test-Path $local:output) {
        Remove-Item -Recurse -Force $local:output
        Write-Success "Deleted old: $local:output"
    }
    New-Item $local:output -ItemType Directory
    Write-Success "Created log directory: $local:output"

    node --prof $local:benchmark > $null

    & $Processor > $local:output\ticks
    Write-Success "Created $local:output\ticks ($((Get-Item $local:output\ticks).Length) bytes)"

    Move-Item v8.log $local:output\v8.log
    Write-Success "Created $local:output\v8.log ($((Get-Item $local:output\v8.log).Length) bytes)"

    foreach ($fn in @('inlining', 'bailout', 'gc')) {
        node --trace_$fn --code_comments $local:benchmark > $local:output\$fn
        Write-Success "Created $local:output\$fn ($((Get-Item $local:output\$fn).Length) bytes)"
    }
}

# Main benchmark loop
function Benchmark($rev) {
    $local:commit = "$(git rev-parse $rev)".Substring(0, 6)

    Invoke-Git checkout $local:commit
    if (-not $?) { Write-Err "Could not checkout $commit" }
    else {
        Write-Success "Checked out $commit"

        if ($Js) {
            Write-Log "Benchmarking commit $commit"
            Run-NodeBenchmark "$DEST\index" "$commit"
            #if (-not $?) { Die "Benchmark failed" }
        }

        if ($Prof) {
            Profile-Commit $commit
        }
    }
}

if ($Commits) {
    # Clone a copy where we can benchmark
    if (-not (Test-Path $DEST\.git)) { git clone $REMOTE $DEST > $null 2>&1 }
    foreach ($commit in $commits) {
      Benchmark $commit
    }
    # Clean up
    Remove-Item -Recurse -Force $DEST
} else {
    Write-Usage
}
