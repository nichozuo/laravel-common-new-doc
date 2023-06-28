import { Space } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";

export default function LeftTree() {
  const [_, setSearchParams] = useSearchParams();
  const { snap } = useMyState();

  const [treeData, setTreeData] = useState<any[]>([]);

  // useEffect(() => {
  //   console.log("snap.session.type", snap.session.type);
  //   switch (snap.session.type) {
  //     case "api":
  //       setTreeData(snap.session.apiData as any[]);
  //       break;
  //     case "enum":
  //       setTreeData(snap.session.enumData as any[]);
  //       break;
  //     case "db":
  //       setTreeData(snap.session.dbData as any[]);
  //       break;
  //     case "doc":
  //       setTreeData(snap.session.docData as any[]);
  //       break;
  //   }
  // }, [snap.session.type]);

  useEffect(() => {
    console.log("LeftTree snap.session.type", snap.session.type);
    switch (snap.session.type) {
      case "api":
        setTreeData(snap.session.apiData as any[]);
        break;
      case "enum":
        setTreeData(snap.session.enumData as any[]);
        break;
      case "db":
        setTreeData(snap.session.dbData as any[]);
        break;
      case "doc":
        setTreeData(snap.session.docData as any[]);
        break;
    }
  }, [snap.session.type]);

  return (
    <>
      {/* <Select
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
        options={treeData}
      /> */}
      {/* {treeData.length > 0 ? ( */}
      <DirectoryTree
        autoExpandParent
        defaultExpandParent
        defaultExpandedKeys={[snap.session.key ?? ""]}
        defaultSelectedKeys={[snap.session.key ?? ""]}
        treeData={treeData}
        selectedKeys={[snap.session.key ?? ""]}
        showLine
        titleRender={(nodeData) => (
          <Space style={{ lineHeight: "22px" }}>
            <span style={{ fontSize: "14px" }}>{nodeData?.title ?? ""}</span>
            <span
              style={{
                fontSize: "11px",
                color: "#454950",
              }}
            >
              {nodeData?.intro ?? ""}
            </span>
          </Space>
        )}
        onSelect={(_, e) => {
          if (e.node.isLeaf) {
            var key = e.node.key as string;
            setSearchParams({
              type: snap.session.type ?? "api",
              key: key ?? "",
            });
          }
        }}
      />
      {/* ) : (
        <></>
      )} */}
    </>
  );
}
