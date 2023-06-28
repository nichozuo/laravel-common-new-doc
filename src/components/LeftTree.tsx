import { Select } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { useMyState } from "../states";

export default function LeftTree({ type }: any) {
  const { snap } = useMyState();

  return (
    <>
      <Select
        style={{ width: "100%" }}
        size="large"
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        filterOption={(input, option: any) =>
          (option?.key ?? "").toLowerCase().includes(input.toLowerCase())
        }
        fieldNames={{
          label: "key",
          value: "key",
        }}
        // options={snap.session.openapi.paths}
      />
      <DirectoryTree
        autoExpandParent
        // treeData={treeData}
        fieldNames={{
          title: "title",
          key: "key",
          children: "children",
        }}
      />
    </>
  );
}
