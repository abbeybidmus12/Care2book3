import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

type CareHub = {
  id: string;
  care_home_name: string;
  cqc_number: string;
  business_type: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  county: string;
  postcode: string;
};

type SessionContextType = {
  session: any;
  careHub: CareHub | null;
  loading: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  careHub: null,
  loading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [careHub, setCareHub] = useState<CareHub | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.email) {
        fetchCareHub(session.user.email);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.email) {
        fetchCareHub(session.user.email);
      } else {
        setCareHub(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCareHub = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from("carehub_reg")
        .select("*")
        .eq("email", email)
        .single();

      if (error) throw error;
      setCareHub(data);
    } catch (error) {
      console.error("Error fetching care hub:", error);
      setCareHub(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionContext.Provider value={{ session, careHub, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return { user: context };
};
