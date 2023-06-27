import { Select } from "antd";

export default function LeftSelect() {
  return (
    <Select
      style={{ width: "100%" }}
      size="large"
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: "jack",
          label: "Jack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
        {
          value: "tom",
          label: "Tom",
        },
      ]}
    />
  );
}
