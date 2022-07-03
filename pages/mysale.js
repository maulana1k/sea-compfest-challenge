import { Container, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import AddSaleModal from "../components/modal/AddSale";

import StoreLayout from "../components/StoreLayout";
import useUser from "../context/useUser";

function MySale(props) {
  const user = useUser();
  const [items, setItems] = useState(null);
  const [sortby, setSortby] = useState("name");
  const [asc, setAsc] = useState(true);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    axios
      .get("/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [reload]);
  const compare = (a, b) => {
    return a[sortby] < b[sortby] ? (asc ? -1 : 1) : asc ? 1 : -1;
  };
  return (
    <StoreLayout sort={{ sortby, setSortby }} order={{ asc, setAsc }}>
      <Container maxW="" display={"flex"} flexWrap="wrap" gap={"6"} py="4">
        <AddSaleModal update={{ reload, setReload }} />
      </Container>
      <Container
        maxW=""
        display={"flex"}
        flexWrap="wrap"
        justifyContent={"center"}
        gap={"6"}
        py="4"
      >
        {!!items &&
          items
            .sort(compare)
            .map(
              (item) =>
                item.author == user && (
                  <ItemCard
                    mysale
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    src={item.image_url}
                    price={item.price}
                    timestamp={item.timestamp}
                    desc={item.description}
                  />
                )
            )}
      </Container>
    </StoreLayout>
  );
}
export default MySale;
export async function getServerSideProps(c) {
  try {
    const host = "http://" + c.req.headers.host;
    return {
      props: {
        host,
      },
    };
  } catch (err) {
    console.log("err:", err);
    return {
      props: {
        db: "not connected",
      },
    };
  }
}
