import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import StoreLayout from "../components/StoreLayout";
import useUser from "../context/useUser";
import { getDb } from "../db/mongoose";
import axios from "axios";
export default function Home(props) {
  const user = useUser();
  const [items, setItems] = useState(null);
  const [sortby, setSortby] = useState("name");
  const [asc, setAsc] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get(props.host + "/api/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.log(err));
  }, [reload]);
  const compare = (a, b) => {
    return a[sortby] < b[sortby] ? (asc ? -1 : 1) : asc ? 1 : -1;
  };
  return (
    <StoreLayout sort={{ sortby, setSortby }} order={{ asc, setAsc }}>
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
                item.author != user && (
                  <ItemCard
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    src={item.image_url}
                    price={item.price}
                    timestamp={item.timestamp}
                    desc={item.description}
                    update={{ reload, setReload }}
                  />
                )
            )}
      </Container>
    </StoreLayout>
  );
}

export async function getServerSideProps(c) {
  try {
    const db = await getDb();
    let host;
    if (process.env.NODE_ENV === "development") {
      host = "http://" + c.req.headers.host``;
    } else if (process.env.NODE_ENV === "production") {
      host = process.env.HOST;
    }
    return {
      props: {
        host,
      },
    };
  } catch (err) {
    console.log("err:", err);
    // return {
    //   props: {
    //     db: "not connected",
    //   },
    // };
  }
}
