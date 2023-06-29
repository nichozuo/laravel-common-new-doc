import {
  ApiOutlined,
  BarsOutlined,
  DatabaseOutlined,
  ExceptionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSearchParams } from "react-router-dom";
import { useMyState } from "../states";

export default function TopMenu() {
  const [, setSearchParams] = useSearchParams();
  const { snap } = useMyState();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[snap.session.type as string]}
      onSelect={(e) => {
        setSearchParams({ type: e.key });
      }}
      items={[
        { key: "api", label: "接口", icon: <ApiOutlined /> },
        { key: "enum", label: "枚举", icon: <BarsOutlined /> },
        {
          key: "db",
          label: "数据字典",
          icon: <DatabaseOutlined />,
        },
        {
          key: "doc",
          label: "开发规范",
          icon: <ExceptionOutlined />,
        },
      ]}
    />
  );
}
