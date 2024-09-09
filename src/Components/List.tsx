import React from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils';
import type { IFormField } from "../store/formField.types";
import {
  formFieldsAtoms,
  updateFormFieldAtom,
  deleteFormFieldAtom,
  toggleFormFieldAtom,
} from "../store/formField.atom";
import { Add } from "./Add";
import { FlexRow, Wrapper } from "./style";

const userSettingsAtom = atomWithStorage<IFormField[]>("userFormFields", []);

export const List = () => {
  const [list] = useAtom(formFieldsAtoms);
  const [, updateFormFieldItem] = useAtom(updateFormFieldAtom);
  const [, deleteFormFieldItem] = useAtom(deleteFormFieldAtom);
  const [, toggleFormFieldItem] = useAtom(toggleFormFieldAtom);

  const [, setUserSettings] = useAtom(userSettingsAtom);

  React.useEffect(() => {
    setUserSettings(list);
  }, [list, setUserSettings]);

  return (
    <Wrapper>
      {list.map((item: IFormField) => (
        <FlexRow key={item.id}>
          <input
            type="checkbox"
            checked={item.selected}
            onClick={() => toggleFormFieldItem({ id: item.id })}
          />
          <input
            type="text"
            value={item.value}
            onChange={(evt) =>
              updateFormFieldItem({ id: item.id, value: evt.target.value })
            }
          />
          <sup style={{ fontSize: "10px", padding: "0 5px 0 5px" }}>
            {item.created}
          </sup>
          <button onClick={() => deleteFormFieldItem({ id: item.id })}>
            Delete
          </button>
        </FlexRow>
      ))}
      <Add />
    </Wrapper>
  );
};
