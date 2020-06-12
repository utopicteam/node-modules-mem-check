# modules-mem-check
This modules checks memory usage of installed modules in node_modules. 


## How it works
ModulesMemCheck use your package.json to load your dependencies and check how much memory each consume. 

## Install

```
npm install -g modules-mem-check
```

## Usage
Inside your project run:

```
modules-mem-check
```

It should return something like this:

```
dependency  version.0.1
   Resident Set Size:  270.336  KB
   Heap Total:         0  KB
   Heap Used:          187.92  KB
   External:           18.861  KB
   Array Buffers:      18.861  KB

   ...
```

NOTE: You should have a package.json and a node_modules.
