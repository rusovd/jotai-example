import { useAtom } from "jotai";
import { newFormFieldAtom, addNewFormFieldAtom } from "../store/formField.atom";

export const Add = () => {
  const [formFieldItem, setFormFieldItem] = useAtom(newFormFieldAtom);
  const [, addNewItem] = useAtom(addNewFormFieldAtom);

  const handleAddNewItem = () => {
    if (formFieldItem.trim()) {
      addNewItem({ value: formFieldItem, created: new Date().toISOString() });
      setFormFieldItem("");
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      handleAddNewItem();
    }
  };

  return (
    <>
      <input
        onChange={(evt) => setFormFieldItem(evt.target.value)}
        onKeyDown={handleKeyDown}
        value={formFieldItem}
        placeholder="Add Field"
      />
      <button onClick={handleAddNewItem}>Add</button>
    </>
  );
};
