import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

export default function AboutPage() {

    const [tekst, setTekst] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const email = sessionStorage.getItem("email");
        setEmail(email);
    }, []);

    async function opretVare(e) {
        e.preventDefault();

        const nytekst = {
            email: email,
            tekst: tekst
        }

        try {
            const tekstRef = await addDoc(collection(db, "tekst"), nytekst);
            console.log("Tekst tilføjet med ID: ", tekstRef.id);
        } catch (e) {
            console.error("FEJL - Kunne ikke tilføje vare: ", e);
        }
    }


    return (
        <section className="page">
            <h1>Gem information</h1>

            <form onSubmit={opretVare}>
                <textarea value={tekst} onChange={e => setTekst(e.target.value)}></textarea>
                <button>Gem</button>
            </form>
        </section>
    );
}
