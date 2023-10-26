import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function ContactPage() {
    const [tekster, setTekster] = useState([]);
    const [email, setEmail] = useState("");

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

        const tempEmail = sessionStorage.getItem("email");
        setEmail(tempEmail);

    }, []);

    // Jeg opretter en personlig tekstliste som jeg viser til brugeren.
    const personligeTekster = tekster.filter(tekst => tekst.email === email);
    
    return (
        <section className="page" style={{ marginTop: "25px" }}>
            {personligeTekster.map(tekst => (
                <p key={tekst.id}>
                    {tekst.tekst}
                    <hr />
                </p>
            ))}

        </section>
    );
}
