import { SearchBar } from '@/components/SearchBar';
import { UserCard } from '@/components/UserCard';
import { useUsers } from '@/hooks/useUsers';
import { useAppStore } from '@/stores/appStore';

export function Home() {
  const { data: users, isLoading } = useUsers();
  const { searchQuery } = useAppStore();

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container py-8">
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Gestion des collaborateurs</h1>
        <p className="text-xl text-muted-foreground">Consultez et gérez les collaborateurs et leurs projets</p>
        <SearchBar />
      </section>
      <section>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des collaborateurs...</p>
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun collaborateur trouvé</p>
          </div>
        )}
      </section>
    </div>
  );
}
