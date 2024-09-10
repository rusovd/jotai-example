import { atom } from "jotai";
import { IFormField } from "./formField.types";
import { initFormFields } from "../assets/constants";
import { conditionsAtoms } from "./condition.atom";
import { createFunctionFromString, extractTimeFromISOString } from "../assets/utils";

const updateFormField = (
  formFields: IFormField[],
  id: number,
  value: string,
  hasError: boolean
): IFormField[] => {
  let found = false;

  const updatedFormFields = formFields.map(formField => {
    if (formField.id === id) {
      found = true;
      return {
        ...formField,
        value: value,
        created: extractTimeFromISOString(new Date().toISOString()),
        hasError: hasError
      };
    }
    return formField;
  });

  return found ? updatedFormFields : formFields;
};

const removeFormField = (formFields: IFormField[], id: number): IFormField[] => {
  return formFields.filter((formField) => formField.id !== id);
};

const toggleFormField = (formFields: IFormField[], id: number): IFormField[] => {
  return formFields.map((formField) => ({
    ...formField,
    selected: formField.id === id ? !formField.selected : formField.selected,
  }));
};

const addFormField = (formFields: IFormField[], value: string, created: string, condition?: string ): IFormField[] => {
  return [
    ...formFields,
    {
      id: Math.max(0, Math.max(...formFields.map(({ id }) => id))) + 1,
      created: extractTimeFromISOString(created),
      value: value,
      condition: condition || "required",
      selected: false,
      hasError: false,
    },
  ];
};

export const newFormFieldAtom = atom<string>("");
export const formFieldsAtoms = atom<IFormField[]>(initFormFields);
export const addNewFormFieldAtom = atom(
  null,
  (get, set, { value, created }: { value: string, created: string }) => {
    const formFields = get(formFieldsAtoms);

    set(formFieldsAtoms, addFormField(formFields, value, created));
    set(newFormFieldAtom, "");
  }
);

export const updateFormFieldAtom = atom(
  null,
  (get, set, { id, value }: { id: number; value: string }) => {
    const formFields = get(formFieldsAtoms);
    const conditions = get(conditionsAtoms);

    const updatedFormField = formFields.find((field) => field.id === id);

    let hasError = false;

    if (updatedFormField && updatedFormField.condition) {
      const condition = conditions.find(cond => cond.name === updatedFormField.condition);
      if (condition) {
        hasError = !createFunctionFromString(condition.func)(value);
      }
    }

    set(formFieldsAtoms, updateFormField(formFields, id, value, hasError));
  }
);

export const deleteFormFieldAtom = atom(
  null,
  (get, set, { id }: { id: number }) => {
    set(formFieldsAtoms, removeFormField(get(formFieldsAtoms), id));
  }
);

export const toggleFormFieldAtom = atom(
  null,
  (get, set, { id }: { id: number }) => {
    set(formFieldsAtoms, toggleFormField(get(formFieldsAtoms), id));
  }
);
