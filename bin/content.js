const mdContent = `| key         | type         | description | etc  |
|-------------|--------------|-------------|-------------|
| basic?       | string  | Optional type        | name        |
| union          | number,string       | UnionType          | product_id |
| union2          | "name","age"       | UnionType          | product_id |
| tuple         | [number,string]       | TupleType        | age        |
| tuple2         | ["string",1,{}]       | TupleType        | age        |
| argsFunc    | (args:number,args2:string)=>void | function      | test       |`;

exports.mdContent = mdContent;
