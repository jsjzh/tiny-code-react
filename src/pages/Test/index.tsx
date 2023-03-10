import React, { useCallback } from "react";

import PageWrapper from "@/components/PageWrapper";
import { useTestStore } from "@/store";

interface IProps {}

const Test: React.FC<IProps> = (props) => {
  const testStore = useTestStore((state) => state);

  const num = useTestStore(useCallback((state) => state.num, []));

  return (
    <PageWrapper>
      <div>
        <div>{num}</div>
        <div>{testStore.num}</div>
        <div>
          <button onClick={() => testStore.update(-1)}>-1</button>
          <button onClick={() => testStore.update(1)}>+1</button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Test;
