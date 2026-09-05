export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_id: string
          celebrated_at: string | null
          created_at: string
          earned_at: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          celebrated_at?: string | null
          created_at?: string
          earned_at?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          celebrated_at?: string | null
          created_at?: string
          earned_at?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_usage_limits: {
        Row: {
          endpoint: string
          id: string
          request_count: number
          updated_at: string
          user_id: string
          window_start: string
        }
        Insert: {
          endpoint: string
          id?: string
          request_count?: number
          updated_at?: string
          user_id: string
          window_start: string
        }
        Update: {
          endpoint?: string
          id?: string
          request_count?: number
          updated_at?: string
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      day_progress: {
        Row: {
          completed_at: string
          day: number
          final_seconds: number
          id: string
          local_day_key: string | null
          module_id: string
          practice_seconds: number
          recording_path: string | null
          recordings_count: number
          rep_durations: Json | null
          self_assessment: string | null
          sentence_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          day: number
          final_seconds?: number
          id?: string
          local_day_key?: string | null
          module_id?: string
          practice_seconds?: number
          recording_path?: string | null
          recordings_count?: number
          rep_durations?: Json | null
          self_assessment?: string | null
          sentence_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          day?: number
          final_seconds?: number
          id?: string
          local_day_key?: string | null
          module_id?: string
          practice_seconds?: number
          recording_path?: string | null
          recordings_count?: number
          rep_durations?: Json | null
          self_assessment?: string | null
          sentence_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      habit_practice_days: {
        Row: {
          created_at: string
          curriculum_day: number | null
          first_qualified_at: string
          id: string
          last_qualified_at: string
          module_id: string | null
          practice_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          curriculum_day?: number | null
          first_qualified_at?: string
          id?: string
          last_qualified_at?: string
          module_id?: string | null
          practice_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          curriculum_day?: number | null
          first_qualified_at?: string
          id?: string
          last_qualified_at?: string
          module_id?: string | null
          practice_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      practice_sessions: {
        Row: {
          attempted: string[]
          created_at: string
          day: number
          id: string
          module_id: string
          skipped: string[]
          stage: number
          started_at: string
          status: string
          sub_index: number
          updated_at: string
          user_id: string
          week: number | null
        }
        Insert: {
          attempted?: string[]
          created_at?: string
          day: number
          id?: string
          module_id: string
          skipped?: string[]
          stage?: number
          started_at?: string
          status?: string
          sub_index?: number
          updated_at?: string
          user_id: string
          week?: number | null
        }
        Update: {
          attempted?: string[]
          created_at?: string
          day?: number
          id?: string
          module_id?: string
          skipped?: string[]
          stage?: number
          started_at?: string
          status?: string
          sub_index?: number
          updated_at?: string
          user_id?: string
          week?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      progress_moments: {
        Row: {
          comparison_completed_at: string
          comparison_type: string
          created_at: string
          id: string
          module_id: string
          selected_reflections: string[]
          updated_at: string
          user_id: string
          week: number
        }
        Insert: {
          comparison_completed_at?: string
          comparison_type: string
          created_at?: string
          id?: string
          module_id: string
          selected_reflections?: string[]
          updated_at?: string
          user_id: string
          week?: number
        }
        Update: {
          comparison_completed_at?: string
          comparison_type?: string
          created_at?: string
          id?: string
          module_id?: string
          selected_reflections?: string[]
          updated_at?: string
          user_id?: string
          week?: number
        }
        Relationships: []
      }
      recordings: {
        Row: {
          audio_purged_at: string | null
          created_at: string
          day: number
          duration_seconds: number
          estimated_idea_count: number | null
          id: string
          is_final_rep: boolean
          mime_type: string | null
          module_id: string
          storage_path: string
          take_number: number
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_purged_at?: string | null
          created_at?: string
          day: number
          duration_seconds?: number
          estimated_idea_count?: number | null
          id?: string
          is_final_rep?: boolean
          mime_type?: string | null
          module_id: string
          storage_path: string
          take_number: number
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_purged_at?: string | null
          created_at?: string
          day?: number
          duration_seconds?: number
          estimated_idea_count?: number | null
          id?: string
          is_final_rep?: boolean
          mime_type?: string | null
          module_id?: string
          storage_path?: string
          take_number?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      test_ready_progress: {
        Row: {
          attempts: number
          completed_at: string
          completion_seconds: number
          created_at: string
          day: number
          id: string
          module_id: string
          response_seconds: number
          sprint_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number
          completed_at?: string
          completion_seconds?: number
          created_at?: string
          day: number
          id?: string
          module_id: string
          response_seconds?: number
          sprint_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number
          completed_at?: string
          completion_seconds?: number
          created_at?: string
          day?: number
          id?: string
          module_id?: string
          response_seconds?: number
          sprint_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          app_language: string
          created_at: string
          current_module_id: string | null
          initial_placement_module_id: string | null
          migrated_local_at: string | null
          onboarding_completed: boolean
          placement_change_count: number
          placement_changed_at: string | null
          placement_selected_at: string | null
          placement_source: string | null
          spanish_support: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          app_language?: string
          created_at?: string
          current_module_id?: string | null
          initial_placement_module_id?: string | null
          migrated_local_at?: string | null
          onboarding_completed?: boolean
          placement_change_count?: number
          placement_changed_at?: string | null
          placement_selected_at?: string | null
          placement_source?: string | null
          spanish_support?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          app_language?: string
          created_at?: string
          current_module_id?: string | null
          initial_placement_module_id?: string | null
          migrated_local_at?: string | null
          onboarding_completed?: boolean
          placement_change_count?: number
          placement_changed_at?: string | null
          placement_selected_at?: string | null
          placement_source?: string | null
          spanish_support?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verb_progress: {
        Row: {
          created_at: string
          discovered: boolean
          first_discovered_at: string | null
          id: string
          listen_count: number
          practice_count: number
          updated_at: string
          user_id: string
          verb_id: string
        }
        Insert: {
          created_at?: string
          discovered?: boolean
          first_discovered_at?: string | null
          id?: string
          listen_count?: number
          practice_count?: number
          updated_at?: string
          user_id: string
          verb_id: string
        }
        Update: {
          created_at?: string
          discovered?: boolean
          first_discovered_at?: string | null
          id?: string
          listen_count?: number
          practice_count?: number
          updated_at?: string
          user_id?: string
          verb_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      consume_ai_quota: {
        Args: {
          _endpoint: string
          _limit: number
          _user_id: string
          _window_seconds: number
        }
        Returns: {
          allowed: boolean
          request_count: number
          window_start: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
