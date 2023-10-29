import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"
import {db} from "../../..//Firebase";
import { collection,query,where,getDocs,addDoc } from 'firebase/firestore';
import changeStatus from '../../../functions/changeStatus';
var id = "";
var name = "";
var phonenumber = "";
var image = "";
const usersRef = collection(db, "users");

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async session(session, user) {
            try {
                const usersQuery = query(usersRef, where("email", "==", session.session.user.email));
                const querySnapshot = await getDocs(usersQuery);
                if (querySnapshot.docs.length === 0) {
                    const data = {
                        email: session.session.user.email,
                        name : session.session.user.name,
                        image : session.session.user.image,
                        status: "afk",
                        bet: 0
                    }
                    const docRef = await addDoc(usersRef, data);
                    id = docRef.id;
                    session.session.user.id = id;
                }else{
                    const userData = querySnapshot.docs[0].data();
                    const user = {
                    ...userData
                    };
                    id = querySnapshot.docs[0].id;
                    name = user.name;
                    phonenumber = user.phonenumber;
                    image = user.image;
                    session.session.user.id = id;
                    session.session.user.name = name;
                    session.session.user.phonenumber = phonenumber;
                    session.session.user.image = image;
                }
                session.session.user.status = "afk"
                session.session.user.bet = 0
            } catch (error) {
                console.log("Error:", error);
                throw new Error("Something went wrong!");
            }
          
          return session;
        },
      },
    secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg="
})