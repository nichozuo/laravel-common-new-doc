import { Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Panel, PanelGroup } from "react-resizable-panels";
import styles from "./Home.module.css";
import LeftTree from "./components/LeftTree";
import Logo from "./components/Logo";
import ResizeHandle from "./components/ResizeHandle";
import RightMarkdown from "./components/RightMarkdown";
import TopMenu from "./components/TopMenu";

export default function Home() {
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
