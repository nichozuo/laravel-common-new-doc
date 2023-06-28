import { Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { useSearchParams } from "react-router-dom";
import styles from "./Home.module.css";
import LeftTree from "./components/LeftTree";
import Logo from "./components/Logo";
import ResizeHandle from "./components/ResizeHandle";
import RightMarkdown from "./components/RightMarkdown";
import TopMenu from "./components/TopMenu";
import { stateActions } from "./states";

export default function Home() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type") || "api";
    const key = searchParams.get("key") || "";
    console.log("useEffect", type, key);
    stateActions.setType(type);
    stateActions.setKey(key);
  }, [searchParams]);

  return (
    <Layout>
      <Header className={styles.Header}>
        <Logo />
        <span className={styles.HeaderTitle}>开发文档中心</span>
        <TopMenu />
      </Header>
      <Content>
        <PanelGroup autoSaveId="_devDocs" direction="horizontal">
          <Panel defaultSize={20} collapsible={true}>
            <div className={styles.PanelContent}>
              <Space direction="vertical" style={{ width: "100%" }} size={8}>
                <LeftTree />
              </Space>
            </div>
          </Panel>
          <ResizeHandle />
          <Panel className={styles.Panel} collapsible={true}>
            <div className={styles.PanelContent}>
              <div className={styles.WhiteContent}>
                <RightMarkdown />
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </Content>
    </Layout>
  );
}
