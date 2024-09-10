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
import { FlexRow, InputWithCondition, Wrapper } from "./style";

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
        <>
          <FlexRow key={item.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={item.selected}
                onClick={() => toggleFormFieldItem({ id: item.id })} 
              />
              <InputWithCondition
                type="text"
                value={item.value}
                hasError={item.hasError}
                onChange={(evt) =>
                  updateFormFieldItem({ id: item.id, value: evt.target.value })
                }
              />
              <button onClick={() => deleteFormFieldItem({ id: item.id })}>
                Delete
              </button>
              <div style={{ width: "150px", fontSize: '10px' }}>
                {item.created}{` ( ${item.condition} )`}
              </div>
            </div>
          </FlexRow>
        </>
      ))}
      <br />
      <Add />
    </Wrapper>
  );
};
