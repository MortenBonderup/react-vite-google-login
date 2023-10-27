import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function ContactPage() {
    const [tekster, setTekster] = useState([]);
    const [uid, setUid] = useState("");

    useEffect(() => {
        async function fetchData() {
            const forespoergsel = query(collection(db, "tekst"), where("uid", "==", uid));
            const querySnapshot = await getDocs(forespoergsel);
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            console.log("useEffect");

            setTekster(docs);
        }
        const tempUid = sessionStorage.getItem("uid");
        setUid(tempUid);

        fetchData();

    }, [uid]);

    return (
        <section className="page" style={{ marginTop: "25px" }}>
            {tekster.map(tekst => (
                <p key={tekst.id}>
                    {tekst.tekst}
                    <br />--------------------------------------
                </p>
            ))}

        </section>
    );
}
