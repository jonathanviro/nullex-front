import { DashboardLayout } from "../../../components/layout/DashboardLayout"
import { UserCard } from "../components/UserCard"
import { useUsers } from "../hooks/useUsers"
import { Button } from "../../../components/ui/button"
import { Plus, Users } from "lucide-react"

export function UsersPage() {
  const { users, loading, error, deleteUser } = useUsers()

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Cargando usuarios...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-500 p-8">
          <p>{error}</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Users className="h-8 w-8" />
              Gestión de Usuarios
            </h1>
            <p className="text-muted-foreground">Administra los usuarios del sistema</p>
          </div>
          <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={deleteUser} />
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No hay usuarios</h3>
            <p className="text-sm text-muted-foreground">Comienza agregando tu primer usuario</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
