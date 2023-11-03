    import NextAuth from "next-auth";    //importing next-auth
    import GoogleProvider from "next-auth/providers/google";  //allows to logged in using google acc
    import User from '@models/user';   //importing the user model 
    import { connectToDB } from '@utils/database';  //establishing connection to the db



    const handler = NextAuth({
        //setup the providers that will be used
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,     //getting the google id from the env file
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,  //getting the google client secret from the env file
            })
        ],

        callbacks:{
            async session({ session }){
                const sessionUser = await User.findOne({email: session.user.email});
                session.user.id = sessionUser._id.toString();
                return session;
            }, 
            async getServerSession({ session }){
                const sessionUser = await User.findOne({email: session.user.email});
                session.user.id = sessionUser._id.toString();
                return session;
            }, 
            async signIn({profile}){
                try {
                    await connectToDB();
        
                    //check if a user exists in the database if not, create a new user
                    const userExists = await User.findOne({email: profile.email});

                    if(!userExists){
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", " ").toLowerCase(),
                            image: profile.picture,
                        });
                    }
                    return true;
                
                } catch (error){
                    console.log(error);
                    return false;
                }
            },
        }
        
    })

    //export
    export  { handler as GET, handler as POST};