import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

export default function AdminPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async (user) => {
            if (user) {
                const uid = user.uid;
                const adminDoc = await getDoc(doc(db, "admins", uid));
                if (adminDoc.exists()) {
                    // Redirect to admin page if the user is an admin
                    navigate("/react-vite-google-login/admin");
                } else {
                    // Redirect to user page if not an admin
                    navigate("/react-vite-google-login/user");
                }
            } else {
                // Redirect to home page if not authenticated
                navigate("/react-vite-google-login/");
            }
        };

        onAuthStateChanged(auth, (user) => {
            checkAdmin(user);
        });
    }, [navigate]);


    async function logout() {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/react-vite-google-login/"); // Redirect to default page
        }).catch((error) => {
            // An error happened.
            alert("Error signing out: ", error);
        });
    }


    return (
        <div style={{ marginTop: "150px" }}>
            <h1>Admin Page</h1>
            {/* Admin content goes here */}
            <p><button type="button" onClick={logout}>Logout</button></p>

        </div>
    );
}

