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
      ai_call_log: {
        Row: {
          audio_seconds: number | null
          billed_audio_seconds: number | null
          characters: number | null
          created_at: string
          day: number | null
          endpoint: string
          error_code: string | null
          est_cost_usd: number
          id: string
          input_tokens: number | null
          latency_ms: number | null
          model: string | null
          module_id: string | null
          ok: boolean
          output_tokens: number | null
          provider: string
          user_id: string
        }
        Insert: {
          audio_seconds?: number | null
          billed_audio_seconds?: number | null
          characters?: number | null
          created_at?: string
          day?: number | null
          endpoint: string
          error_code?: string | null
          est_cost_usd?: number
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          model?: string | null
          module_id?: string | null
          ok: boolean
          output_tokens?: number | null
          provider: string
          user_id: string
        }
        Update: {
          audio_seconds?: number | null
          billed_audio_seconds?: number | null
          characters?: number | null
          created_at?: string
          day?: number | null
          endpoint?: string
          error_code?: string | null
          est_cost_usd?: number
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          model?: string | null
          module_id?: string | null
          ok?: boolean
          output_tokens?: number | null
          provider?: string
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
      ai_daily_rollup: {
        Row: {
          audio_seconds: number
          billed_audio_seconds: number
          cache_hits: number
          calls: number
          characters: number
          day: string
          denials: number
          endpoint: string
          est_cost_usd: number
          failures: number
          input_tokens: number
          model: string
          output_tokens: number
          updated_at: string
        }
        Insert: {
          audio_seconds?: number
          billed_audio_seconds?: number
          cache_hits?: number
          calls?: number
          characters?: number
          day: string
          denials?: number
          endpoint: string
          est_cost_usd?: number
          failures?: number
          input_tokens?: number
          model?: string
          output_tokens?: number
          updated_at?: string
        }
        Update: {
          audio_seconds?: number
          billed_audio_seconds?: number
          cache_hits?: number
          calls?: number
          characters?: number
          day?: string
          denials?: number
          endpoint?: string
          est_cost_usd?: number
          failures?: number
          input_tokens?: number
          model?: string
          output_tokens?: number
          updated_at?: string
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
      alert_thresholds: {
        Row: {
          critical: number
          key: string
          label: string
          sort_order: number
          unit: string
          updated_at: string
          warn: number
        }
        Insert: {
          critical: number
          key: string
          label: string
          sort_order?: number
          unit: string
          updated_at?: string
          warn: number
        }
        Update: {
          critical?: number
          key?: string
          label?: string
          sort_order?: number
          unit?: string
          updated_at?: string
          warn?: number
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          billing_enabled: boolean
          id: string
          limits_enabled: boolean
          pro_multiplier: number
          tts_allowlist_enforce: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          billing_enabled?: boolean
          id?: string
          limits_enabled?: boolean
          pro_multiplier?: number
          tts_allowlist_enforce?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          billing_enabled?: boolean
          id?: string
          limits_enabled?: boolean
          pro_multiplier?: number
          tts_allowlist_enforce?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      avatar_reports: {
        Row: {
          created_at: string
          id: string
          owner_id: string
          reason: string | null
          reporter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          owner_id: string
          reason?: string | null
          reporter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string
          reason?: string | null
          reporter_id?: string
          status?: string
          updated_at?: string
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
          created_at: string
          day: number
          final_seconds: number
          id: string
          latest_purged_at: string | null
          latest_recorded_at: string | null
          local_day_key: string | null
          module_id: string
          practice_seconds: number
          recording_path: string | null
          recording_purged_at: string | null
          recordings_count: number
          rep_durations: Json | null
          self_assessment: string | null
          sentence_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          day: number
          final_seconds?: number
          id?: string
          latest_purged_at?: string | null
          latest_recorded_at?: string | null
          local_day_key?: string | null
          module_id?: string
          practice_seconds?: number
          recording_path?: string | null
          recording_purged_at?: string | null
          recordings_count?: number
          rep_durations?: Json | null
          self_assessment?: string | null
          sentence_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          day?: number
          final_seconds?: number
          id?: string
          latest_purged_at?: string | null
          latest_recorded_at?: string | null
          local_day_key?: string | null
          module_id?: string
          practice_seconds?: number
          recording_path?: string | null
          recording_purged_at?: string | null
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
      grammar_quiz_attempts: {
        Row: {
          answers: Json
          completed_at: string
          correct: number
          created_at: string
          day: number
          id: string
          module_id: string
          passed: boolean
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          answers?: Json
          completed_at?: string
          correct?: number
          created_at?: string
          day: number
          id?: string
          module_id: string
          passed?: boolean
          total?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          answers?: Json
          completed_at?: string
          correct?: number
          created_at?: string
          day?: number
          id?: string
          module_id?: string
          passed?: boolean
          total?: number
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
      job_runs: {
        Row: {
          created_at: string
          deleted_files: number
          detail: Json | null
          error: string | null
          finished_at: string | null
          id: string
          job_name: string
          marked_rows: number
          ok: boolean
          started_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_files?: number
          detail?: Json | null
          error?: string | null
          finished_at?: string | null
          id?: string
          job_name: string
          marked_rows?: number
          ok?: boolean
          started_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_files?: number
          detail?: Json | null
          error?: string | null
          finished_at?: string | null
          id?: string
          job_name?: string
          marked_rows?: number
          ok?: boolean
          started_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_tokens: {
        Row: {
          created_at: string
          name: string
          token: string
        }
        Insert: {
          created_at?: string
          name: string
          token?: string
        }
        Update: {
          created_at?: string
          name?: string
          token?: string
        }
        Relationships: []
      }
      league_competitions: {
        Row: {
          closed: boolean
          created_at: string
          curriculum_week: number
          id: string
          module_id: string
          updated_at: string
          week_end: string
          week_start: string
        }
        Insert: {
          closed?: boolean
          created_at?: string
          curriculum_week: number
          id?: string
          module_id: string
          updated_at?: string
          week_end: string
          week_start: string
        }
        Update: {
          closed?: boolean
          created_at?: string
          curriculum_week?: number
          id?: string
          module_id?: string
          updated_at?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      league_memberships: {
        Row: {
          competition_id: string
          created_at: string
          curriculum_week: number
          hidden: boolean
          id: string
          module_id: string
          points: number
          updated_at: string
          user_id: string
          week_start: string
        }
        Insert: {
          competition_id: string
          created_at?: string
          curriculum_week: number
          hidden?: boolean
          id?: string
          module_id: string
          points?: number
          updated_at?: string
          user_id: string
          week_start: string
        }
        Update: {
          competition_id?: string
          created_at?: string
          curriculum_week?: number
          hidden?: boolean
          id?: string
          module_id?: string
          points?: number
          updated_at?: string
          user_id?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_memberships_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "league_competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      league_participation_overrides: {
        Row: {
          created_at: string
          participates: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          participates?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          participates?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      league_pilot_cohorts: {
        Row: {
          created_at: string
          curriculum_week: number
          enabled: boolean
          module_id: string
        }
        Insert: {
          created_at?: string
          curriculum_week: number
          enabled?: boolean
          module_id: string
        }
        Update: {
          created_at?: string
          curriculum_week?: number
          enabled?: boolean
          module_id?: string
        }
        Relationships: []
      }
      league_rewards: {
        Row: {
          activity_key: string
          activity_type: string
          awarded_at: string
          competition_id: string
          completed_at: string
          created_at: string
          day: number
          id: string
          module_id: string
          points: number
          user_id: string
        }
        Insert: {
          activity_key: string
          activity_type: string
          awarded_at?: string
          competition_id: string
          completed_at: string
          created_at?: string
          day: number
          id?: string
          module_id: string
          points: number
          user_id: string
        }
        Update: {
          activity_key?: string
          activity_type?: string
          awarded_at?: string
          competition_id?: string
          completed_at?: string
          created_at?: string
          day?: number
          id?: string
          module_id?: string
          points?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "league_rewards_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "league_competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      league_settings: {
        Row: {
          created_at: string
          id: string
          launched_at: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          launched_at?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          launched_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      league_story_slots: {
        Row: {
          created_at: string
          day: number
          episode_id: string
          min_scene_index: number
          module_id: string
        }
        Insert: {
          created_at?: string
          day: number
          episode_id: string
          min_scene_index: number
          module_id: string
        }
        Update: {
          created_at?: string
          day?: number
          episode_id?: string
          min_scene_index?: number
          module_id?: string
        }
        Relationships: []
      }
      live_coach_sessions: {
        Row: {
          created_at: string
          id: string
          local_day: string
          seconds: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          local_day: string
          seconds?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          local_day?: string
          seconds?: number
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
          avatar_id: string | null
          avatar_photo_path: string | null
          avatar_prompt_seen_at: string | null
          avatar_reject_reason: string | null
          avatar_reviewed_at: string | null
          avatar_status: string
          avatar_upload_day: string | null
          avatar_uploads_today: number
          created_at: string
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          avatar_id?: string | null
          avatar_photo_path?: string | null
          avatar_prompt_seen_at?: string | null
          avatar_reject_reason?: string | null
          avatar_reviewed_at?: string | null
          avatar_status?: string
          avatar_upload_day?: string | null
          avatar_uploads_today?: number
          created_at?: string
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          avatar_id?: string | null
          avatar_photo_path?: string | null
          avatar_prompt_seen_at?: string | null
          avatar_reject_reason?: string | null
          avatar_reviewed_at?: string | null
          avatar_status?: string
          avatar_upload_day?: string | null
          avatar_uploads_today?: number
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
      section_limits: {
        Row: {
          created_at: string
          enabled: boolean
          free_limit: number
          free_monthly_limit: number | null
          label: string
          section_key: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          free_limit: number
          free_monthly_limit?: number | null
          label: string
          section_key: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          free_limit?: number
          free_monthly_limit?: number | null
          label?: string
          section_key?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      settings_audit_log: {
        Row: {
          changed_by: string | null
          changed_by_email: string | null
          created_at: string
          field: string
          id: string
          new_value: string | null
          old_value: string | null
          scope: string
        }
        Insert: {
          changed_by?: string | null
          changed_by_email?: string | null
          created_at?: string
          field: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          scope: string
        }
        Update: {
          changed_by?: string | null
          changed_by_email?: string | null
          created_at?: string
          field?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          scope?: string
        }
        Relationships: []
      }
      story_episode_views: {
        Row: {
          completed_at: string | null
          created_at: string
          episode_id: string
          episode_number: number | null
          first_opened_at: string
          id: string
          last_opened_at: string
          max_scene_index: number
          scenes_reached: number
          season: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          episode_id: string
          episode_number?: number | null
          first_opened_at?: string
          id?: string
          last_opened_at?: string
          max_scene_index?: number
          scenes_reached?: number
          season?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          episode_id?: string
          episode_number?: number | null
          first_opened_at?: string
          id?: string
          last_opened_at?: string
          max_scene_index?: number
          scenes_reached?: number
          season?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stripe_events: {
        Row: {
          id: string
          processed_at: string
          type: string
        }
        Insert: {
          id: string
          processed_at?: string
          type: string
        }
        Update: {
          id?: string
          processed_at?: string
          type?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          email: string
          id: string
          price_id: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscribed: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email: string
          id?: string
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string
          id?: string
          price_id?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subscription_payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          hosted_invoice_url: string | null
          id: string
          invoice_pdf: string | null
          paid_at: string | null
          period_end: string | null
          period_start: string | null
          status: string
          stripe_invoice_id: string
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf?: string | null
          paid_at?: string | null
          period_end?: string | null
          period_start?: string | null
          status: string
          stripe_invoice_id: string
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf?: string | null
          paid_at?: string | null
          period_end?: string | null
          period_start?: string | null
          status?: string
          stripe_invoice_id?: string
          stripe_subscription_id?: string | null
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
      tts_generation_log: {
        Row: {
          characters: number
          clip_key: string
          created_at: string
          enforced: boolean
          id: string
          in_allowlist: boolean
          text_preview: string | null
          user_id: string
        }
        Insert: {
          characters: number
          clip_key: string
          created_at?: string
          enforced: boolean
          id?: string
          in_allowlist: boolean
          text_preview?: string | null
          user_id: string
        }
        Update: {
          characters?: number
          clip_key?: string
          created_at?: string
          enforced?: boolean
          id?: string
          in_allowlist?: boolean
          text_preview?: string | null
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
          start_week: number
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
          start_week?: number
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
          start_week?: number
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
      admin_daily_activity: {
        Args: { _from: string; _to: string }
        Returns: Json
      }
      admin_engagement_metrics: { Args: never; Returns: Json }
      admin_health_snapshot: { Args: never; Returns: Json }
      admin_story_metrics: { Args: never; Returns: Json }
      apply_admin_settings: {
        Args: {
          _admin_email: string
          _admin_id: string
          _billing_enabled: boolean
          _limits_enabled: boolean
          _pro_multiplier: number
          _sections: Json
        }
        Returns: undefined
      }
      bump_ai_rollup: {
        Args: {
          _audio_seconds: number
          _cache_hits: number
          _calls: number
          _characters: number
          _denials: number
          _endpoint: string
          _est_cost_usd: number
          _failures: number
          _input_tokens: number
          _model: string
          _output_tokens: number
        }
        Returns: undefined
      }
      coach_check_day: {
        Args: { _day_key: string; _retention_days?: number }
        Returns: Json
      }
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
      get_daily_limit: {
        Args: { p_section_key: string; p_user_id: string }
        Returns: number
      }
      get_monthly_limit: {
        Args: { p_section_key: string; p_user_id: string }
        Returns: number
      }
      get_section_usage: {
        Args: { _local_day_key: string; _section_key: string; _user_id: string }
        Returns: {
          day_limit: number
          day_used: number
          free_limit: number
          is_pro: boolean
          label: string
          month_limit: number
          month_used: number
          section_key: string
          unlimited: boolean
        }[]
      }
      get_usage_history: {
        Args: { _days?: number; _user_id: string }
        Returns: {
          day_key: string
          section_key: string
          used: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { p_user_id: string }; Returns: boolean }
      is_pro_subscriber: { Args: { _user_id: string }; Returns: boolean }
      is_unlimited_test_user: { Args: { _user_id: string }; Returns: boolean }
      league_award: {
        Args: {
          _activity_key: string
          _activity_type: string
          _day: number
          _min_scene_index?: number
          _module_id: string
        }
        Returns: Json
      }
      league_backfill_cohort: {
        Args: { _curriculum_week: number; _module_id: string }
        Returns: number
      }
      league_backfill_rewards: { Args: never; Returns: number }
      league_board: {
        Args: { _competition_id: string; _limit?: number; _offset?: number }
        Returns: Json
      }
      league_board_preview: { Args: { _competition_id: string }; Returns: Json }
      league_can_observe: { Args: { _user_id: string }; Returns: boolean }
      league_ensure_membership: {
        Args: { _curriculum_week: number; _module_id: string }
        Returns: string
      }
      league_is_excluded: { Args: { _user_id: string }; Returns: boolean }
      league_my_competitions: { Args: never; Returns: Json }
      league_my_summary: {
        Args: { _curriculum_week: number; _module_id: string }
        Returns: Json
      }
      league_set_hidden: { Args: { _hidden: boolean }; Returns: boolean }
      league_summary_by_competition: {
        Args: { _competition_id: string }
        Returns: Json
      }
      league_summary_for_cohort: {
        Args: { _curriculum_week: number; _module_id: string }
        Returns: Json
      }
      league_switch_level: {
        Args: { _curriculum_week: number; _module_id: string }
        Returns: string
      }
      league_week_start: { Args: { _ts?: string }; Returns: string }
      limits_enabled: { Args: never; Returns: boolean }
      log_ai_call: {
        Args: {
          _audio_seconds: number
          _billed_audio_seconds: number
          _cache_hit: boolean
          _characters: number
          _day: number
          _endpoint: string
          _error_code: string
          _est_cost_usd: number
          _id: string
          _input_tokens: number
          _latency_ms: number
          _model: string
          _module_id: string
          _ok: boolean
          _output_tokens: number
          _provider: string
          _user_id: string
        }
        Returns: boolean
      }
      owns_storage_path: {
        Args: { _path: string; _user_id: string }
        Returns: boolean
      }
      plan_multiplier: { Args: { _user_id: string }; Returns: number }
      practice_day_key: { Args: never; Returns: string }
      prune_ai_call_log: { Args: { _keep_days: number }; Returns: number }
      purge_backlog: {
        Args: {
          _final_retention_days: number
          _module_last_day: number
          _take_min_age_hours: number
        }
        Returns: number
      }
      purge_candidates: {
        Args: {
          _final_retention_days: number
          _limit: number
          _module_last_day: number
          _take_min_age_hours: number
        }
        Returns: {
          audio_purged_at: string
          created_at: string
          day: number
          duration_seconds: number
          id: string
          is_final_rep: boolean
          mime_type: string
          module_id: string
          storage_path: string
          take_number: number
          user_id: string
        }[]
      }
      purge_day_final_candidates: {
        Args: {
          _final_retention_days: number
          _limit: number
          _module_last_day: number
        }
        Returns: {
          completed_at: string
          day: number
          latest_recorded_at: string
          module_id: string
          recording_path: string
          recording_purged_at: string
          user_id: string
          which: string
        }[]
      }
      record_story_view: {
        Args: {
          _completed: boolean
          _episode_id: string
          _episode_number: number
          _scene_index: number
          _season: number
        }
        Returns: undefined
      }
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
