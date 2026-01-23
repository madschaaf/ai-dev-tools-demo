// User Model
// Represents users who can create and manage steps and use cases

export interface User {
  id: string;
  email: string;
  name: string;
  isAITeamMember: boolean;
  created_at: Date;
  updated_at: Date;
}

// Database Row type (snake_case from database)
export interface UserRow {
  id: string;
  email: string;
  name: string;
  is_ai_team_member: boolean;
  created_at: Date;
  updated_at: Date;
}

// Helper function to convert database row to model
export function rowToUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    isAITeamMember: row.is_ai_team_member,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// Helper function to convert model to database insert data
export function userToInsertData(user: Partial<User>) {
  return {
    email: user.email,
    name: user.name,
    is_ai_team_member: user.isAITeamMember || false,
  };
}
