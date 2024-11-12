import { Form } from "react-bootstrap"
import { useList } from "../../Hooks/useList";
import { ChangeEvent, FocusEvent, useState } from "react";

const ListNameSelector: React.FC = () => {
  const { list, setName } = useList();

  const [name, setLocalName] = useState<string | undefined>(list.name)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setName(name ?? "undefined")
  };
  return <Form.Control type="text" placeholder="name" value={name} onChange={handleInputChange} onBlur={handleBlur} />
}

export default ListNameSelector