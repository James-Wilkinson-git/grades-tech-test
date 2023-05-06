import { useEffect, useState } from "react";

export type TResult = {
  uuid: string;
  course: string;
  student: string;
  grade: "A|B|C|D|E|F";
};

export default function Results() {
  const [results, setResults] = useState<TResult[]>();
  useEffect(() => {
    const localResults = localStorage.getItem("Results") || "[]";
    const parsedResults = JSON.parse(localResults);
    setResults(parsedResults);
  }, []);
  return (
    <div>
      {results?.map((result) => {
        return result.uuid;
      })}
    </div>
  );
}
