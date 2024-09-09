import { atom } from "jotai";
import { IFormField } from "./formField.types";
import { initFormFields } from "./constants";

const extractTimeFromISOString = (isoString: string): string => {
  const match = isoString.match(/T(\d{2}:\d{2}:\d{2}(?:\.\d+)?)/);
  return match ? match[1] : '';
};

const updateFormField = (formFields: IFormField[], id: number, value: string): IFormField[] => {
  return formFields.map((formField) => ({
    ...formField,
    value: formField.id === id ? value : formField.value,
    created: formField.id === id ? extractTimeFromISOString(new Date().toISOString()) : formField.created,
  }));
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

const addFormField = (formFields: IFormField[], value: string, created: string): IFormField[] => {
  return [
    ...formFields,
    {
      id: Math.max(0, Math.max(...formFields.map(({ id }) => id))) + 1,
      created: extractTimeFromISOString(created),
      value: value,
      selected: false,
      hasError: false,
    },
  ];
};

export const newFormFieldAtom = atom<string>("");
export const formFieldsAtoms = atom<IFormField[]>(initFormFields);
export const addNewFormFieldAtom = atom(
  () => "",
  (get, set, { value, created }: { value: string, created: string }) => {
    set(formFieldsAtoms, addFormField(get(formFieldsAtoms), value, created));
    set(newFormFieldAtom, "");
  }
);

export const updateFormFieldAtom = atom(
  () => "",
  (get, set, { id, value }: { id: number; value: string }) => {
    set(formFieldsAtoms, updateFormField(get(formFieldsAtoms), id, value));
  }
);
export const deleteFormFieldAtom = atom(
  () => "",
  (get, set, { id }: { id: number }) => {
    set(formFieldsAtoms, removeFormField(get(formFieldsAtoms), id));
  }
);

export const toggleFormFieldAtom = atom(
  () => "",
  (get, set, { id }: { id: number }) => {
    set(formFieldsAtoms, toggleFormField(get(formFieldsAtoms), id));
  }
);
