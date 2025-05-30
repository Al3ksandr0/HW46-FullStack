import { useSelector } from "react-redux";
import { Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router";

const { Header, Content } = Layout;

import "./App.scss";
import Auth from "./components/Auth";
import CoursesPage from "./components/courses/CoursesPage";
import StudentsPage from "./components/students/StudentsPage";
import Sider from "antd/es/layout/Sider";
import CoursePage from "./components/course/CoursePage";

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const user = useSelector((state) => state.currentUser);
  const navigate = useNavigate();

  const items = [
    {
      key: 'courses',
      label: "Courses",
    },
    {
      key: "students",
      label: "Students",
    },
  ];

  const handleMenuClick = ({ key }) => {
    console.log(key);
    navigate(`/${key}`);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>

      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          {user.isAuth && (
            <Menu
              onClick={handleMenuClick}
              // style={{ width: 256 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["courses"]}
              mode="inline"
              items={items}
            />
          )}
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {!user.isAuth && <Auth />}
            {user.isAuth && (
              <Routes>
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/students" element={<StudentsPage />} />
              </Routes>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
