# Markdown to typescript, tsx converter

[![npm](https://img.shields.io/npm/v/markdown-to-ts)](https://www.npmjs.com/package/markdown-to-ts)
[![Downloads](https://img.shields.io/npm/dt/markdown-to-ts.svg)](http://npm-stat.com/charts.html?package=markdown-to-ts)

Create type,tsx based on the markdown table.



> Supported Node.js

Supports versions 10 and above

> Install

```bash
npm i -g markdown-to-ts
```

> Usage

1. If there is no xxx.type.md file in the current path, Sample.type.md is created.
```bash
md-cli type
```
* Sample.type.md

```md
| key      | type                             | description   |
|----------|----------------------------------|---------------|
| basic?   | string                           | Optional type |
| union    | number,string                    | UnionType     |
| union2   | "name","age"                     | UnionType     |
| tuple    | [number,string]                  | TupleType     |
| tuple2   | ["string",1,{}]                  | TupleType     |
| argsFunc | (args:number,args2:string)=>void | function      |

```


2. Reads the xxx.type.md file in the current path and creates the xxx.ts file.
```bash
md-cli type
```
* SampleType.ts
```typescript
type SampleType = {
    basic?: string; //Optional type
    union: number | string; //UnionType
    union2: 'name' | 'age'; //UnionType
    tuple: [number, string]; //TupleType
    tuple2: ['string', 1, {}]; //TupleType
    argsFunc: (args: number, args2: string) => void; //function
};
export default SampleType;

```

3. Reads the xxx.type.md file in the current path and creates the xxx.tsx file.
```bash
md-cli component
```

* Sample.tsx
```typescript
type Props = {
    basic?: string; //Optional type
    union: number | string; //UnionType
    union2: 'name' | 'age'; //UnionType
    tuple: [number, string]; //TupleType
    tuple2: ['string', 1, {}]; //TupleType
    argsFunc: (args: number, args2: string) => void; //function
    [key: string]: any;
};

function Sample(props: Props) {
    return <div>Sample Component</div>;
}

export default Sample;

```
