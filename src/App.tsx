import { Layout, Space } from "antd";
import { Panel, PanelGroup } from "react-resizable-panels";
import styles from "./App.module.css";
import LeftSelect from "./components/LeftSelect";
import LeftTree from "./components/LeftTree";
import Logo from "./components/Logo";
import ResizeHandle from "./components/ResizeHandle";
import RightMarkdown from "./components/RightMarkdown";
import TopMenu from "./components/TopMenu";
const { Header, Content } = Layout;

function App() {
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
                <LeftSelect />
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

export default App;
