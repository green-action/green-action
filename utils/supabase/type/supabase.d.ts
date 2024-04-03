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
      bookmarks: {
        Row: {
          action_id: string | null;
          id: string;
          user_uid: string | null;
        };
        Insert: {
          action_id?: string | null;
          id?: string;
          user_uid?: string | null;
        };
        Update: {
          action_id?: string | null;
          id?: string;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_bookmarks_action_id_fkey";
            columns: ["action_id"];
            isOneToOne: false;
            referencedRelation: "individual_green_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_bookmarks_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      community_comments: {
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          post_id: string | null;
          user_uid: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          user_uid?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_community_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_community_comments_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      community_posts: {
        Row: {
          action_id: string | null;
          action_type: string | null;
          content: string | null;
          created_at: string;
          id: string;
          img_url: string | null;
          title: string | null;
          user_uid: string | null;
        };
        Insert: {
          action_id?: string | null;
          action_type?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          img_url?: string | null;
          title?: string | null;
          user_uid?: string | null;
        };
        Update: {
          action_id?: string | null;
          action_type?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          img_url?: string | null;
          title?: string | null;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_community_posts_action_id_fkey";
            columns: ["action_id"];
            isOneToOne: false;
            referencedRelation: "individual_green_actions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_community_posts_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      goods: {
        Row: {
          id: string;
          img_url: string;
          point: number;
          product_info: string;
          product_name: string;
        };
        Insert: {
          id?: string;
          img_url?: string | null;
          point?: number | null;
          product_info?: string | null;
          product_name?: string | null;
        };
        Update: {
          id?: string;
          img_url?: string | null;
          point?: number | null;
          product_info?: string | null;
          product_name?: string | null;
        };
        Relationships: [];
      };
      green_action_images: {
        Row: {
          action_id: string | null;
          id: string;
          img_url: string;
        };
        Insert: {
          action_id?: string | null;
          id?: string;
          img_url: string;
        };
        Update: {
          action_id?: string | null;
          id?: string;
          img_url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_green_action_image_action_id_fkey";
            columns: ["action_id"];
            isOneToOne: false;
            referencedRelation: "individual_green_actions";
            referencedColumns: ["id"];
          },
        ];
      };
      group_green_actions: {
        Row: {
          content: string | null;
          hosted_by: string | null;
          id: string;
          img_url: string | null;
          title: string | null;
        };
        Insert: {
          content?: string | null;
          hosted_by?: string | null;
          id?: string;
          img_url?: string | null;
          title?: string | null;
        };
        Update: {
          content?: string | null;
          hosted_by?: string | null;
          id?: string;
          img_url?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      individual_green_actions: {
        Row: {
          content: string | null;
          created_at: string;
          end_date: string | null;
          id: string;
          is_recruiting: boolean | null;
          kakao_link: string | null;
          location: string | null;
          recruit_number: number | null;
          start_date: string | null;
          title: string | null;
          user_uid: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_recruiting?: boolean | null;
          kakao_link?: string | null;
          location?: string | null;
          recruit_number?: number | null;
          start_date?: string | null;
          title?: string | null;
          user_uid?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          end_date?: string | null;
          id?: string;
          is_recruiting?: boolean | null;
          kakao_link?: string | null;
          location?: string | null;
          recruit_number?: number | null;
          start_date?: string | null;
          title?: string | null;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_individual_green_actions_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      likes: {
        Row: {
          id: string;
          post_id: string | null;
          user_uid: string | null;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          user_uid?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          user_uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "community_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_likes_user_uid_fkey";
            columns: ["user_uid"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          display_name: string | null;
          email: string | null;
          id: string;
          introduction: string | null;
          point: number;
          profile_img: string | null;
        };
        Insert: {
          display_name?: string | null;
          email?: string | null;
          id?: string;
          introduction?: string | null;
          point?: number;
          profile_img?: string | null;
        };
        Update: {
          display_name?: string | null;
          email?: string | null;
          id?: string;
          introduction?: string | null;
          point?: number;
          profile_img?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
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
