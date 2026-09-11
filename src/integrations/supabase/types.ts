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
      ai_coach_usage: {
        Row: {
          created_at: string
          period_key: string
          period_type: string
          updated_at: string
          used: number
          user_id: string
        }
        Insert: {
          created_at?: string
          period_key: string
          period_type: string
          updated_at?: string
          used?: number
          user_id: string
        }
        Update: {
          created_at?: string
          period_key?: string
          period_type?: string
          updated_at?: string
          used?: number
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
      bug_reports: {
        Row: {
          area: string
          context: Json
          created_at: string
          email: string | null
          expected: string | null
          id: string
          message: string
          screenshot_path: string | null
          status: Database["public"]["Enums"]["bug_report_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          area?: string
          context?: Json
          created_at?: string
          email?: string | null
          expected?: string | null
          id?: string
          message: string
          screenshot_path?: string | null
          status?: Database["public"]["Enums"]["bug_report_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          area?: string
          context?: Json
          created_at?: string
          email?: string | null
          expected?: string | null
          id?: string
          message?: string
          screenshot_path?: string | null
          status?: Database["public"]["Enums"]["bug_report_status"]
          updated_at?: string
          user_id?: string | null
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
      final_audio_coach_feedback: {
        Row: {
          answered_task: string | null
          audio_sha256: string
          better_version: string | null
          coach_version: string
          correction_needed: boolean | null
          corrections: Json | null
          created_at: string
          day: number
          estimated_idea_count: number | null
          fluency_upgrade: Json | null
          id: string
          module_id: string
          next_step_en: string | null
          next_step_es: string | null
          organization: string | null
          practice_phrase: string | null
          rubric_sha256: string
          said: string | null
          source_turn_number: number | null
          status: string
          strength_en: string | null
          strength_es: string | null
          take_number: number
          target_language: string | null
          task_completed: boolean | null
          transcript_word_count: number | null
          updated_at: string
          user_id: string
          why_en: string | null
          why_es: string | null
        }
        Insert: {
          answered_task?: string | null
          audio_sha256: string
          better_version?: string | null
          coach_version: string
          correction_needed?: boolean | null
          corrections?: Json | null
          created_at?: string
          day: number
          estimated_idea_count?: number | null
          fluency_upgrade?: Json | null
          id?: string
          module_id: string
          next_step_en?: string | null
          next_step_es?: string | null
          organization?: string | null
          practice_phrase?: string | null
          rubric_sha256: string
          said?: string | null
          source_turn_number?: number | null
          status: string
          strength_en?: string | null
          strength_es?: string | null
          take_number: number
          target_language?: string | null
          task_completed?: boolean | null
          transcript_word_count?: number | null
          updated_at?: string
          user_id: string
          why_en?: string | null
          why_es?: string | null
        }
        Update: {
          answered_task?: string | null
          audio_sha256?: string
          better_version?: string | null
          coach_version?: string
          correction_needed?: boolean | null
          corrections?: Json | null
          created_at?: string
          day?: number
          estimated_idea_count?: number | null
          fluency_upgrade?: Json | null
          id?: string
          module_id?: string
          next_step_en?: string | null
          next_step_es?: string | null
          organization?: string | null
          practice_phrase?: string | null
          rubric_sha256?: string
          said?: string | null
          source_turn_number?: number | null
          status?: string
          strength_en?: string | null
          strength_es?: string | null
          take_number?: number
          target_language?: string | null
          task_completed?: boolean | null
          transcript_word_count?: number | null
          updated_at?: string
          user_id?: string
          why_en?: string | null
          why_es?: string | null
        }
        Relationships: []
      }
      final_audio_coach_retakes: {
        Row: {
          audio_sha256: string | null
          created_at: string
          day: number
          feedback_id: string
          id: string
          idea_count: number | null
          module_id: string
          result: Json | null
          status: string
          transcript_word_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          audio_sha256?: string | null
          created_at?: string
          day: number
          feedback_id: string
          id?: string
          idea_count?: number | null
          module_id: string
          result?: Json | null
          status: string
          transcript_word_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          audio_sha256?: string | null
          created_at?: string
          day?: number
          feedback_id?: string
          id?: string
          idea_count?: number | null
          module_id?: string
          result?: Json | null
          status?: string
          transcript_word_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "final_audio_coach_retakes_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: true
            referencedRelation: "final_audio_coach_feedback"
            referencedColumns: ["id"]
          },
        ]
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
      interview_attempts: {
        Row: {
          completed_at: string | null
          created_at: string
          first_recording_at: string | null
          id: string
          local_day_key: string
          simulator: string
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          first_recording_at?: string | null
          id?: string
          local_day_key: string
          simulator: string
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          first_recording_at?: string | null
          id?: string
          local_day_key?: string
          simulator?: string
          started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      practice_attempts: {
        Row: {
          completed_at: string | null
          created_at: string
          day: number
          first_recording_at: string | null
          id: string
          is_first_completion: boolean
          local_day_key: string
          module_id: string
          recording_path: string | null
          sentence_count: number | null
          speaking_seconds: number
          started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          day: number
          first_recording_at?: string | null
          id?: string
          is_first_completion?: boolean
          local_day_key: string
          module_id: string
          recording_path?: string | null
          sentence_count?: number | null
          speaking_seconds?: number
          started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          day?: number
          first_recording_at?: string | null
          id?: string
          is_first_completion?: boolean
          local_day_key?: string
          module_id?: string
          recording_path?: string | null
          sentence_count?: number | null
          speaking_seconds?: number
          started_at?: string
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
          source_turn_number: number | null
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
          source_turn_number?: number | null
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
          source_turn_number?: number | null
          storage_path?: string
          take_number?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      review_progress: {
        Row: {
          completed_count: number
          created_at: string
          id: string
          last_completed_at: string | null
          last_idea_count: number | null
          last_speaking_seconds: number
          practice_number: number
          review_module_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_count?: number
          created_at?: string
          id?: string
          last_completed_at?: string | null
          last_idea_count?: number | null
          last_speaking_seconds?: number
          practice_number: number
          review_module_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_count?: number
          created_at?: string
          id?: string
          last_completed_at?: string | null
          last_idea_count?: number | null
          last_speaking_seconds?: number
          practice_number?: number
          review_module_id?: string
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
      tts_generation_locks: {
        Row: {
          clip_key: string
          created_at: string
          locked_until: string
          owner_token: string
          updated_at: string
        }
        Insert: {
          clip_key: string
          created_at?: string
          locked_until: string
          owner_token: string
          updated_at?: string
        }
        Update: {
          clip_key?: string
          created_at?: string
          locked_until?: string
          owner_token?: string
          updated_at?: string
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
      acquire_tts_lock: {
        Args: { _clip_key: string; _lease_seconds: number; _owner: string }
        Returns: boolean
      }
      admin_cost_center: { Args: never; Returns: Json }
      admin_engagement_metrics: { Args: never; Returns: Json }
      consume_ai_coach_quota: {
        Args: { _user_id: string }
        Returns: {
          allowed: boolean
          blocked: string
          daily_limit: number
          daily_used: number
          day_reset_at: string
          month_reset_at: string
          monthly_limit: number
          monthly_used: number
          unlimited: boolean
        }[]
      }
      consume_ai_quota: {
        Args: {
          _endpoint: string
          _limit: number
          _user_id: string
          _window_seconds: number
        }
        Returns: {
          allowed: boolean
          used_count: number
          window_started: string
        }[]
      }
      get_ai_coach_quota: {
        Args: { _user_id: string }
        Returns: {
          allowed: boolean
          blocked: string
          daily_limit: number
          daily_used: number
          day_reset_at: string
          month_reset_at: string
          monthly_limit: number
          monthly_used: number
          unlimited: boolean
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_unlimited_test_user: { Args: { _user_id: string }; Returns: boolean }
      release_tts_lock: {
        Args: { _clip_key: string; _owner: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      bug_report_status: "new" | "reviewed" | "resolved"
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
      bug_report_status: ["new", "reviewed", "resolved"],
    },
  },
} as const
