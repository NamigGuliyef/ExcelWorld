import PageContainer from "@/components/PageContainer";
import ResourcesWrapper from "./FreeResourcesWrapper";
import { useContext, useEffect, useState } from "react";
import { getUsefullLinks } from "../../api/functions";
import { SnackBarContext } from "../../Context/Snackbar";

const FreeResources = () => {
  const [links, setLinks] = useState([]);
  const setNotify = useContext(SnackBarContext);

  useEffect(() => {
    getUsefullLinks()
      .then(({ success, allUsefulLinks }) => {
        if (success) {
          setLinks(allUsefulLinks);
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  return (
    <PageContainer>
      <ResourcesWrapper header="Useful links" data={links} />;
    </PageContainer>
  );
};
export default FreeResources;
