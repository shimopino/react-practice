import React, { useEffect, useState } from "react";

export const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("hi");
  }, []);

  return (
    <div>
      <h1>React Server Components example</h1>
      {children}
    </div>
  );
};
