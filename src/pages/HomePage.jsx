import { signInWithGoogle } from "../firebase-config"

export default function HomePage() {
    return (
        <section className="page">
            <h1>Home Page</h1>
            <p><button type="button" onClick={signInWithGoogle}>Login med Google</button></p>
        </section>
    );
}
