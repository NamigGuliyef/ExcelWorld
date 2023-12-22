import { useCallback, useContext, useEffect, useState } from "react";
import ShopCardWrapper from "./ShopCardWrapper";
import PageContainer from "@/components/PageContainer";
import { getAllResources } from "@/api/functions";
import { SnackBarContext } from "@/Context/Snackbar";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [templates, setTemplates] = useState([]);
  const setNotify = useContext(SnackBarContext);

  const getPageData = useCallback(async () => {
    // const API_KEY = "f51d8bb84ff74c93973aff3c3efbd827";
    // const BASE_URL = "https://openexchangerates.org/api/latest.json?app_id";
    // const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      // const currenncy = await fetch(`${BASE_URL}=${API_KEY}`, options);
      // const { rates } = await currenncy.json();

      const { success, allResources, message } = await getAllResources();

      if (success) {
        // const priceUpdatedData = allResources.map(
        //   ({ price, discount, ...rest }) => ({
        //     price: price * rates.AZN,
        //     discount: discount * rates.AZN,
        //     ...rest,
        //   })
        // );

        // console.log(priceUpdatedData);

        const book = allResources.filter((b) => b.category === "book");
        const template = allResources.filter((b) => b.category === "template");

        setBooks(book);
        setTemplates(template);
      } else {
        setNotify({ success, message });
      }
    } catch (error) {
      setNotify({ success: false, message: error.message });
    }
  }, []);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  return (
    <PageContainer>
      <ShopCardWrapper header="books" data={books} />

      <ShopCardWrapper header="templates" data={templates} />
    </PageContainer>
  );
};

export default Shop;
