export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      shifts: {
        Row: {
          id: string;
          shift_id: string;
          role: string;
          care_hub: string;
          date: string;
          start_time: string;
          end_time: string;
          break_duration: number;
          shift_type: string;
          hourly_rate: number;
          shift_bonus: number;
          preferred_worker_only: boolean;
          uniform_required: boolean;
          special_instructions: string | null;
          emergency_contact: string | null;
          qualifications: string[] | null;
          experience: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          shift_id?: string;
          role: string;
          care_hub: string;
          date: string;
          start_time: string;
          end_time: string;
          break_duration: number;
          shift_type: string;
          hourly_rate: number;
          shift_bonus?: number;
          preferred_worker_only?: boolean;
          uniform_required?: boolean;
          special_instructions?: string | null;
          emergency_contact?: string | null;
          qualifications?: string[] | null;
          experience?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          shift_id?: string;
          role?: string;
          care_hub?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          break_duration?: number;
          shift_type?: string;
          hourly_rate?: number;
          shift_bonus?: number;
          preferred_worker_only?: boolean;
          uniform_required?: boolean;
          special_instructions?: string | null;
          emergency_contact?: string | null;
          qualifications?: string[] | null;
          experience?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      careworker_reg: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone: string | null;
          role: string;
          updated_at: string | null;
          worker_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          phone?: string | null;
          role: string;
          updated_at?: string | null;
          worker_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          phone?: string | null;
          role?: string;
          updated_at?: string | null;
          worker_id?: string | null;
        };
        Relationships: [];
      };
      shift_bookings: {
        Row: {
          id: string
          status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled'
          created_at: string
          approved_at?: string
          // Add other columns as needed
        }
        Insert: {
          id?: string
          status?: string
          created_at?: string
          approved_at?: string
        }
        Update: {
          id?: string
          status?: string
          created_at?: string
          approved_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_bookings_shift_id_fkey"
            columns: ["shift_id"]
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_bookings_worker_id_fkey"
            columns: ["worker_id"]
            referencedRelation: "workers"
            referencedColumns: ["id"]
          }
        ]
      }
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_worker_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      split_full_name: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
