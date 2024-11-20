export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          country: string
          description: string
          id: string
          image: string
          name: string
          name_search: unknown | null
          region: string
        }
        Insert: {
          country?: string
          description: string
          id: string
          image: string
          name: string
          name_search?: unknown | null
          region?: string
        }
        Update: {
          country?: string
          description?: string
          id?: string
          image?: string
          name?: string
          name_search?: unknown | null
          region?: string
        }
        Relationships: []
      }
      person_recommendations: {
        Row: {
          created_at: string
          person_id: string
          recommendation_id: string
        }
        Insert: {
          created_at?: string
          person_id: string
          recommendation_id: string
        }
        Update: {
          created_at?: string
          person_id?: string
          recommendation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "expert_recommendations_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "people"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expert_recommendations_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          }
        ]
      }
      people: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          image: string | null
          name: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id: string
          image?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          address: string | null
          created_at: string
          cuisine: string
          description: string | null
          destination_id: string
          hours: string | null
          id: string
          image: string
          images: string[] | null
          instagram: string | null
          latitude: number | null
          longitude: number | null
          name: string
          name_search: unknown | null
          neighborhood: string | null
          our_review: string | null
          phone: string | null
          price_level: string
          rating: number
          type: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          cuisine: string
          description?: string | null
          destination_id: string
          hours?: string | null
          id: string
          image: string
          images?: string[] | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          name: string
          name_search?: unknown | null
          neighborhood?: string | null
          our_review?: string | null
          phone?: string | null
          price_level: string
          rating: number
          type: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          cuisine?: string
          description?: string | null
          destination_id?: string
          hours?: string | null
          id?: string
          image?: string
          images?: string[] | null
          instagram?: string | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          name_search?: unknown | null
          neighborhood?: string | null
          our_review?: string | null
          phone?: string | null
          price_level?: string
          rating?: number
          type?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}