
// export interface IField {
//   basicValidation?: any; // used at condition algo
//   blockDataId: string;
//   callConditionValidator?: any;
//   comparingValueForInnerInput?: string;
//   componentName: TComponent;
//   condition: { [index: string]: IFieldCondition };
//   conditionData?: any;
//   conditionMessage?: any;
//   disabled?: boolean;
//   disableTextType?: boolean;
//   gridStyle: TGridStyle;
//   helperLinkText?: string; // ?
//   helperLinkUrl?: string; // ?
//   helperText?: string;
//   helpers?: IHelper; // ?
//   indexOfCondition?: {
//     condition: number;
//     mainCondition: number;
//   };
//   label: string;
//   labelForInnerInput?: string;
//   linkData?: string;
//   name?: string;
//   oldSource?: string;
//   options?: IOption[] | string[] | undefined;
//   parse?: (value: string | number) => void;
//   required?: boolean;
//   source: string;
//   sourceForInnerInput?: string;
//   valueLength?: number;
//   valueRange?: number | null[];
// }

export interface FormField {
  id: number;
  created: string;
  value: string;
  selected: boolean;
}