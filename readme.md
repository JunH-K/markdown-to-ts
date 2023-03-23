# Markdown Converts

Create type,tsx based on the markdown table.

> Install

```bash
npm i -g markdown-to-ts
```

> Usage

1. create sample markdown.
```bash
md-cli type
```
* Sample.type.md

```md
| key         | type         | description | back_field  |
|-------------|--------------|-------------|-------------|
| name?       | string       | 이름        | name        |
| id          | number       | ID          | product_id |
| age         | number       | 나이        | age        |
| productName | string       | 상품명      | product_name |
| price       | number       | 가격        | price      |
| test        | string       | 테스트      | test       |
| argsFunc    | (args:number)=>void | 테스트      | test       |
```


2. markdown to type.
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

3. markdown to tsx
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