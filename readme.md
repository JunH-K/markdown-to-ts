# Markdown to typescript, tsx converter

[![npm](https://img.shields.io/npm/v/markdown-to-ts)](https://www.npmjs.com/package/markdown-to-ts)
[![Downloads](https://img.shields.io/npm/dm/markdown-to-ts.svg)](http://npm-stat.com/charts.html?package=markdown-to-ts)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FJunH-K%2Fmarkdown-to-ts&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

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
| key         | type         | description | etc  |
|-------------|--------------|-------------|-------------|
| name?       | string       | 이름        | name        |
| id          | number       | ID          | product_id |
| age         | number       | 나이        | age        |
| productName | string       | 상품명      | product_name |
| price       | number       | 가격        | price      |
| test        | string       | 테스트      | test       |
| argsFunc    | (args:number)=>void | 함수      | test       |
```


2. Reads the xxx.type.md file in the current path and creates the xxx.ts file.
```bash
md-cli type
```
* SampleType.ts
```typescript
type SampleType = {
  name?: string; //이름
  id: number; //ID
  age: number; //나이
  productName: string; //상품명
  price: number; //가격
  test: string; //테스트
  argsFunc: (args:number) => void; //테스트
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
  name?: string; //이름
  id: number; //ID
  age: number; //나이
  productName: string; //상품명
  price: number; //가격
  test: string; //테스트
  argsFunc: (args:number) => void; //테스트
  [key: string]: any;
};

function Sample(props: Props) {
  return <div>Sample Component</div>;
}

export default Sample;

```
