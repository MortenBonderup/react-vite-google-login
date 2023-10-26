import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function ContactPage() {
    const [tekster, setTekster] = useState([]);
    const [uid, setUid] = useState("");

    useEffect(() => {
        async function fetchData() {
            onSnapshot(collection(db, "tekst"), data => {
                const docs = [];
                data.forEach((doc) => {
                    docs.push({ id: doc.id, ...doc.data() });
                });
                console.log("useEffect");

                setTekster(docs);
            });
        }
        fetchData();

        const tempUid = sessionStorage.getItem("uid");
        setUid(tempUid);

    }, []);

    // Her opretter jeg en personlig tekstliste som jeg viser til brugeren. Teksten vises kun hvis den tilhørende uid er lig med uid på den bruger som er logget på.
    const personligeTekster = tekster.filter(tekst => tekst.uid === uid);

    return (
        <section className="page" style={{ marginTop: "25px" }}>
            {personligeTekster.map(tekst => (
                <p key={tekst.id}>
                    {tekst.tekst}
                    <br />--------------------------------------
                </p>
            ))}

        </section>
    );
}
