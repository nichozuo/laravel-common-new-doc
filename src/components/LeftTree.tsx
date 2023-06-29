import { Space } from "antd";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSetState } from "react-use";
import { useMyState } from "../states";

type Node = {
  key: string;
  title: string;
  intro?: string;
  isLeaf?: boolean;
  children?: Node[];
};

export default function LeftTree() {
  const [, setSearchParams] = useSearchParams();
  const { snap } = useMyState();
  const [state, setState] = useSetState<{
    api: Node[];
    enum: Node[];
    db: Node[];
    doc: Node[];
    treeData: Node[] | undefined;
  }>({
    api: [],
    enum: [],
    db: [],
    doc: [],
    treeData: undefined,
  });

  const setApiData = (openapi: any) => {
    // set api tree
    const apis: any[] = [];

    Object.entries(openapi.paths).forEach(([key, value]: any) => {
      const method = Object.keys(value as any)[0];
      const a = value[method];
      const folder = a?.tags[0].split("/");
      const item: Node = {
        key: key, //a?.tags[0] + "@" + a?.summary,
        title: a?.summary,
        intro: a?.description,
        isLeaf: true,
      };
      const folders: string[] = [];
      const folderTemp: string[] = [];
      folder.forEach((f: string) => {
        folderTemp.push(f);
        folders.push(folderTemp.join("/"));
      });
      apis.push([...folders, item]);
    });
    // console.log(apis);

    // 创建根节点
    const root: Node = {
      key: "root",
      title: "root",
      children: [],
    };

    // 遍历数组
    for (let i = 0; i < apis.length; i++) {
      const currentArray = apis[i];
      let currentNode: Node = root;

      // 遍历当前数组
      for (let j = 0; j < currentArray.length; j++) {
        const value = currentArray[j];
        const valueIsString = typeof value === "string";

        // 检查当前节点是否已存在
        const existingNode = currentNode?.children?.find(
          (node: Node) => node.key === value
        );

        if (existingNode) {
          // 如果节点已存在，将当前节点更新为已存在的子节点
          currentNode = existingNode;
        } else {
          // 如果节点不存在，创建新节点并添加到当前节点的子节点列表中
          const newNode: any = valueIsString
            ? {
                key: value,
                title: value,
                children: [],
              }
            : value;
          currentNode?.children?.push(newNode);
          currentNode = newNode;
        }
      }
    }
    // console.log("root.children", root.children);
    return root.children;
  };

  const setEnumData = () => {
    return [{ key: "Enums", title: "所有Enum", isLeaf: true }];
  };

  const setDbData = (openapi: any) => {
    const schemas = openapi.components.schemas;
    const dbData: Node[] = [];
    for (const [key, value] of Object.entries(schemas)) {
      dbData.push({
        key: key,
        title: key,
        intro: (value as any)?.description || "",
        isLeaf: true,
      });
    }
    return dbData;
  };

  const setDocData = () => {
    return [{ key: "doc", title: "文档", isLeaf: true }];
  };

  useEffect(() => {
    console.log("LeftTree::useEffect");
    const openapi = snap.session.openapi;
    setState({
      api: setApiData(openapi),
      enum: setEnumData(),
      db: setDbData(openapi),
      doc: setDocData(),
    });
  }, []);

  useEffect(() => {
    console.log("LeftTree::useEffect::snap.session.type", snap.session.type);
    const type = snap.session.type;
    switch (type) {
      case "api":
        setState({ treeData: state.api });
        break;
      case "enum":
        setState({ treeData: state.enum });
        break;
      case "db":
        setState({ treeData: state.db });
        break;
      case "doc":
        setState({ treeData: state.doc });
        break;
    }
  }, [snap.session.type, state.api, state.db, state.doc, state.enum]);

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
      {state.treeData ? (
        <DirectoryTree
          autoExpandParent
          defaultExpandParent
          defaultExpandedKeys={[snap.session.key]}
          defaultSelectedKeys={[snap.session.key]}
          treeData={state.treeData}
          selectedKeys={[snap.session.key]}
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
          onSelect={(_, e: any) => {
            if (e.node.isLeaf) {
              const key = e.node.key as string;
              setSearchParams({
                type: snap.session.type ?? "api",
                key: key ?? "",
              });
            }
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
