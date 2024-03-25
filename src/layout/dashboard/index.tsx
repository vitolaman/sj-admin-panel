import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "components/shared/header";
import Sidebar from "components/shared/sidebar";
import Container from "layout/container";
import "react-datetime/css/react-datetime.css";

const DashboardLayout: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const [navbarActive, setNavbarActive] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setNavbarActive((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>{t("Seeds | Admin Portal")}</title>
      </Helmet>
      <div className="flex">
        <Sidebar active={navbarActive} toggleSidebar={toggleSidebar} />
        <Container className={`${navbarActive ? "w-[80%]" : "w-full"}`}>
          <Header
            className={`${navbarActive ? "w-[80%]" : "w-full"}`}
            toggleSidebar={toggleSidebar}
          />
          <Outlet />
        </Container>
      </div>
    </>
  );
};

export default DashboardLayout;
