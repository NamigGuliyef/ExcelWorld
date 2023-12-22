import PageContainer from "@/components/PageContainer";
import { Link, useParams } from "react-router-dom";

import SinglePageSocial from "@/components/SinglePageSocial";
import { useContext, useEffect, useState } from "react";
import { getSingleResource } from "../../api/functions";
import { SnackBarContext } from "@/Context/Snackbar";
import StripePayment from "../../components/StripePayment";
import { getCookie } from "../../utils/setCokie";

const SingleShop = () => {
  const { shopId } = useParams();
  const [itemData, setItemData] = useState(null);
  const setNotify = useContext(SnackBarContext);

  const userToken = getCookie("token");
  const role = getCookie("role");

  const userLogin = userToken && role === "user";

  useEffect(() => {
    getSingleResource(shopId)
      .then(({ success, resource }) => {
        if (success) {
          const { createdAt, updatedAt, ...resData } = resource;

          setItemData({ ...resData });
        }
      })
      .catch((error) => {
        setNotify({ success: false, message: error.message });
      });
  }, []);

  const productDetails = { __html: itemData?.details };

  return (
    <PageContainer>
      <section className="single-shop-page">
        <div className="container">
          <div className="single-page-wrapper">
            <div className="single-page-content">
              <h1>{itemData?.name}</h1>

              <img
                src={`${import.meta.env.VITE_BASE_URL}/books/${
                  itemData?.photo
                }`}
                alt={itemData?.name}
              />

              <div
                className="product-details"
                dangerouslySetInnerHTML={productDetails}
              />

              <SinglePageSocial />
            </div>

            <div className="single-page-sidebar">
              <div className="single-sidebar-price">
                <p>
                  {itemData?.discount ? (
                    <span>{itemData?.discount} USD</span>
                  ) : (
                    ""
                  )}

                  <span>{itemData?.price} USD</span>
                </p>
              </div>

              {itemData && userLogin ? (
                <StripePayment data={itemData} userToken={userToken}>
                  <button />
                </StripePayment>
              ) : (
                <Link to="/signin">
                  <button>Sign in to buy</button>
                </Link>
              )}

              <div className="single-sidebar-description">
                <p>{itemData?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default SingleShop;
