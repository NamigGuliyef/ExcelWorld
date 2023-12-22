import PageContainer from "@/components/PageContainer";
import HomeOne from "../../components/Home/HomeOne";
import LearnExcel from "../../components/Home/LearnExcel";
import Past from "../../components/Home/Past";
import ExcelTemplates from "../../components/Home/ExcelTemplates";
import GetInTouch from "../../components/GetInTouch/GetInTouch";

const index = () => {
  return (
    <PageContainer>
      <HomeOne />
      <LearnExcel />
      <Past />
      <ExcelTemplates />
      <GetInTouch />
    </PageContainer>
  );
};

export default index;
