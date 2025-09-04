import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface testProps {
  id: number;
  name: string;
}

export default function TestPage() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [contents, setContents] = useState<testProps[]>([]);

  useEffect(() => {
    axios
      .get("/api/home")
      .then(res => {
        setMessage(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => getTest());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/api/test", {
        name: name,
      })
      .then(res => {
        console.log("데이터 등록: ", res.data);
        setName("");
        getTest();
      })
      .catch(err => console.error(err));
  };

  const getTest = () => {
    axios
      .get("/api/test")
      .then(res => {
        console.log("데이터 조회: ", res.data);
        setContents(res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <p className="p-4">{message}</p>

      <div>
        <form onSubmit={handleSubmit} className="flex gap-2 ml-20">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-accent"
          />
          <Button type="submit">submit</Button>
        </form>
      </div>

      <div className="flex flex-col mt-8 gap-2">
        {contents.map(test => (
          <div key={test.id} className="flex justify-start gap-8">
            <p>id: {test.id}</p>
            <p>name: {test.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
