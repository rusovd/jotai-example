import { IFormField } from "./formField.types";
import { ICondition } from "./condition.types";

export const initFormFields: IFormField[] = [
  {
    "id": 1,
    "created": "22:01:00.111",
    "value": "1111",
    "selected": false,
    "condition": "required",
    "hasError": false,
  },
  {
    "id": 2,
    "created": "22:02:00.222",
    "value": "222",
    "selected": false,
    "condition": "isEven",
    "hasError": true,
  },
  {
    "id": 3,
    "created": "22:03:00.333",
    "value": "333",
    "selected": true,
    "condition": "maxLength3",
    "hasError": false,
  },
  {
    "id": 4,
    "created": "22:04:00.444",
    "value": "444",
    "selected": false,
    "hasError": false,
  },
  {
    "id": 5,
    "created": "22:05:00.555",
    "value": "555",
    "selected": true,
    "condition": "",
    "hasError": false,
  },
  {
    "id": 6,
    "created": "22:06:00.666",
    "value": "666",
    "selected": false,
    "hasError": false,
  },
  {
    "id": 7,
    "created": "22:07:00.777",
    "value": "777",
    "selected": true,
    "hasError": false,
  },
  {
    "id": 8,
    "created": "22:08:00.888",
    "value": "888",
    "selected": false,
    "hasError": false,
  }
]

export const initConditions: ICondition[] = [
  {
    name: "isEven",
    func: "(v) => v && v%2 != 0"
  },
  {
    name: "required",
    func: "(v) => v && !!v"
  },
  {
    name: "maxLength3",
    func: "(v) => v && v.length <= 3"
  }

]