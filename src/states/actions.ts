import { state } from "./index";

export const stateActions = {
  setApiData: (openapi: any) => {
    // set api tree
    var apis: any[] = [];

    Object.entries(openapi.paths).forEach(([, value]: any) => {
      var method = Object.keys(value as any)[0];
      var a = value[method];
      var folder = a?.tags[0].split("/");
      var item = {
        key: a?.tags[0] + "@" + a?.summary,
        title: a?.summary,
        intro: a?.description,
        isLeaf: true,
      };
      var folders: string[] = [];
      var folderTemp: string[] = [];
      folder.forEach((f: string) => {
        folderTemp.push(f);
        folders.push(folderTemp.join("/"));
      });
      apis.push([...folders, item]);
    });
    // console.log(apis);

    // 创建根节点
    let root: any = {
      key: "root",
      title: "root",
      children: [],
    };

    // 遍历数组
    for (let i = 0; i < apis.length; i++) {
      let currentArray = apis[i];
      let currentNode = root;

      // 遍历当前数组
      for (let j = 0; j < currentArray.length; j++) {
        let value = currentArray[j];
        let valueIsString = typeof value === "string";

        // 检查当前节点是否已存在
        let existingNode = currentNode.children.find(
          (node: any) => node.key === value
        );

        if (existingNode) {
          // 如果节点已存在，将当前节点更新为已存在的子节点
          currentNode = existingNode;
        } else {
          // 如果节点不存在，创建新节点并添加到当前节点的子节点列表中
          let newNode: any = valueIsString
            ? {
                key: value,
                title: value,
                children: [],
              }
            : value;
          currentNode.children.push(newNode);
          currentNode = newNode;
        }
      }
    }

    // 打印树形结构
    // console.log(root.children);
    state.session.apiData = root.children;
  },
  setEnumData: () => {
    state.session.enumData = [
      { key: "Enums", title: "所有Enum", isLeaf: true },
    ];
  },
  setDbData: (openapi: any) => {
    const schemas = openapi.components.schemas;
    let dbData: any[] = [];
    for (let [key, value] of Object.entries(schemas)) {
      dbData.push({
        key: key,
        title: key,
        intro: value?.description || "",
        isLeaf: true,
      });
    }
    state.session.dbData = dbData;
  },
  setDocData: () => {
    state.session.docData = [{ key: "doc", title: "文档", isLeaf: true }];
  },
  setOpenApi: (openapi: any) => {
    state.session.openapi = openapi;
    stateActions.setApiData(openapi);
    stateActions.setEnumData();
    stateActions.setDbData(openapi);
    stateActions.setDocData();
  },
  setType: (type: string) => {
    state.session.type = type;
  },
  setKey: (key: string) => {
    state.session.key = key;
  },
};
