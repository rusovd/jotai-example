import { atom } from "jotai";
import { FormField } from "./formField.types";
import { initData } from "./constants";

const extractTimeFromISOString = (isoString: string): string => {
  const match = isoString.match(/T(\d{2}:\d{2}:\d{2}(?:\.\d+)?)/);
  return match ? match[1] : '';
};

const updateFormField = (formFields: FormField[], id: number, value: string): FormField[] => {
  return formFields.map((formField) => ({
    ...formField,
    value: formField.id === id ? value : formField.value,
    created: formField.id === id ? extractTimeFromISOString(new Date().toISOString()) : formField.created,
  }));
};

const removeFormField = (formFields: FormField[], id: number): FormField[] => {
  return formFields.filter((formField) => formField.id !== id);
};

const toggleFormField = (formFields: FormField[], id: number): FormField[] => {
  return formFields.map((formField) => ({
    ...formField,
    selected: formField.id === id ? !formField.selected : formField.selected,
  }));
};

const addFormField = (formFields: FormField[], value: string, created: string): FormField[] => {
  return [
    ...formFields,
    {
      id: Math.max(0, Math.max(...formFields.map(({ id }) => id))) + 1,
      created: extractTimeFromISOString(created),
      value: value,
      selected: false,
    },
  ];
};

export const newFormFieldAtom = atom<string>("");
export const formFieldsAtoms = atom<FormField[]>(initData);
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
