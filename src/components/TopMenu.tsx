import {
  ApiOutlined,
  BarsOutlined,
  DatabaseOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

export default function TopMenu() {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      items={[
        { key: "接口", label: "接口", icon: <ApiOutlined /> },
        { key: "枚举", label: "枚举", icon: <BarsOutlined /> },
        {
          key: "数据字典",
          label: "数据字典",
          icon: <DatabaseOutlined />,
        },
        {
          key: "开发规范",
          label: "开发规范",
          icon: <ExceptionOutlined />,
        },
      ]}
    />
  );
}
