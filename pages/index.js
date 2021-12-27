import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.scss";
import initFirebase from "../firebase/initFirebase.js";
import firebase from "firebase";
import clsx from "clsx";

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [plants, setPlants] = useState([]);

  const changeOrder = () => {
    const newPlants = [...shuffleArray(plants)];
    setPlants(newPlants);
  };

  const handleChange = (id) => {
    const newPlants = [...plants];
    const plantIndex = newPlants.findIndex((item) => item.id === id);
    newPlants[plantIndex].showName = !newPlants[plantIndex].showName;
    setPlants(newPlants);
  };

  const resetCards = () => {
    const newPlants = plants.map((item) => ({ ...item, showName: false }));
    setPlants(newPlants);
  };

  const getPlants = async () => {
    const p = [];
    setLoading(true);
    const querySnapshot = await firebase.firestore().collection("plants").get();
    querySnapshot.forEach((doc) =>
      p.push({ id: doc.id, showName: false, ...doc.data() })
    );
    setPlants([...shuffleArray(p)]);
    setLoading(false);
  };

  useEffect(() => {
    initFirebase();
    getPlants();
  }, []);

  return (
    <div className={styles.homecontainer}>
      <div className={styles.sidebar}>
        <button
          onClick={resetCards}
          className={clsx("mb", "outline", "contained")}
        >
          Reset cards
        </button>
        <button className={clsx("outline", "contained")} onClick={changeOrder}>
          Change order
        </button>
      </div>
      <div className={styles.homecontent}>
        {loading && <div>Loading...</div>}
        {plants.map(({ id, name, img, showName, latinName }) => {
          return (
            <div className={styles.card} key={id}>
              {!showName && (
                <>
                  {img ? (
                    <img src={img} width="100px" height="100px" alt={name} />
                  ) : (
                    <img
                      src="/dummy.png"
                      width="100px"
                      height="100px"
                      alt={name}
                    />
                  )}
                </>
              )}
              <span className={styles.cardtext}>{showName && latinName}</span>
              <button onClick={() => handleChange(id)}>
                {showName ? "Show Img" : "Show name"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
